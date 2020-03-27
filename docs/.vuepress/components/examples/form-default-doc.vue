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
        with_icon: {
          display: "Field with icon",
          type: "text",
          placeholder: "Enter some text...",
          icon: "contact-email",
          validate: "email|max:100",
          autocomplete: "email",
          inputType: "email"
        },
        with_number: {
          display: "Field with number",
          type: "text",
          placeholder: "Enter some text...",
          number: 99,
          validate: "max:100",
          autocomplete: "phone"
        },
        with_tooltip: {
          display: "Text with tooltip",
          type: "text",
          placeholder: "Enter some text...",
          tooltip:
            "Some information about the field, goes here.<br><br>It can contain html",
          validate: "max:100"
        },
        toggle_value: {
          display: "Field toggle, value provided",
          type: "text",
          placeholder: "Enter some text...",
          value: "Some value",
          can_toggle: true,
          validate: "max:100"
        },
        toggle_nope: {
          display: "Field toggle, no value",
          type: "text",
          placeholder: "Enter some text...",
          can_toggle: true,
          validate: "max:100"
        }
      }
    });

    return { ...toRefs(state) };
  }
};
</script>