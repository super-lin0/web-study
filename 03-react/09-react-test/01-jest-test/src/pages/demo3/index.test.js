import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Toggle from "./index";

let container = null;
beforeEach(() => {
  // 创建一个 DOM 元素作为渲染目标
  container = document.createElement("div");
  // container *必须* 附加到 document，事件才能正常工作。
  document.body.appendChild(container);
});

afterEach(() => {
  // 退出时进行清理
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("点击时更新值", () => {
  act(() => {
    render(<Toggle />, container);
  });

  // 获取按钮元素，并触发点击事件
  const button = document.querySelector("button");
  const span = document.querySelector("span");
  expect(span.innerHTML).toBe("Hello, World");

  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(span.innerHTML).toBe("你好，世界");

  act(() => {
    for (let i = 0; i < 5; i++) {
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    }
  });
  expect(span.innerHTML).toBe("你好，世界");
});
