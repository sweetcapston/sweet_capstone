import {mount} from 'vue-test-utils'
import App from '../src/App.vue'

/* eslint-disable */
describe('App.vue', () => {
  const renderer = require('vue-server-renderer').createRenderer()

  it('should render correct contents', () => {
    const wrap = mount(App)

    expect(wrap.vm.msg).toEqual('Welcome to Your Vue.js App')
    expect(wrap.find('h1').text()).toEqual(wrap.vm.msg)

    renderer.renderToString(wrap.vm, (err, str) => {
      expect(str).toMatchSnapshot()
    })
  })
})