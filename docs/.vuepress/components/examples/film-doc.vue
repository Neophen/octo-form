<template>
  <div class="container">
    <div class="octo-box">
      <octo-form :fieldset="filmFieldset" />
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "@vue/composition-api";
import { filmFieldset } from "../../utils/fieldsets.js";

export default {
  setup() {
    const state = reactive({
      filmFieldset
    });

    return { ...toRefs(state) };
  }
};
</script>
