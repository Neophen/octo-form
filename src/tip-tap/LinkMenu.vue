<template>
  <div class="octo-form-menu-bubble__link-menu">
    <o-radio
      name="link_type"
      class="__radio"
      v-model="linkType"
      native-value="link"
    >
      Link
    </o-radio>
    <o-radio
      name="link_type"
      class="__radio has-margin"
      v-model="linkType"
      native-value="file"
    >
      File
    </o-radio>
    <div class="__separator"></div>
    <div v-if="linkType === 'link'">
      <o-input
        class="w-full"
        v-model="url"
        @blur="updateUrl"
        @keydown.native.enter.prevent="updateUrl"
        @keydown.native.tab="updateUrl"
        placeholder="Paste URL..."
      />
    </div>
    <div v-if="linkType === 'file'">
      <input type="file" hidden ref="fileInput" @change="handleInputChange" />
      <o-text v-if="hasFile" style="__file-link">{{ url }}</o-text>
      <o-button @click="chooseFile" class="w-full" :loading="isLoading">
        {{ hasfile ? "Change file" : "Select file" }}
      </o-button>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, watch, ref } from "@vue/composition-api";

export default {
  name: "LinkMenu",
  props: {
    linkCommand: null,
    linkAttributes: null,
    field: null
  },
  setup(props) {
    const fileInput = ref(null);

    const state = reactive({
      linkType: props.linkAttributes["data-link-type"] || "link",
      url: props.linkAttributes.href,
      hasFile: props.linkAttributes["data-has-file"] || false,
      isLoading: false
    });

    watch(
      () => props.linkAttributes,
      linkAttributes => {
        state.url = linkAttributes.href;
        state.hasFile = linkAttributes["data-has-file"] || state.hasFile;
        state.linkType = linkAttributes["data-link-type"] || state.linkType;
      }
    );

    watch(
      () => state.linkType,
      linkType => {
        props.linkCommand({
          href: state.url,
          "data-link-type": linkType
        });
      },
      { lazy: true }
    );

    const updateUrl = () => {
      if (state.url === "") {
        props.linkCommand({ href: null });
        return;
      }
      props.linkCommand({
        href: state.url,
        "data-link-type": state.linkType,
        "data-has-file": false
      });
    };

    const chooseFile = () => {
      fileInput.value.click();
    };

    const handleInputChange = async () => {
      let input = fileInput.value;
      if (!input.files.length) return;

      let file = input.files[0];

      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "file");
      formData.append("container", props.field.container);
      formData.append("folder", props.field.folder);

      state.isLoading = true;

      if (state.hasFile) {
        window.axios.post(props.field.delete_url, {
          _method: "delete",
          url: state.url
        });
      }

      try {
        const { data } = await window.axios.post(
          props.field.upload_url,
          formData,
          {
            headers: {
              "content-type": "multipart/form-data"
            }
          }
        );
        props.linkCommand({
          href: data,
          "data-has-file": true,
          "data-link-type": "file"
        });
      } catch (error) {
        console.error(error);
      } finally {
        state.isLoading = false;
      }
    };

    return {
      ...toRefs(state),
      updateUrl,
      fileInput,
      chooseFile,
      handleInputChange
    };
  }
};
</script>
