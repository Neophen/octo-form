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
    <o-datepicker
      :key="key"
      v-model="computedValue"
      :disabled="disabled"
      :max-date="maxDate"
      :min-date="minDate"
      :name="key"
      :placeholder="placeholder"
      class="w-1/2"
      icon="calendar-alt"
    ></o-datepicker>
  </o-field>
</template>

<script>
import { fieldMixin } from "../../utils/fieldMixin.js";
import { vModelMixin } from "../../utils/vModelMixin.js";
export default {
  name: "OctoFormDate",
  mixins: [vModelMixin, fieldMixin],
  computed: {
    minDate() {
      return this.field.minDate;
    },
    maxDate() {
      return this.field.maxDate;
    }
  }
};
</script>
