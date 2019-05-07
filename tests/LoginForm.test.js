import { mount } from '@vue/test-utils';
import Login from '@/views/Login.vue';
import LoginForm from "@/components/modal/LoginForm.vue";
import SignUpForm from "@/components/modal/SignUpForm.vue";
import Footer from "@/components/core/Footer.vue";
import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/src/stylus/app.styl';
import router from "@/router";
import store  from '@/store.js';
import "@/plugins/axios.js";
import * as httpMock from 'moxios';

Vue.use(Vuetify, {
  iconfont: 'md',
});

Vue.use(router);
Vue.use(store);
Vue.config.productionTip = false;
Vue.prototype.$EventBus = new Vue();

Vue.component("modal-login-form", LoginForm);
Vue.component("modal-sign-up-form", SignUpForm);
Vue.component("core-footer", Footer);

/* eslint-disable */


describe('LoginForm test', () => {
  const parent = mount(Login);
  const wrapper = mount(LoginForm);
  const Rwrapper = mount(SignUpForm);
  
  it('LoginForm Open Clicked', () => {
    parent.find('button.transparent.ui.button').trigger('click')
    expect(wrapper.vm.$data.LoginSign).toBe(true);
  })
  it('LoginForm form write test', () => {
    // global.alert = jest.fn()
    wrapper.setData({email:"testS@email.com", password:"qwe123"});
    // expect(wrapper.vm.$data.email).toBe("testS@email.com");
    // expect(wrapper.vm.$data.password).toBe("qwe123");
    // wrapper.find("button").trigger("click");
    // expect(alert).toHaveBeenCalled();
    wrapper.find("button").trigger ("click");
    console.log(wrapper.vm)
    console.log(wrapper)
    httpMock.wait(() => {
      Vue.nextTick(() => {
        console.log(wrapper)
        console.log(wrapper.vm)
          expect(wrapper.html()).toContain("Something wrong here");
          expect(wrapper.vm.$data.password).toBe("");
          done();
      });
  });
  })
  it('Change M0dal test', () => {
    expect(wrapper.vm.$data.LoginSign).toBe(true);
    wrapper.find("a").trigger('click');
    expect(wrapper.vm.$data.LoginSign).toBe(false);
    expect(Rwrapper.vm.$data.RegisterSign).toBe(true);
  })
});