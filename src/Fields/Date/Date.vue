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
    :hasValue="!!computedDate"
  >
    <o-datepicker
      :key="key"
      v-model="computedDate"
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
import { computed } from "@vue/composition-api";
import { fieldMixin } from "../../utils/fieldMixin.js";
import { addDays, parseDate } from "../../utils/dateUtils";

export default {
  name: "OctoFormDate",
  mixins: [fieldMixin],
  props: ["value"],
  setup(props, { emit }) {
    const getDate = date => {
      if (!date) return null;
      return parseDate(date, props.field.timezone);
    };

    const computedDate = computed({
      get() {
        if (typeof props.field.value === "string") {
          return getDate(props.field.value);
        }

        return props.field.value;
      },
      set(value) {
        emit("input", value);
      }
    });

    const minDate = computed(() => {
      if (!props.field.minDate) return null;

      if (props.field.minDate === "today") {
        return addDays(new Date(), -1);
      }

      return parseDate(props.field.minDate, props.field.timezone);
    });

    const maxDate = computed(() => {
      if (!props.field.maxDate) return null;
      return parseDate(props.field.maxDate, props.field.timezone);
    });

    return {
      computedDate,
      minDate,
      maxDate
    };
  }
};
</script>
