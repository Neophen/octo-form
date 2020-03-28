<template>
  <validation-observer ref="refValidation" v-slot="{ handleSubmit }">
    <form ref="refForm" @submit.prevent="handleSubmit(onSubmit)">
      <octo-form-field
        v-for="(field, key) in newfieldset"
        :class="fieldGap"
        :key="key"
        :field="field"
        :fields="newfieldset"
        :disabled="loading"
        v-model="field.value"
      />
      <div class="octo-form__buttons">
        <o-button
          v-if="formState.type === 'secondary'"
          :type="formState.buttonType"
          class="octo-form__cancel-btn"
          :dusk="formConfig.secondaryDusk"
          :disabled="loading"
          @click="formState.secondaryAction"
          >{{ formConfig.secondary }}</o-button
        >
        <o-checkbox
          v-if="formState.type === 'accept'"
          v-model="acceptTermsConditions"
          class="octo-form__cancel-btn"
          :name="formConfig.acceptName"
        >
          <slot name="accept"></slot>
        </o-checkbox>
        <o-button
          native-type="submit"
          type="is-primary"
          class="octo-form__confirm-btn"
          :dusk="formConfig.confirmDusk"
          :loading="loading"
          :disabled="!canSubmit"
          >{{ formConfig.confirm }}</o-button
        >
      </div>
    </form>
  </validation-observer>
</template>

<script>
import { reactive, toRefs, ref, computed, watch } from "@vue/composition-api";
import Field from "../Field/Field.vue";

export default {
  name: "OctoForm",
  components: {
    [Field.name]: Field
  },
  props: {
    fieldset: {
      type: Object,
      required: true
    },
    config: {
      type: Object,
      default: () => ({})
    },
    errors: [Array, Object],
    loading: Boolean
  },
  setup(props, { emit, root }) {
    const refForm = ref(null);
    const refValidation = ref(null);

    const defaultConfig = {
      confirm: "Confirm",
      confirmDusk: "octo-form__confirm-btn",
      secondary: "Cancel",
      secondaryDusk: "octo-form__cancel-btn",
      type: "default",
      spacing: "octo-form__fields-gap",
      secondaryAction: () => {},
      acceptName: null
    };

    const state = reactive({
      newfieldset: props.fieldset,
      acceptTermsConditions: false,
      formConfig: { ...defaultConfig, ...props.config }
    });

    const canSubmit = computed(() => {
      if (formState.value.type === "accept") {
        return state.acceptTermsConditions;
      }
      return true;
    });

    const isEmpty = value =>
      value &&
      value.constructor === Object &&
      Object.entries(value).length === 0;

    watch(
      () => props.errors,
      errors => {
        if (!errors || isEmpty(errors)) return;
        root.$nextTick(() => {
          refValidation.value.setErrors(errors);
        });
      }
    );

    const onSubmit = async () => {
      emit("submit-state", "start");

      const prepareFields = Object.values(refValidation.value.refs)
        .filter(field => field.$children[0].prepare)
        .map(field => field.$children[0].prepare());

      emit("submit-state", "progress-25");
      const blobs = await Promise.all(prepareFields);

      emit("submit-state", "progress-75");

      const formData = new FormData(refForm.value);

      blobs
        .filter(blob => blob)
        .forEach(blob => {
          // for images that have extras like _focus, _alt
          if (Array.isArray(blob)) {
            blob.forEach(b => formData.append(b.key, b.value));
          } else {
            formData.append(blob.key, blob.value);
          }
        });

      emit("submit-state", "finished");
      emit("submit", formData);
    };

    const fieldGap = computed(() => state.formConfig.spacing);

    const secondaryAction = () => {
      let isDirty = false;

      if (refValidation.value) {
        refValidation.value.reset();
        isDirty = refValidation.value.flags.dirty;
      }

      emit("cancel", isDirty);
      state.formConfig.secondaryAction();
    };

    const formStates = {
      default: {
        buttonType: "is-default",
        type: "secondary",
        secondaryAction: secondaryAction
      },
      link: {
        buttonType: "is-link",
        type: "secondary",
        secondaryAction: secondaryAction
      },
      accept: {
        buttonType: "is-default",
        type: "accept",
        secondaryAction: () => {}
      },
      "no-cancel": {
        type: "no-cancel"
      }
    };

    const formState = computed(() => formStates[state.formConfig.type]);

    return {
      ...toRefs(state),
      refValidation,
      formState,
      refForm,
      onSubmit,
      canSubmit,
      fieldGap,
      secondaryAction
    };
  }
};
</script>
