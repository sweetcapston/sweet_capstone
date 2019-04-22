import Vue from "vue";
import "./plugins";
import "./plugins/vuetify";
import "./components";
import App from "./App.vue";
import store  from './store';
import router from './router';

Vue.config.productionTip = false;
Vue.prototype.$EventBus = new Vue();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
