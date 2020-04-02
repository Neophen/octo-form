<template>
  <div class="octo-form-section">
    <o-h size="2" :type="sectionType">{{ title }}</o-h>
    <o-switch v-if="canToggle" v-model="isOpen" />
  </div>
</template>

<script>
import { fieldMixin } from "../../utils/fieldMixin.js";
import { reactive, toRefs, watch } from "@vue/composition-api";
export default {
  name: "OctoFormSection",
  mixins: [fieldMixin],
  props: {
    value: Boolean
  },
  setup(props, { emit }) {
    const state = reactive({
      canToggle: props.field.can_toggle,
      isOpen: props.value || false
    });

    watch(
      () => state.isOpen,
      open => {
        emit("input", open);
      }
    );

    return { ...toRefs(state) };
  }
};
</script>
