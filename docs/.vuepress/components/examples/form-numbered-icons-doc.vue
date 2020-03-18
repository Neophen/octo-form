<template>
  <div class="octo-box mb-4 mt-6">
    <o-h size="3" class="mb-4">Numbered + Icons</o-h>
    <octo-form :fieldset="numberedIconsFieldset" />
  </div>
</template>

<script>
import { reactive, toRefs } from "@vue/composition-api";

export default {
  setup() {
    const state = reactive({
      numberedIconsFieldset: {
        email: {
          display: "Email",
          type: "text",
          number: 1,
          icon: 'contact-email',
          validate: "email|max:100",
          autocomplete: "email",
          inputType: "email"
        },
        phone: {
          display: "Phone",
          type: "text",
          number: 2,
          icon: 'contact-phone',
          validate: "max:100",
          autocomplete: "phone",
        },
      }
    });

    return { ...toRefs(state) };
  }
};
</script>