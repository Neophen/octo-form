<template>
  <o-field
    :label="title"
    :tooltip="tooltip"
    :can-toggle="can_toggle"
    :type="{ 'is-danger': error }"
    :message="error"
    :label-for="key"
    :icon="fieldIcon"
    :number="fieldNumber"
    :hasValue="!!fileName"
  >
    <div class="relative">
      <input
        type="file"
        :name="hasFile ? key : ''"
        @change="handleInputChange"
        hidden
        ref="fileInput"
      />
      <div v-if="fileName" class="overflow-hidded">
        <o-text class="max-w-full mb-2 truncate" :title="fileName">{{
          fileName
        }}</o-text>
        <div class="flex space-x-2">
          <button
            @click="deleteFile"
            type="button"
            class="underline hover:text-secondary-500"
          >
            Delete
          </button>
          <button
            @click="chooseFile"
            type="button"
            class="underline hover:text-primary-500"
          >
            Change
          </button>
        </div>
      </div>
      <o-button v-else @click="chooseFile">Select file</o-button>
    </div>
  </o-field>
</template>

<script>
import { fieldMixin } from "../../utils/fieldMixin.js";
import { reactive, ref, toRefs } from "@vue/composition-api";
export default {
  name: "OctoFormFile",
  mixins: [fieldMixin],
  props: ["value"],
  setup(props) {
    const state = reactive({
      fileInput: ref(null),
      hasFile: false,
      fileName: props.value || null
    });

    const chooseFile = () => {
      state.fileInput.click();
    };

    const deleteFile = async () => {
      state.hasFile = false;
    };

    const handleInputChange = async () => {
      if (!state.fileInput.files.length) return;
      state.fileName = state.fileInput.files[0].name;
      state.hasFile = true;
    };

    return {
      ...toRefs(state),
      handleInputChange,
      chooseFile,
      deleteFile
    };
  }
};
</script>
