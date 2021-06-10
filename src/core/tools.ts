import { handleFont } from "./utils";
import { FontEnum } from "./types";
abstract class Tool {
  constructor(public toolName: string, public icon: string) {}
  abstract action(text: string, start: number, end: number): string;
}

export class FontBlodTool extends Tool {
  constructor() {
    super("加粗", "");
  }
  action(text: string, start: number, end: number): string {
    return handleFont(text, start, end, FontEnum.Blod);
  }
}

export class FontItalicTool extends Tool {
  constructor() {
    super("倾斜", "");
  }
  action(text: string, start: number, end: number): string {
    return handleFont(text, start, end, FontEnum.Italic);
  }
}

export class FontDelTool extends Tool {
  constructor() {
    super("删除线", "");
  }
  action(text: string, start: number, end: number): string {
    return handleFont(text, start, end, FontEnum.Del);
  }
}

class ToolsUI {
  public btns: HTMLElement[] = [];
  constructor(private tools: Tool[], private toolsParentEl: HTMLElement) {}
  render() {
    const toolFragment = document.createDocumentFragment();
    this.btns = this.tools.map((t) => {
      const btn = document.createElement("span");
      btn.setAttribute("class", "nav-tool");
      btn.textContent = t.toolName;
      toolFragment.appendChild(btn);
      return btn;
    });
    this.toolsParentEl.appendChild(toolFragment);
  }

  bindEvent(handleEvent: () => void) {
    this.btns.forEach((el) => {
      el.addEventListener("click", function () {
        handleEvent();
      });
    });
  }
}

const allTools = [new FontBlodTool(), new FontItalicTool(), new FontDelTool()];

export const createToolbars = (toolsParentEl: HTMLElement | null) => {
  if (toolsParentEl) {
    const toolsUI = new ToolsUI(allTools, toolsParentEl);
    toolsUI.render();
    return toolsUI;
  } else {
    throw Error("Don't exist toolsParentEl element.");
  }
};
