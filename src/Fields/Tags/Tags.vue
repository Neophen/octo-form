<template>
  <div>
    <input
      v-if="value == null || value.length === 0"
      type="text"
      :name="key"
      :value="null"
      hidden
    />
    <input
      v-else
      v-for="val in value"
      type="text"
      :key="val"
      :name="`${key}[]`"
      :value="val"
      hidden
    />
    <o-field
      :label="title"
      :tooltip="tooltip"
      :can-toggle="can_toggle"
      :type="{ 'is-danger': error }"
      :message="error"
      :label-for="key"
      :icon="fieldIcon"
      :number="fieldNumber"
      :hasValue="selectedTags.length > 0"
    >
      <o-tags
        v-model="selectedTags"
        :key="key"
        :maxtags="maxtags"
        :data="displayTags"
        :disabled="disabled"
        autocomplete
        :open-on-focus="openOnFocus"
        :allow-new="allowNew"
        field="label"
        :allow-duplicates="false"
        :placeholder="placeholder"
        @typing="getFilteredTags"
        expanded
      >
        <template slot-scope="props">{{ props.option.label }}</template>
        <template slot="empty">There are no items</template>
      </o-tags>
    </o-field>
  </div>
</template>

<script>
import { fieldMixin } from "../../utils/fieldMixin.js";
import { vModelMixin } from "../../utils/vModelMixin.js";
export default {
  name: "OctoFormTags",
  mixins: [vModelMixin, fieldMixin],
  data() {
    return {
      filteredTags: []
    };
  },
  computed: {
    openOnFocus() {
      if (this.field.open_on_focus !== undefined) {
        return this.field.open_on_focus;
      }

      return true;
    },
    allowNew() {
      return this.field.allow_new;
    },
    tags() {
      return this.field.options;
    },
    displayTags() {
      return this.filteredTags.length > 0
        ? this.filteredTags
        : this.nonDuplicates;
    },
    nonDuplicates() {
      return this.tags.filter(tag => {
        if (!this.value) return true;
        const existingTags = this.value.map(x => x.toLowerCase());
        const tagValueExists = existingTags.includes(tag.value);
        if (tagValueExists) return false;

        const tagLabelExists = existingTags.includes(tag.label.toLowerCase());

        return !tagLabelExists;
      });
    },
    selectedTags: {
      get() {
        if (!this.value) return [];
        return this.value.map(tagValue => {
          const tag = this.findTag(tagValue);
          if (tag) {
            return tag;
          }
          return tagValue;
        });
      },
      set(tags) {
        const emitted = tags.map(tag => {
          if (typeof tag === "string") {
            return tag;
          }
          return tag.value;
        });
        this.$emit("input", emitted);
      }
    }
  },
  methods: {
    findTag(value) {
      return this.tags.find(tag => tag.value === value);
    },
    getFilteredTags(text) {
      this.filteredTags = this.nonDuplicates.filter(
        option =>
          option.label
            .toString()
            .toLowerCase()
            .indexOf(text.toLowerCase()) >= 0
      );
    }
  }
};
</script>
