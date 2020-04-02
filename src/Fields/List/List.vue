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
      :name="`${key}[]`"
      :value="val"
      :key="val"
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
      :hasValue="selectedItems.length > 0"
    >
      <o-inline-tag-input
        v-model="selectedItems"
        :disabled="disabled"
        :placeholder="placeholder"
        :has-counter="true"
        :maxtags="maxtags"
        expanded
      />
    </o-field>
  </div>
</template>

<script>
import { fieldMixin } from "../../utils/fieldMixin.js";
export default {
  name: "OctoFormList",
  mixins: [fieldMixin],
  props: ["value"],
  computed: {
    selectedItems: {
      get() {
        return this.value || [];
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  }
};
</script>
