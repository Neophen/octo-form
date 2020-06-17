import { reactive, watch, toRefs } from "@vue/composition-api";

export const useVModel = (props, emit) => {
  const state = reactive({
    modelValue: props.value
  });

  watch(
    () => state.modelValue,
    value => {
      emit("input", value);
    }
  );

  watch(
    () => props.value,
    value => {
      state.modelValue = value;
    }
  );

  return { ...toRefs(state) };
};
