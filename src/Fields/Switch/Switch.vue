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
    <input type="text" :value="computedValue" :key="key" :name="key" hidden />
    <o-switch :disabled="disabled" v-model="computedValue" />
  </o-field>
</template>

<script>
import { fieldMixin } from "../../utils/fieldMixin.js";
import { vModelMixin } from "../../utils/vModelMixin.js";
export default {
  name: "OctoFormSwitch",
  mixins: [vModelMixin, fieldMixin]
};
</script>
