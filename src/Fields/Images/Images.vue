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
    :hasValue="!!computedValue"
  >
    <div class="octo-aspect-ratio-grid">
      <template v-if="images.length > 0">
        <div
          v-for="image in images"
          :key="image.id"
          class="octo-grid-item-container"
          :style="aspectRatioStyle"
        >
          <o-card class="octo-aspect-ratio-box-inside">
            <div v-if="image.data || image.src" slot="media">
              <img v-if="image.data" class="w-full" :src="image.data" />
              <img
                v-else
                class="octo_images__existing"
                :src="image.src"
                style="object-fit: cover"
              />
              <div class="octo-image__buttons">
                <o-button size="is-sm" squared @click="openChange(image.id)">
                  Change
                </o-button>
                <o-button size="is-sm" squared @click="destroy(image.id)">
                  Delete
                </o-button>
              </div>
            </div>
          </o-card>
        </div>
      </template>
      <div
        v-if="canAdd"
        class="octo-grid-item-container"
        :style="aspectRatioStyle"
      >
        <o-card
          type="is-dashed"
          @click="openAddImageForm"
          class="octo-aspect-ratio-box-inside"
        >
          <div class="octo_image__container octo-form__flex-center">
            <div class="octo-form__flex-center is-col has-accent">
              <o-icon icon="image" size="is-xl" class="octo-images__add-icon" />
              <o-h size="4">Add image</o-h>
            </div>
          </div>
        </o-card>
      </div>
    </div>
    <o-modal :active.sync="isOpen" prevent-click-outside>
      <o-modal-content size="large">
        <octo-form
          :fieldset="fieldset"
          :config="formConfig"
          @cancel="isOpen = false"
          @submit="onImageSubmit"
        />
      </o-modal-content>
    </o-modal>
  </o-field>
</template>

<script>
import { fieldMixin } from "../../utils/fieldMixin.js";
import { vModelMixin } from "../../utils/vModelMixin.js";
import {
  reactive,
  toRefs,
  computed,
  getCurrentInstance
} from "@vue/composition-api";
export default {
  name: "OctoFormImages",
  mixins: [vModelMixin, fieldMixin],
  setup(props, { root }) {
    const instance = getCurrentInstance();

    const state = reactive({
      isOpen: false,
      images: props.value || [],
      width: props.field.width,
      height: props.field.height,
      hasFocus: props.field.has_focus,
      container: props.field.container,
      folder: props.field.folder,
      formConfig: {
        confirm: "Add"
      },
      fieldset: {}
    });

    const aspectRatioStyle = computed(() => {
      return `padding-top: calc(${state.height} / ${state.width} * 100%);`;
    });

    const loadImage = imageData => {
      var reader = new FileReader();
      // Define a callback function to run, when FileReader finishes its job
      reader.onload = e => {
        // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
        // Read image as base64 and set to imageData

        state.images = state.images.map(image => {
          if (image.id !== imageData.id) {
            return image;
          }
          imageData.data = e.target.result;
          return imageData;
        });
      };
      // Start the reader job - read file as a data url (base64 format)
      reader.readAsDataURL(imageData.file);
    };

    const generateID = () =>
      (
        Date.now().toString(36) +
        Math.random()
          .toString(36)
          .substr(2, 5)
      )
        .toUpperCase()
        .toLowerCase();

    const onImageSubmit = formData => {
      const hasImage = formData.get("image");
      if (!hasImage) {
        state.isOpen = false;
        return;
      }

      const isAdd = formData.get("is_add") === "false" ? false : true;

      const imageData = {
        id: formData.get("image_id"),
        file: formData.get("image"),
        focus: formData.get("image_focus")
      };

      if (isAdd) {
        state.images.push(imageData);
      } else {
        state.images = state.images.map(image => {
          if (image.id !== imageData.id) {
            return image;
          }
          return imageData;
        });
      }

      root.$nextTick(() => loadImage(imageData));

      state.isOpen = false;
    };

    const openChange = id => {
      const image = state.images.find(img => img.id === id);
      const value = image.data ? image.data : image.src;
      state.fieldset = {
        image: {
          display: "",
          type: "image",
          value,
          focus: image.focus,
          width: props.field.width,
          height: props.field.height,
          has_focus: props.field.has_focus,
          container: props.field.container,
          submit_type: props.field.submit_type,
          quality: props.field.quality,
          folder: props.field.folder
        },
        image_id: {
          type: "hidden",
          value: id
        },
        is_add: {
          type: "hidden",
          value: false
        }
      };

      state.isOpen = true;
    };

    const openAddImageForm = () => {
      state.fieldset = {
        image: {
          display: "",
          type: "image",
          has_focus: true,
          width: props.field.width,
          height: props.field.height,
          hasFocus: props.field.has_focus,
          container: props.field.container,
          submit_type: props.field.submit_type,
          quality: props.field.quality,
          folder: props.field.folder
        },
        image_id: {
          type: "hidden",
          value: generateID()
        },
        is_add: {
          type: "hidden",
          value: true
        }
      };
      state.isOpen = true;
    };

    const destroy = id => {
      state.images = state.images.filter(image => image.id !== id);
    };

    const prepare = async () => {
      const key = instance.$vnode.key;
      if (state.images.length === 0) {
        return [
          {
            key,
            value: ""
          }
        ];
      }

      const config = [];
      const imgsData = [];

      state.images.forEach(image => {
        const imgKey = `${key}_${image.id}`;
        const file = image.file || image.src;
        const isFile = typeof file !== "string";
        config.push({ id: imgKey, is_image: isFile });
        imgsData.push({
          key: imgKey,
          value: image.file || image.src
        });
        imgsData.push({ key: `${imgKey}_focus`, value: image.focus });
      });

      return [
        {
          key: key,
          value: JSON.stringify(config)
        },
        ...imgsData
      ];
    };

    const canAdd = computed(() => {
      if (!props.field.max_files) {
        return true;
      }
      return state.images.length < props.field.max_files;
    });

    return {
      ...toRefs(state),
      prepare,
      onImageSubmit,
      aspectRatioStyle,
      openChange,
      openAddImageForm,
      destroy,
      canAdd
    };
  }
};
</script>
