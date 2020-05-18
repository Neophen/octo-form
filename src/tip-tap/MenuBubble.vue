<template>
  <portal to="octo-popups-multiple">
    <editor-menu-bubble
      :editor="editor"
      :keep-in-bounds="false"
      @hide="hideMenuBubble"
      @show="showMenuBubble"
      v-slot="{ menu, getMarkAttrs }"
    >
      <div
        ref="refMenuBubble"
        class="octo-form-menu-bubble"
        :class="{ 'is-active': menu.isActive }"
        :style="`left: ${menu.left}px; top: ${menu.top + 10}px;`"
      >
        <div class="octo-form-menu-bubble__card is-flex">
          <button
            class="octo-form-menu-bubble__btn"
            :class="{ 'is-active': isActive.heading({ level: 2 }) }"
            @click="commands.heading({ level: 2 })"
          >
            <o-icon icon="h1" pack="opb" class="octo-form-menu-bubble_icon" />
          </button>
          <button
            class="octo-form-menu-bubble__btn"
            :class="{ 'is-active': isActive.heading({ level: 3 }) }"
            @click="commands.heading({ level: 3 })"
          >
            <o-icon icon="h2" pack="opb" class="octo-form-menu-bubble_icon" />
          </button>
          <button
            class="octo-form-menu-bubble__btn"
            :class="{ 'is-active': isActive.paragraph() }"
            @click="commands.paragraph"
          >
            <o-icon
              icon="paragraph"
              pack="opb"
              class="octo-form-menu-bubble_icon"
            />
          </button>
          <button
            class="octo-form-menu-bubble__btn"
            :class="{ 'is-active': isActive.italic() }"
            @click="commands.italic"
          >
            <o-icon
              icon="italics"
              pack="opb"
              class="octo-form-menu-bubble_icon"
            />
          </button>
          <button
            class="octo-form-menu-bubble__btn"
            :class="{ 'is-active': isActive.bold() }"
            @click="commands.bold"
          >
            <o-icon icon="bold" pack="opb" class="octo-form-menu-bubble_icon" />
          </button>
          <button
            class="octo-form-menu-bubble__btn"
            :class="{ 'is-active': isActive.bullet_list() }"
            @click="commands.bullet_list"
          >
            <o-icon icon="list" pack="opb" class="octo-form-menu-bubble_icon" />
          </button>
          <button
            class="octo-form-menu-bubble__btn"
            :class="{ 'is-active': isActive.link() }"
            @click="
              showLinkMenu(getMarkAttrs('link'), isActive.link(), commands.link)
            "
          >
            <o-icon icon="link" pack="opb" class="octo-form-menu-bubble_icon" />
          </button>
        </div>
        <link-menu
          class="octo-form-menu-bubble__card"
          v-if="isLinkMenuOpen || isActive.link()"
          :link-command="commands.link"
          :link-attributes="getMarkAttrs('link')"
          @close="hideLinkMenu"
          :file-manager="fileManager"
        />
      </div>
    </editor-menu-bubble>
  </portal>
</template>

<script>
import { reactive, toRefs } from "@vue/composition-api";
import { EditorMenuBubble } from "tiptap";

import LinkMenu from "./LinkMenu.vue";

export default {
  name: "MenuBubble",
  components: {
    LinkMenu,
    EditorMenuBubble
  },
  props: {
    fileManager: {
      type: Object,
      required: true
    },
    editor: null,
    editorRef: null
  },
  setup(props) {
    const state = reactive({
      isLinkMenuOpen: false,
      linkAttributes: {},
      popper: null,
      isPopperOpen: false,
      selectionRef: null,
      commands: props.editor.commands,
      isActive: props.editor.isActive
    });

    const hideLinkMenu = () => {
      state.isLinkMenuOpen = false;
      state.linkAttributes = {};
    };

    const showLinkMenu = (attrs, isActive, linkCommand) => {
      if (isActive) {
        linkCommand({ href: null });
        return;
      }
      state.isLinkMenuOpen = true;
      state.linkAttributes = attrs;
    };

    const hideMenuBubble = () => {
      hideLinkMenu();
    };

    const showMenuBubble = () => {
      // initPopper();
    };

    return {
      ...toRefs(state),
      hideLinkMenu,
      showLinkMenu,
      showMenuBubble,
      hideMenuBubble
    };
  }
};
</script>
