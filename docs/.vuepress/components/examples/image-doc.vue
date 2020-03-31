<template>
  <div>
    <o-h size="3" class="mb-2">Image</o-h>
    <octo-form-image ref="refImage" v-model="valueImage" :field="field" key="image" />

    <div class="mt-6">
      <o-field label="Quality">
      <o-input v-model="quality" class="mb-4" />
      </o-field>
      <o-button @click="download">Download</o-button>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, ref } from "@vue/composition-api";

export default {

  setup() {

    const refImage = ref(null);

    const state = reactive({
      valueImage: "/DianaAndMe.jpg",
      quality: 1,
      field: {
        display: "",
        max_width: "600px",
        quality: 0.5,
        width: 1920,
        height: 1080,
      }
    });

    const download = () => {
      // console.log(refImage.value);
      refImage.value.download('image/jpeg', Number(state.quality));
    }

    return { ...toRefs(state), refImage, download };
  }
};
</script>
