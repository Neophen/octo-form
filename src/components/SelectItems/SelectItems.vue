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
    :hasValue="checkedOptions.length > 0"
  >
    <o-item-grid col-first>
      <o-checkbox
        v-for="option in options"
        :key="option.value"
        v-model="checkedOptions"
        :name="`${key}[]`"
        :disabled="disabled"
        :native-value="option.value"
      >
        {{ option.label }}
      </o-checkbox>
    </o-item-grid>
  </o-field>
</template>

<script>
import { fieldMixin } from "../../utils/fieldMixin.js";
import { computed } from "@vue/composition-api";
export default {
  name: "OctoFormSelectItems",
  mixins: [fieldMixin],
  props: {
    value: Array
  },
  setup(props, { emit }) {
    const checkedOptions = computed({
      get() {
        if (!props.value) return [];
        return props.value;
      },
      set(value) {
        // const emited = value && Array.isArray(value) ? value : [];
        emit("input", value);
      }
    });

    return { checkedOptions };
  }
};
</script>
