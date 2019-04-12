import Vue from "vue";
import "./plugins";
import "./components";
import App from "./App.vue";

Vue.config.productionTip = false;
Vue.prototype.$EventBus = new Vue();

new Vue({
  render: h => h(App)
}).$mount("#app");
