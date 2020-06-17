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
    :hasValue="!!startDate && !!endDate"
  >
    <div class="octo-form-date-range">
      <o-datepicker
        :key="`${key}_start`"
        v-model="startDate"
        :disabled="disabled"
        :max-date="maxDateStart"
        :min-date="minDateStart"
        :name="`${key}_start`"
        :placeholder="placeholder"
        class="octo-form-date-range__input"
        icon="calendar-alt"
      />
      <o-icon icon="arrow-right" size="is-md" />
      <o-datepicker
        :key="`${key}_end`"
        v-model="endDate"
        :disabled="disabled"
        :max-date="maxDateEnd"
        :min-date="minDateEnd"
        :name="`${key}_end`"
        :placeholder="placeholder"
        class="octo-form-date-range__input"
        icon="calendar-alt"
      />
    </div>
  </o-field>
</template>

<script>
import { fieldMixin } from "../../utils/fieldMixin.js";
import { reactive, toRefs, computed, watch } from "@vue/composition-api";
import { parseDate, addDays } from "../../utils/dateUtils";

export default {
  name: "OctoFormDateRange",
  mixins: [fieldMixin],
  props: {
    value: {
      type: Object
    }
  },
  setup(props, { emit }) {
    const getValueDate = (value, key) => {
      if (!value || !value[key]) return null;
      return getDate(value[key]);
    };

    const getDate = date => {
      if (!date) return null;
      return parseDate(date, props.field.timezone);
    };

    const state = reactive({
      startDate: getValueDate(props.field.value, "start"),
      endDate: getValueDate(props.field.value, "end")
    });

    watch(
      () => state.startDate,
      startDate => {
        if (!startDate) return;
        emit("input", {
          start: startDate,
          end: state.endDate
        });
      },
      { immediate: true }
    );

    watch(
      () => state.endDate,
      endDate => {
        if (!endDate) return;
        emit("input", {
          start: state.startDate,
          end: endDate
        });
      },
      { immediate: true }
    );

    const minDateStart = computed(() => {
      if (!props.field.minDate) return null;

      if (props.field.minDate === "today") {
        return addDays(new Date(), -1);
      }

      return parseDate(props.field.minDate, props.field.timezone);
    });

    const maxDateStart = computed(() => state.endDate);

    const minDateEnd = computed(() => {
      if (state.startDate) return state.startDate;
      if (minDateStart.value) return minDateStart.value;
    });

    const maxDateEnd = computed(() => {
      if (!props.field.maxDate) return null;
      return parseDate(props.field.maxDate, props.field.timezone);
    });

    return {
      ...toRefs(state),
      minDateStart,
      maxDateStart,
      minDateEnd,
      maxDateEnd
    };
  }
};
</script>
