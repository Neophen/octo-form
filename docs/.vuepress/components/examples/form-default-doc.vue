<template>
  <div class="octo-box mb-4 mt-6">
    <o-h size="3" class="mb-4">Default</o-h>
    <octo-form :fieldset="defaultFieldset" />
  </div>
</template>

<script>
import { reactive, toRefs } from "@vue/composition-api";

export default {
  setup() {
    const state = reactive({
      defaultFieldset: {
        email: {
          display: "Email",
          type: "text",
          validate: "email|max:100",
          autocomplete: "email",
          textType: "email"
        },
        phone: {
          display: "Phone",
          type: "text",
          validate: "max:100",
          autocomplete: "phone",
        },
        facebook: {
          display: "Link to Facebook profile",
          type: "text",
          validate: "max:100"
        },
        slack: {
          display: "Slack username",
          type: "text",
          validate: "max:100",
        }
      }
    });

    return { ...toRefs(state) };
  }
};
</script>