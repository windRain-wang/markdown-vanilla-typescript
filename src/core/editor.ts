import MarkdownIt from "markdown-it";
const md = new MarkdownIt();
export class MdEditor {
  private _mdText: string = "";
  private _mdHtml: string = "";

  static compileText2Html(text: string): string {
    return md.render(text);
  }

  public get mdText(): string {
    return this._mdText;
  }

  public set mdText(v: string) {
    this._mdText = v;
    this.mdHtml = MdEditor.compileText2Html(v);
  }

  public get mdHtml(): string {
    return this._mdHtml;
  }

  public set mdHtml(v: string) {
    this._mdHtml = v;
  }
}

export class MdEditorUI {
  public editorEl: HTMLTextAreaElement;
  public showEl: HTMLDivElement;
  public parentEl: HTMLElement;

  constructor(
    editorEl: HTMLTextAreaElement,
    showEl: HTMLDivElement,
    parentEl: HTMLElement
  ) {
    this.editorEl = editorEl;
    this.showEl = showEl;
    this.parentEl = parentEl;
  }

  public renderValue(mdText: string = "", mdHtml: string = "") {
    this.editorEl.value = mdText;
    this.showEl.innerHTML = mdHtml;
  }

  public render() {
    this.renderValue();
    this.parentEl.appendChild(this.editorEl);
    this.parentEl.appendChild(this.showEl);
  }
}

interface MdEditorControlInterface {
  render(): void;
  bindEvent(): void;
}

export class MdEditorControl implements MdEditorControlInterface {
  constructor(private mdEditor: MdEditor, private mdUI: MdEditorUI) {}
  render(): void {
    this.mdUI.render();
  }
  bindEvent(): void {
    const _this = this;
    this.mdUI.editorEl.addEventListener("input", function () {
      _this.mdEditor.mdText = this.value;
      const { mdText, mdHtml } = _this.mdEditor;
      _this.mdUI.renderValue(mdText, mdHtml);
    });
  }
}

export const createEditor = (parentEl: HTMLElement | null) => {
  const editorEl = document.createElement("textarea"),
    showEl = document.createElement("div");
  editorEl.setAttribute("class", "content-edit");
  showEl.setAttribute("class", 'content-show"');
  if (parentEl) {
    const mdEditor = new MdEditor();
    const mdUI = new MdEditorUI(editorEl, showEl, parentEl);
    const mdEditorControl = new MdEditorControl(mdEditor, mdUI);
    mdEditorControl.render();
    mdEditorControl.bindEvent();
    return mdEditorControl;
  } else {
    throw Error("Don't exist parentEl");
  }
};
