<template>
  <div class="octo-box mb-4 mt-6">
    <o-h size="3" class="mb-4">Icons</o-h>
    <octo-form :fieldset="iconFieldset" />
  </div>
</template>

<script>
import { reactive, toRefs } from "@vue/composition-api";

export default {
  setup() {
    const state = reactive({
      iconFieldset: {
        facebook: {
          display: "Link to Facebook profile",
          type: "text",
          icon: "contact-facebook",
          validate: "max:100"
        },
        slack: {
          display: "Slack username",
          type: "text",
          validate: "max:100",
          icon: "contact-slack"
        }
      }
    });

    return { ...toRefs(state) };
  }
};
</script>