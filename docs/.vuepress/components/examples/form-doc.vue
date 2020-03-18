<template>
  <div class="container">
    <div class="octo-box mb-4">
      <o-h size="3" class="mb-4">Basic</o-h>
      <octo-form :fieldset="loginFieldset" />
    </div>
    <div class="octo-box mb-4">
      <o-h size="3" class="mb-4">Form with link</o-h>
      <octo-form :fieldset="linkFieldset" :config="linkConfig" />
    </div>
    <div class="octo-box mb-4">
      <o-h size="3" class="mb-4">Form with accept</o-h>
      <octo-form :fieldset="acceptFieldset" :config="acceptConfig">
        <div slot="accept">
          I agree to
          <a
            @click.stop
            href="#"
            class="text-highlight hover:underline"
          >terms and conditions</a>
        </div>
      </octo-form>
    </div>
    <div class="octo-box mb-4">
      <o-h size="3" class="mb-4">With icons</o-h>
      <octo-form :fieldset="contactFieldset" />
    </div>
    <div class="octo-box mb-4 mt-6">
      <o-h size="3" class="mb-4">Basic numbered</o-h>
      <octo-form :fieldset="loginFieldsetNumbered" numbered />
    </div>
    <div class="octo-box">
      <o-h size="3" class="mb-4">With icons numbered</o-h>
      <octo-form :fieldset="contactFieldsetNumbered" numbered />
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "@vue/composition-api";
import {
  contactFieldset,
  contactFieldsetNumbered,
  loginFieldset,
  loginFieldsetNumbered,
  acceptFieldset,
  linkFieldset
} from "../../utils/fieldsets.js";

export default {
  setup() {
    const state = reactive({
      loginFieldset,
      loginFieldsetNumbered,
      contactFieldset,
      contactFieldsetNumbered,
      acceptFieldset,
      linkFieldset,
      linkConfig: {
        confirm: "Login",
        confirmDusk: "login-button",
        type: "link",
        secondary: "Forgot your password?",
        secondaryAction: () => {
          console.log("hey this is the secondary action");
        }
      },
      acceptConfig: {
        confirm: "Continue",
        confirmDusk: "continue-button",
        type: "accept"
      }
    });

    return { ...toRefs(state) };
  }
};
</script>