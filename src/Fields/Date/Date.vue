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
import { addDays, parseDate } from "../../utils/dateUtils";
import { computed, toRefs, reactive, watch } from "@vue/composition-api";
export default {
  name: "OctoFormDate",
  mixins: [fieldMixin],
  props: {
    value: {
      type: Object
    }
  },
  setup(props, { emit }) {
    const getDate = date => {
      if (!date) return null;
      return parseDate(date, props.field.timezone);
    };

    const state = reactive({
      date: getDate(props.field.value)
    });

    watch(
      () => state.date,
      date => {
        emit("input", date);
      }
    );

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
      ...toRefs(state),
      minDate,
      maxDate
    };
  }
};
</script>
