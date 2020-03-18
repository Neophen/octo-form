<template>
  <div class="octo-box mb-4 mt-6">
    <o-h size="3" class="mb-4">Form with link</o-h>
    <octo-form :fieldset="linkFieldset" :config="linkConfig" />
  </div>
</template>

<script>
import { reactive, toRefs } from "@vue/composition-api";

export default {
  setup() {
    const state = reactive({
      linkFieldset: {
        email: {
          display: "Email",
          type: "text",
          validate: "required|email|max:100",
          autocomplete: "email",
          textType: "email"
        },
        password: {
          display: "Password",
          type: "password",
          validate: "required",
          autocomplete: "password",
        }
      },
      linkConfig: {
        confirm: "Login",
        confirmDusk: "login-button",
        type: "link",
        secondary: "Forgot your password?",
        secondaryAction: () => {
          console.log("hey this is the secondary action");
        }
      }
    });

    return { ...toRefs(state) };
  }
};
</script>