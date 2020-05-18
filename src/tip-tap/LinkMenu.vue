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
        v-model="link"
        @blur="setLinkCommand"
        @keydown.native.enter.prevent="setLinkCommand"
        @keydown.native.tab="setLinkCommand"
        placeholder="Paste URL..."
      />
    </div>
    <div v-if="linkType === 'file'">
      <input
        type="file"
        hidden
        ref="fileInputRef"
        @change="handleInputChange"
      />
      <div v-if="file" class="__file-link">
        <o-text>{{ shortUrl }}</o-text>
      </div>
      <o-button @click="chooseFile" class="w-full" :loading="isLoading">
        {{ file ? "Change file" : "Select file" }}
      </o-button>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, watch, ref, computed } from "@vue/composition-api";
import { useFileManager } from "../utils/useFileManager";

export default {
  name: "LinkMenu",
  props: {
    linkCommand: null,
    linkAttributes: null
  },
  setup(props) {
    const fileInputRef = ref(null);
    const { fileManager } = useFileManager();

    const state = reactive({
      linkType: props.linkAttributes["data-link-type"] || "link",
      file: props.linkAttributes["data-file"] || "",
      link: props.linkAttributes["data-link"] || "",
      isLoading: false
    });

    watch(
      () => props.linkAttributes,
      linkAttributes => {
        state.linkType = linkAttributes["data-link-type"] || state.linkType;
        state.file = linkAttributes["data-file"] || state.file;
        state.link = linkAttributes["data-link"] || state.link;
      }
    );

    const linkCommand = options => {
      const base = {
        href: state.linkType === "link" ? state.link : state.file,
        "data-link-type": state.linkType,
        "data-file": state.file,
        "data-link": state.link
      };
      props.linkCommand({ ...base, ...options });
    };

    watch(
      () => state.linkType,
      linkType => {
        linkCommand({
          href: linkType === "link" ? state.link : state.file,
          "data-link-type": linkType
        });
      },
      { lazy: true }
    );

    watch(
      () => state.file,
      file => {
        linkCommand({
          href: file,
          "data-link-type": "file"
        });
      },
      { lazy: true }
    );

    const setLinkCommand = () => {
      if (state.link === "") {
        linkCommand({ href: null });
        return;
      }
      linkCommand({ href: state.link });
    };

    const shortUrl = computed(() => /[^/]*$/.exec(state.file)[0]);

    const chooseFile = () => {
      fileInputRef.value.click();
    };

    const handleInputChange = async () => {
      if (!fileInputRef.value.files.length) return;
      state.isLoading = true;

      try {
        const oldFile = state.file;
        state.file = await fileManager.uploadFile(fileInputRef.value.files[0]);

        if (oldFile) {
          fileManager.deleteFile(oldFile);
        }
      } catch (error) {
        console.error(error);
      } finally {
        state.isLoading = false;
      }
    };

    return {
      ...toRefs(state),
      shortUrl,
      setLinkCommand,
      fileInputRef,
      chooseFile,
      handleInputChange
    };
  }
};
</script>
