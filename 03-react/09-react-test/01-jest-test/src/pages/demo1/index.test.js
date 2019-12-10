import { add } from "./index";

// 测试套件 test suite
describe("函数测试", () => {
  // 测试用例 test case
  it("测试add函数", () => {
    // 断言 assert
    expect(add(1, 3)).toBe(4);
    expect(add(1, 3)).toBe(4);
    expect(add(-2, 3)).toBe(1);
  });
});
