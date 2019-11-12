import { shallowMount } from '@vue/test-utils'
import Kaikeba from '@/components/Kaikeba.vue'

describe('Kaikeba.vue', () => {
  it('要求设置created', () => {
    
    expect(typeof Kaikeba.created).toBe('function')
  })

  it('data中message默认值是vue-test', () => {
    const defaultData = Kaikeba.data()
    expect(defaultData.message).toBe('vue-test')
  })

  it('mount之后data是开课吧', () => {
    //   VueWrapper
    const wrapper = shallowMount(Kaikeba)
    // vm获取组件实例
    expect(wrapper.vm.message).toBe('开课吧')
  })

  it('点击按钮之后是按钮点击', () => {
    //   VueWrapper
    const wrapper = shallowMount(Kaikeba)
    // 查询按钮,触发点击
    wrapper.find('button').trigger('click')
    // 查询元素，看内部文本是否匹配
    expect(wrapper.find('span').text()).toBe('按钮点击')
  })
})
