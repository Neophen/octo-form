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
    :hasValue="!!value"
    class="octo-image"
    :style="containerStyle"
  >
    <div
      ref="refAspecRatioBox"
      class="octo-aspect-ratio-box"
      :style="aspectRatioStyle"
      :class="{ 'has-file': initialImg || croppa.chosenFile }"
    >
      <octo-form-croppa
        class="octo-aspect-ratio-box-inside"
        @init="resizeAspectBox"
        @new-image-drawn="resizeAspectBox"
        @loading-end="resizeAspectBox"
        @file-choose="files => $emit('input', files)"
        v-model="croppa"
        :width="width"
        :height="height"
        :quality="croppaQuality"
        :accept="accept"
        :auto-sizing="true"
        placeholder
        canvas-color="#FFF"
        :show-remove-button="false"
        :prevent-white-space="true"
      >
        <div
          v-if="!initialImg && !croppa.chosenFile"
          @click="croppa.chooseFile()"
          class="octo-form__inset-container octo-form__flex-center"
        >
          <div class="octo-avatar__placeholder octo-form__flex-center is-col">
            <o-icon icon="image" class="octo-avatar__placeholder-image" />
            <o-h size="5" class="octo-avatar__placeholder-label">
              Click to select image
            </o-h>
          </div>
        </div>
        <div
          v-if="initialImg && !croppa.chosenFile"
          class="octo-form__inset-container octo-form__flex-center"
        >
          <img v-if="!croppa.chosenFile" class="w-full" :src="initialImg" />
        </div>
        <div
          v-if="isEditingFocus"
          @click="setFocus"
          class="octo-form__inset-container"
        >
          <o-icon
            icon="crosshair"
            class="octo-image__focus-target"
            :style="focusPosition"
          />
        </div>
        <div
          v-if="initialImg || croppa.chosenFile"
          class="octo-avatar__change-container"
        >
          <o-button
            size="is-sm"
            class
            :disabled="isEditingFocus"
            squared
            @click="croppa.chooseFile()"
          >
            Change
          </o-button>
          <o-button
            v-if="hasFocus && croppa.chosenFile"
            class="octo-avatar__focus-btn"
            size="is-sm"
            squared
            @click="toggleFocus"
          >
            {{ isEditingFocus ? "Set focus" : "Edit focus" }}
          </o-button>
        </div>
      </octo-form-croppa>
    </div>
  </o-field>
</template>

<script>
import {
  reactive,
  toRefs,
  getCurrentInstance,
  computed,
  ref,
  onMounted,
  onBeforeUnmount
} from "@vue/composition-api";

import Croppa from "../Croppa/Croppa.vue";
import { fieldMixin } from "../../utils/fieldMixin.js";

export default {
  name: "OctoFormImage",
  mixins: [fieldMixin],
  props: {
    value: null
  },
  components: {
    [Croppa.name]: Croppa
  },
  setup(props) {
    const refAspecRatioBox = ref(null);
    const instance = getCurrentInstance();

    const { value } = { ...props };
    const state = reactive({
      croppa: {},
      initialImg: value,
      max_width: props.field.max_width,
      quality: props.field.quality ? Number(props.field.quality) : 1,
      submitType: props.field.submit_type,
      width: props.field.width,
      height: props.field.height,
      hasFocus: props.field.has_focus,
      container: props.field.container,
      folder: props.field.folder,
      containerWidth: props.field.width,
      accept: props.field.accept || "image/*",
      focus: props.field.focus || "50-50",
      isEditingFocus: false,
      posX: 50,
      posY: 50
    });

    const aspectRatioStyle = computed(
      () => `padding-top: calc((${state.height} / ${state.width} ) * 100%);`
    );

    const containerStyle = computed(() =>
      state.max_width ? `max-width: ${state.max_width};` : ""
    );

    const resizeAspectBox = () => {
      if (!refAspecRatioBox.value) return;
      if (state.containerWidth === refAspecRatioBox.value.offsetWidth) return;
      state.containerWidth = refAspecRatioBox.value.offsetWidth;
      state.croppa.refresh();
    };

    onMounted(() => {
      window.addEventListener("resize", resizeAspectBox);
      resizeAspectBox();
    });

    onBeforeUnmount(() => {
      window.removeEventListener("resize", resizeAspectBox);
    });

    const croppaQuality = computed(() => {
      return state.width / state.containerWidth;
    });

    const prepare = async () => {
      if (!state.croppa.chosenFile) return;

      const type = state.submitType
        ? state.submitType
        : state.croppa.chosenFile.type;

      const file = await state.croppa.promisedBlob(type, state.quality);

      return [
        {
          key: instance.$vnode.key,
          value: file
        },
        {
          key: `${instance.$vnode.key}_focus`,
          value: `${state.posX}-${state.posY}`
        },
        {
          key: `${instance.$vnode.key}_container`,
          value: state.container
        },
        {
          key: `${instance.$vnode.key}_folder`,
          value: state.folder
        }
      ];
    };

    const download = (type, compressionRate) => {
      state.croppa.generateBlob(
        blob => {
          if (!blob) return;
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.download = "filename";
          a.href = url;
          a.click();
          URL.revokeObjectURL(url);
        },
        type,
        compressionRate
      );
    };

    const toggleFocus = () => {
      state.isEditingFocus = !state.isEditingFocus;
    };

    const setFocus = event => {
      const rect = event.target.getBoundingClientRect();
      state.posX = Math.round(((event.clientX - rect.left) * 100) / rect.width); //x percentage.
      state.posY = Math.round(((event.clientY - rect.top) * 100) / rect.height); //y percentage.
    };

    const focusPosition = computed(() => {
      return `left:calc(${state.posX}% - 20px);top:calc(${state.posY}% - 20px)`;
    });

    return {
      ...toRefs(state),
      prepare,
      aspectRatioStyle,
      containerStyle,
      download,
      refAspecRatioBox,
      croppaQuality,
      resizeAspectBox,
      toggleFocus,
      setFocus,
      focusPosition
    };
  }
};
</script>
