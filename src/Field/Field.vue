<template>
  <o-transition-expand>
    <validation-provider
      v-if="shouldShow"
      :rules="field.validate"
      tag="div"
      :vid="key"
      :name="field.display"
      v-slot="{ errors, required }"
    >
      <component
        :is="type"
        :key="key"
        :name="key"
        :disabled="disabled"
        :required="required"
        :field="field"
        :error="errors[0]"
        v-model="modelValue"
      />
    </validation-provider>
  </o-transition-expand>
</template>

<script>
import { computed, getCurrentInstance } from "@vue/composition-api";
import { useVModel } from "../utils/useVModel.js";

export default {
  name: "OctoFormField",
  props: {
    field: {
      type: Object,
      required: true
    },
    fields: Object,
    value: null,
    disabled: Boolean
  },
  setup(props, { emit }) {
    const type = computed(() => `octo-form-${props.field.type}`);
    const key = getCurrentInstance().$vnode.key;
    const { modelValue } = useVModel(props, emit);

    const shouldShow = computed(() => {
      if (!props.field.show_when) return true;

      const conditions = props.field.show_when;
      const conditionsMetMap = Object.keys(conditions).map(key => {
        const field = props.fields[key];
        if (!field.value) return false;
        if (conditions[key] === "any_value") {
          return !!field.value;
        }
        return field.value === conditions[key];
      });

      return conditionsMetMap.every(met => met === true);
    });

    return { type, key, modelValue, shouldShow };
  }
};
</script>
