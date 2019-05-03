import { mount } from '@vue/test-utils';
import Login from '@/views/Login.vue';
import LoginForm from "@/components/modal/LoginForm.vue";
import SignUpForm from "@/components/modal/SignUpForm.vue";
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/src/stylus/app.styl'
import router from "@/router";
import store  from '@/store.js';
import "@/plugins/axios.js";

Vue.use(Vuetify, {
  iconfont: 'md',
})

Vue.use(router);
Vue.use(store);
Vue.config.productionTip = false;
Vue.prototype.$EventBus = new Vue();

Vue.component("modal-login-form", LoginForm);
Vue.component("modal-sign-up-form", SignUpForm);
/* eslint-disable */

const wrapper = mount(Login);

describe('Login test', () => {
  it('Login Page Opened', () => {
    expect(wrapper.vm.$data.username).toBe('');
  })
});