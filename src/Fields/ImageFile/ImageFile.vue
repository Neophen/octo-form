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
    :hasValue="!!initial || imageData.length > 0"
  >
    <div class="octo-form-image-file">
      <input
        type="file"
        :name="key"
        @change="previewImage"
        accept="image/*"
        hidden
        ref="inputRef"
      />
      <div class="octo-form-image-file__image">
        <img v-if="imageData.length > 0" class="preview" :src="imageData" />
        <img v-else-if="initial" class="preview" :src="initial" />
      </div>
      <o-button squared size="is-sm" @click="() => inputRef.click()"
        >Select file</o-button
      >
    </div>
  </o-field>
</template>

<script>
import { fieldMixin } from "../../utils/fieldMixin.js";
import { reactive, ref, toRefs } from "@vue/composition-api";
export default {
  name: "OctoFormImageFile",
  mixins: [fieldMixin],
  props: ["value"],
  setup(props) {
    const state = reactive({
      inputRef: ref(null),
      initial: props.value,
      imageData: ""
    });

    const previewImage = event => {
      const input = event.target;

      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = e => {
          state.imageData = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    };

    return {
      ...toRefs(state),
      previewImage
    };
  }
};
</script>
