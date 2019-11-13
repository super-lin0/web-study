import { shallowMount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";

const add = (num1, num2) => num1 + num2;

describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
  });

  it("测试add函数", () => {
    expect(add(1, 2)).toBe(3);
    expect(add(2, 3)).toBe(5);
    expect(add(2, 2)).toBe(4);
  });
});
