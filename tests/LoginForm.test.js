import { mount } from '@vue/test-utils';
import LoginForm from "@/components/modal/LoginForm.vue";
import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/src/stylus/app.styl';
import router from "@/router";
import store  from '@/store.js';
import "@/plugins/axios.js";

Vue.use(Vuetify, {
  iconfont: 'md',
});

Vue.use(router);
Vue.use(store);
Vue.config.productionTip = false;
Vue.prototype.$EventBus = new Vue();

/* eslint-disable */

const wrapper = mount(LoginForm);

describe('LoginForm test', () => {
  it('LoginForm Button unClicked', () => {
    expect(wrapper.vm.$data.Openlogin).toBe(false);
  })
  it('LoginForm Button Clicked', () => {
    wrapper.find('button.ui.button').trigger('click')
    expect(wrapper.vm.$data.Openlogin).toBe(true);
  })
});