<template>
  <ValidationObserver ref="refValidation" v-slot="{ handleSubmit }">
    <form ref="refForm" @submit.prevent="handleSubmit(onSubmit)">
      <OctoFormField
        v-for="(field, key) in allfields"
        :class="fieldGap"
        :key="key"
        :field="field"
        :fields="allfields"
        :disabled="loading"
        v-model="field.value"
      />
      <div class="octo-form__buttons">
        <OCheckbox
          v-if="buttons === FORM_BUTTONS.CANCEL_ACCEPT"
          v-model="accepted"
          class="octo-form__cancel-btn"
          :name="form.accept_field_name"
        >
          <slot name="accept" />
        </OCheckbox>
        <OButton
          v-else-if="buttons !== FORM_BUTTONS.CONFIRM_ONLY"
          :type="cancelBtnStyle"
          class="octo-form__cancel-btn"
          :disabled="loading"
          @click="cancelAction"
        >
          {{ form.secondary }}
        </OButton>
        <OButton
          native-type="submit"
          type="is-primary"
          class="octo-form__confirm-btn"
          v-if="buttons !== FORM_BUTTONS.CANCEL_ONLY"
          :loading="loading"
          :disabled="!canSubmit"
        >
          {{ form.confirm }}
        </OButton>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import { reactive, toRefs, ref, computed, watch } from "@vue/composition-api";
export default {
  name: "OctoForm",
  props: {
    fieldset: {
      type: Object,
      required: true,
    },
    config: {
      type: Object,
      default: () => ({}),
    },
    errors: [Array, Object],
    loading: Boolean,
  },
  setup(props, { emit, root }) {
    const refForm = ref(null);
    const refValidation = ref(null);

    // external
    const FORM_BUTTONS = {
      BOTH: "BOTH",
      CANCEL_LINK: "CANCEL_LINK",
      CANCEL_ACCEPT: "CANCEL_ACCEPT",
      CONFIRM_ONLY: "CONFIRM_ONLY",
      CANCEL_ONLY: "CANCEL_ONLY",
    };

    const defaultConfig = {
      confirm: "Confirm",
      cancel: "Cancel",
      buttons: FORM_BUTTONS.BOTH,
      spacing: "octo-form__fields-gap",
      cancelAction: () => {},
      accept_field_name: null,
    };

    const state = reactive({
      allfields: props.fieldset,
      accepted: false,
      form: { ...defaultConfig, ...props.config },
      buttons: computed(() => state.form.buttons),
      cancelBtnStyle: computed(() => {
        switch (state.buttons) {
          case FORM_BUTTONS.CANCEL_LINK:
            return "is-link";
          default:
            return "is-default";
        }
      }),
      fieldGap: computed(() => state.form.spacing),
      canSubmit: computed(() =>
        state.form.buttons === FORM_BUTTONS.CANCEL_ACCEPT
          ? state.accepted
          : true,
      ),
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
      },
      { immediate: true },
    );

    const onSubmit = async () => {
      const prepareFields = Object.values(refValidation.value.refs)
        .filter(field => field.$children[0] && field.$children[0].prepare)
        .map(field => field.$children[0]?.prepare());

      const blobs = await Promise.all(prepareFields);
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

      emit("submit", formData);
    };

    const cancelAction = () => {
      if (state.buttons === FORM_BUTTONS.CANCEL_ACCEPT) {
        return;
      }

      let isDirty = false;

      if (refValidation.value) {
        refValidation.value.reset();
        isDirty = refValidation.value.flags.dirty;
      }

      emit("cancel", isDirty);
      state.form.cancelAction();
    };

    return {
      ...toRefs(state),
      refValidation,
      refForm,
      onSubmit,
      cancelAction,
      FORM_BUTTONS,
    };
  },
};
</script>
