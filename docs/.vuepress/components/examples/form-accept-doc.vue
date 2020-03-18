<template>
  <div class="octo-box mb-4 mt-6">
    <o-h size="3" class="mb-4">Form with accept</o-h>
    <octo-form :fieldset="acceptFieldset" :config="acceptConfig">
      <div slot="accept">
        I agree to
        <o-button type="is-link" @click.stop>terms and conditions</o-button>
      </div>
    </octo-form>
  </div>
</template>

<script>
import { reactive, toRefs } from "@vue/composition-api";

export default {
  setup() {
    const state = reactive({
      acceptFieldset: {
        email: {
          display: "Name",
          type: "text",
          autocomplete: "name",
          placeholder: "Name..."
        },
        phone: {
          display: "Phone",
          type: "text",
          autocomplete: "phone",
          placeholder: "Phone..."
        }
      },
      acceptConfig: {
        confirm: "Continue",
        confirmDusk: "continue-button",
        type: "accept",
        acceptName: 'remember',
      }
    });

    return { ...toRefs(state) };
  }
};
</script>