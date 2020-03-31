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
    />
  </o-field>
</template>

<script>
import { fieldMixin } from "../../utils/fieldMixin.js";
import { vModelMixin } from "../../utils/vModelMixin.js";
import { addDays, parseDate } from "../../utils/dateUtils";
export default {
  name: "OctoFormDate",
  mixins: [vModelMixin, fieldMixin],
  computed: {
    minDate() {
      if (!this.field.minDate) return null;

      if (this.field.minDate === "today") {
        return addDays(new Date(), -1);
      }

      return parseDate(this.field.minDate, this.field.timezone);
    },
    maxDate() {
      if (!this.field.maxDate) return null;
      return parseDate(this.field.maxDate, this.field.timezone);
    }
  }
};
</script>
