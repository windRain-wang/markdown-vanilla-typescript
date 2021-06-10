import { createEditor } from "./core/editor";
import { createToolbars } from "./core/tools";

function init() {
  // 工具的渲染
  createToolbars(document.getElementById("nav"));
  // 编辑区域的渲染
  createEditor(document.getElementById("content"));
}

init();
