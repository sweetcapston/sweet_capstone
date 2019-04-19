import Vue from "vue";
import "./plugins";
import "./components";
import App from "./App.vue";
import  store  from './store'

Vue.config.productionTip = false;
Vue.prototype.$EventBus = new Vue();

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
