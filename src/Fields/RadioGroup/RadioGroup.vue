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
    <o-item-grid col-first>
      <o-radio
        v-for="(value, option) in options"
        :key="option"
        :name="key"
        v-model="computedValue"
        :true-value="option"
        :native-value="option"
        :disabled="disabled"
        :selected="option === field.default"
        >{{ value }}</o-radio
      >
    </o-item-grid>
  </o-field>
</template>

<script>
import { fieldMixin } from "../../utils/fieldMixin.js";
import { vModelMixin } from "../../utils/vModelMixin.js";
export default {
  name: "OctoFormRadioGroup",
  mixins: [vModelMixin, fieldMixin],
  created() {
    if (!this.field.value) {
      this.$emit("input", this.field.default);
    }
  }
};
</script>
