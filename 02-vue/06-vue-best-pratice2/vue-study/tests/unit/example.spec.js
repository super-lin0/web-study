import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const $store = {state:{count:1}};
    const wrapper = shallowMount(HelloWorld, {
      mocks: {$store},
      propsData: { msg },
      provide: {foo:'this is a provide data'}
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
