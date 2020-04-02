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
      :hasValue="selectedOptions.length > 0"
    >
      <o-inline-select-tags
        v-model="selectedOptions"
        :key="key"
        :has-counter="true"
        :maxtags="maxtags"
        :data="displayOptions"
        :disabled="disabled"
        :open-on-focus="openOnFocus"
        field="label"
        :placeholder="placeholder"
        :ellipsis="false"
        expanded
      />
    </o-field>
  </div>
</template>

<script>
import { fieldMixin, useOptions } from "../../utils";
export default {
  name: "OctoFormTags",
  mixins: [fieldMixin],
  props: ["value"],
  setup(props) {
    const state = useOptions(props);
    return { ...state };
  }
};
</script>
