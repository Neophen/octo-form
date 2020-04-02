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
      :hasValue="selectedOptions.length > 0"
    >
      <o-inline-select-tags
        v-model="selectedOptions"
        :key="key"
        :has-counter="true"
        :maxtags="maxtags"
        :data="displayOptions"
        :disabled="disabled"
        :open-on-focus="true"
        field="label"
        :placeholder="placeholder"
        expanded
      />
    </o-field>
  </div>
</template>

<script>
import { fieldMixin, useOptions } from "../../utils";

import { countries } from "../../utils/countries.js";

export default {
  name: "OctoFormCountries",
  mixins: [fieldMixin],
  props: ["value"],
  setup(props) {
    return { ...useOptions(props, countries) };
  }
};
</script>
