import {
  computed,
  getCurrentInstance,
  reactive,
  toRefs,
} from "@vue/composition-api";

export const useOptions = (props, options = null) => {
  const instance = getCurrentInstance();
  const state = reactive({
    openOnFocus: props.field.open_on_focus || true,
    _options: options || props.field.options,
    displayOptions: computed(() =>
      props.value
        ? state._options.filter(option => {
            // value is only the ids of the options
            const selectedOptionValues = props.value.map(x => x.toLowerCase());

            return selectedOptionValues.includes(option.value.toLowerCase())
              ? false
              : !selectedOptionValues.includes(option.label.toLowerCase());
          })
        : state._options,
    ),
    selectedOptions: computed({
      get: () =>
        props.value
          ? props.value.map(
              optionVal => findOptionByValue(optionVal) || optionVal,
            )
          : [],
      set(options) {
        const emitted = options.map(tag =>
          typeof tag === "string" ? tag : tag.value,
        );
        instance.$emit("input", emitted);
      },
    }),
  });

  const findOptionByValue = value =>
    state._options.find(option => option.value === value);

  return {
    ...toRefs(state),
  };
};
