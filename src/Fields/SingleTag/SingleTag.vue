<template>
  <o-field
    :label="title"
    :tooltip="tooltip"
    :can-toggle="can_toggle"
    :type="{ 'is-danger': error }"
    :message="error"
    :label-for="key"
    :icon="fieldIcon"
    :number="fieldNumber"
    :hasValue="!!computedValue"
  >
    <o-select
      :placeholder="placeholder"
      :disabled="disabled"
      :name="key"
      v-model="computedValue"
    >
      <option
        v-for="option in options"
        :value="option.value"
        :key="option.value"
        >{{ option.label }}</option
      >
    </o-select>
  </o-field>
</template>

<script>
import { fieldMixin } from "../../utils/fieldMixin.js";
import { vModelMixin } from "../../utils/vModelMixin.js";
export default {
  name: "OctoFormSingleTag",
  mixins: [vModelMixin, fieldMixin]
};
</script>
