export default class SelectionRef {
  constructor(node) {
    this.updateRect();

    const update = (evt, hide) => {
      // console.log(evt);
      let selection = document.getSelection();

      this.range = selection && selection.rangeCount && selection.getRangeAt(0);

      this.updateRect(hide);
    };

    const updateMouseMove = (evt, hide) => {
      if (!this.mouseDown) return;

      console.log(hide);
      console.log("mooving mouse");
      let selection = document.getSelection();
      console.log(selection);

      this.range = selection && selection.rangeCount && selection.getRangeAt(0);
      console.log(this.range);

      this.updateRect(hide);
    };

    const startMouseSelect = () => {
      console.log("start mouse");
      this.mouseDown = true;
    };

    const stopMouseSelect = () => {
      console.log("stop mouse");
      this.mouseDown = false;
    };

    node.addEventListener("mousedown", startMouseSelect);
    node.addEventListener("mouseup", stopMouseSelect);
    node.addEventListener("mouseup", update);
    node.addEventListener("input", update);
    node.addEventListener("keydown", evt => update(evt, false));

    window.addEventListener("scroll", update);
    window.addEventListener("mousemove", updateMouseMove);
    document.scrollingElement.addEventListener("scroll", update);
  }

  updateRect(hide) {
    if (!hide && this.range) {
      this.rect = this.range.getBoundingClientRect();
    } else {
      this.rect = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: 0,
        height: 0
      };
    }

    this.rectChangedCallback(this.rect);
  }

  rectChangedCallback() {
    // Abstract to be implemented
  }

  getBoundingClientRect() {
    return this.rect;
  }
}
