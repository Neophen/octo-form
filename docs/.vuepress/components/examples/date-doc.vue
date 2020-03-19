<template>
  <div class="control-box">
    <o-h size="3" class="mb-2">Date</o-h>
    <octo-form-date v-model="valueDate">Date</octo-form-date>
  </div>
</template>

<script>
import { reactive, toRefs } from "@vue/composition-api";

export default {
  setup() {
    const state = reactive({
      valueDate: false
    });

    return { ...toRefs(state) };
  }
};
</script>
