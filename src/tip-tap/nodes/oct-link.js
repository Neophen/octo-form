import { Link } from "tiptap-extensions";

export class OctLink extends Link {
  get schema() {
    return {
      attrs: {
        href: {
          default: null
        },
        "data-link-type": {
          default: "link"
        },
        "data-has-file": {
          default: false
        },
        target: {
          default: null
        },
        rel: {
          default: null
        },
        class: {
          default: "oct-a"
        }
      },
      inclusive: false,
      parseDOM: [
        {
          tag: "a[href]",
          getAttrs: dom => {
            return {
              href: dom.getAttribute("href"),
              target: dom.getAttribute("target"),
              rel: dom.getAttribute("rel"),
              "data-link-type": dom.getAttribute("data-link-type"),
              "data-has-file": dom.getAttribute("data-has-file")
            };
          }
        }
      ],
      toDOM: node => {
        return [
          "a",
          {
            ...node.attrs,
            target: "__blank",
            class: "oct-a",
            rel: "noopener noreferrer nofollow"
          },
          0
        ];
      }
    };
  }
}
