<template>
  <div class="octo-form-editor">
    <menu-bubble :editor="editor" :field="field" />
    <div class="octo-control" @click="focusEditor">
      <editor-content
        class="editor__content textarea"
        :class="{ 'is-primary': editor.focused }"
        :editor="editor"
      />
    </div>
  </div>
</template>

<script>
import { Editor, EditorContent } from "tiptap";
import { HardBreak, ListItem, Bold, Italic, History } from "tiptap-extensions";

import { OctLink, OctHeading, OctParagraph, OctBulletList } from "./nodes";

import MenuBubble from "./MenuBubble.vue";

export default {
  name: "TipTap",
  props: {
    value: {
      type: String,
      default: "<p></p>"
    },
    field: null
  },
  components: {
    EditorContent,
    MenuBubble
  },
  data() {
    return {
      html: "",
      active: false,
      editor: new Editor({
        extensions: [
          new OctBulletList(),
          new OctParagraph(),
          new OctHeading({ levels: [2, 3] }),
          new OctLink(),
          new HardBreak(),
          new ListItem(),
          new Bold(),
          new Italic(),
          new History()
        ],
        onUpdate: ({ getHTML }) => {
          this.html = getHTML();
        },
        onFocus: () => {
          this.active = true;
        },
        onBlur: () => {
          // this.active = false;
        },
        content: ""
      })
    };
  },
  watch: {
    html: {
      handler: function(html) {
        this.html = html === "<p></p>" ? "" : html;
        this.$emit("input", this.html);
        this.$emit("change");
      }
    }
  },
  mounted() {
    this.initEditor();
    console.log(this.editor);
  },
  beforeDestroy() {
    this.editor.destroy();
  },
  methods: {
    focusEditor() {
      this.editor.focus();
    },
    initEditor() {
      this.editor.setContent(this.value);
    }
  }
};
</script>
