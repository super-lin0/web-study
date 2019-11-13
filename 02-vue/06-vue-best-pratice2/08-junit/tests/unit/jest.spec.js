import { shallowMount } from "@vue/test-utils";
import Jest from "@/components/Jest.vue";

describe("jest.vue", () => {
  it("要求设置created生命周期", () => {
    expect(typeof Jest.created).toBe("function");
  });

  it("message的初始值是vue-text", () => {
    // 检查data属性的存在
    expect(typeof Jest.data).toBe("function");

    // 检查data返回默认值
    const defaultData = Jest.data();

    expect(defaultData.message).toBe("vue-text");
  });

  it("mount之后message是txt", () => {
    const wrapper = shallowMount(Jest);
    expect(wrapper.vm.message).toBe("txt");
  });

  it("点击按钮时候message变为按钮点击", () => {
    // VueWrapper
    const wrapper = shallowMount(Jest);
    wrapper.find("button").trigger("click");

    expect(wrapper.find("span").text()).toBe("按钮点击");
  });
});
