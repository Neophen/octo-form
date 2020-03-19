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
      expanded
      v-model.trim="computedValue"
      type="textarea"
      rows="10"
      :key="key"
      :name="key"
      :disabled="disabled"
      :maxlength="maxlength"
      :placeholder="placeholder"
    ></o-input>
  </o-field>
</template>

<script>
import { fieldMixin } from "../../utils/fieldMixin.js";
import { vModelMixin } from "../../utils/vModelMixin.js";
export default {
  name: "OctoFormTextarea",
  mixins: [vModelMixin, fieldMixin]
};
</script>
