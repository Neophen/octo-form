<template>
  <o-field
    :label="title"
    :tooltip="tooltip"
    :can-toggle="canToggle"
    :type="{ 'is-danger': error }"
    :message="error"
    :label-for="key"
    :icon="fieldIcon"
    :number="fieldNumber"
    :hasValue="!!computedValue"
  >
    <o-input
      v-model.trim="computedValue"
      :type="inputType"
      :key="key"
      :name="key"
      :disabled="disabled"
      :maxlength="maxlength"
      :autocomplete="autocomplete"
      :placeholder="placeholder"
    ></o-input>
  </o-field>
</template>

<script>
import { fieldMixin } from "../../utils/fieldMixin.js";
import { vModelMixin } from "../../utils/vModelMixin.js";
export default {
  name: "OctoFormText",
  mixins: [vModelMixin, fieldMixin]
};
</script>
