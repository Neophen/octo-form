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
    <input
      :name="key"
      type="text"
      :value="computedValue ? computedValue.value : null"
      hidden
    />
    <o-label-select
      v-model="computedValue"
      :options="options"
      :disabled="disabled"
      :placeholder="placeholder"
    />
  </o-field>
</template>

<script>
import { fieldMixin } from "../../utils/fieldMixin.js";
import { vModelMixin } from "../../utils/vModelMixin.js";
export default {
  name: "OctoFormLabelSelect",
  mixins: [vModelMixin, fieldMixin]
};
</script>
