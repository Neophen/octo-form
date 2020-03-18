<template>
  <div class="octo-box mb-4 mt-6">
    <o-h size="3" class="mb-4">Numbered</o-h>
    <octo-form :fieldset="numberedFieldset" />
  </div>
</template>

<script>
import { reactive, toRefs } from "@vue/composition-api";

export default {
  setup() {
    const state = reactive({
      numberedFieldset: {
        email: {
          display: "Email",
          type: "text",
          number: 1,
          validate: "email|max:100",
          autocomplete: "email",
          textType: "email"
        },
        phone: {
          display: "Phone",
          type: "text",
          number: 2,
          validate: "max:100",
          autocomplete: "phone",
        },
      }
    });

    return { ...toRefs(state) };
  }
};
</script>