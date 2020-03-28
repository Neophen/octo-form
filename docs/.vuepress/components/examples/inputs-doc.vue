<template>
  <div class="container">
    <div class="control-box mb-4">
      <o-field label="Show some erros">
        <o-button @click="refreshErrors">Show errors</o-button>
        <o-switch v-model="showData">Show data</o-switch>
      </o-field>
    </div>
    <div class="octo-box">
      <octo-form
        :fieldset="inputsFieldset"
        @submit="handleSubmit"
        :loading="isLoading"
        :errors="errorsBag"
      />
    </div>
    <div class="docs-debug-content" v-if="showData">
      <pre>{{ JSON.stringify(inputsFieldset, null, 2) }}</pre>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "@vue/composition-api";
import { inputsFieldset, inputsFieldsetErrors } from "../../utils/fieldsets.js";

export default {
  setup() {
    const state = reactive({
      inputsFieldset,
      inputsFieldsetErrors,
      isLoading: false,
      showData: false,
      errorsBag: {}
    });

    const handleSubmit = formData => {
      state.isLoading = true;
       for (var pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }

      setTimeout(() => {
        state.isLoading = false;
      }, 200);
    };

    const refreshErrors = () => {
      state.errorsBag = { ...inputsFieldsetErrors };
    };

    return { ...toRefs(state), handleSubmit, refreshErrors };
  }
};
</script>


<style lang="scss">
.docs-debug-content {
  $top: 40px;
  width: 500px;
  height: calc(100vh - $top);
  height: 100vh;
  position: fixed;
  top: $top;
  right: 0;
  overflow-y: scroll;
  padding: 1rem;
  background-color: rgba($color: #000000, $alpha: 0.7);
  // pointer-events: none;
  color: white;
}
</style>
