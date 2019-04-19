<template>
  <div id="app">
    {{$store.state.test}}
    <Home></Home>
    <modal-login-form/>
    <modal-sign-up-form/>
  </div>
</template>

<script>
import Vue from "vue";
import "semantic-ui-css/semantic.min.css";
import SuiVue from "semantic-ui-vue";
import VeeValidate from "vee-validate";
import ko from "vee-validate/dist/locale/ko.js";
import Auth from "./api/Auth";
import VueSession from 'vue-session';
import Home from './components/core/Home'


const config = {
  locale: "ko",
  dictionary: {
    ko
  }
};
Vue.use(VeeValidate, config);
Vue.use(SuiVue);
Vue.use(VueSession)
/* eslint-disable */
export default {
  name: "app",
  components: {
    Home
  },
  created() {
    Auth.auth(this.$session.get('token')).then(res=> {
        console.log(res)
      })
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
button.ui.positive.button {
  background: black;
}
button.ui.positive.button:active {
  background: black;
}
button.ui.positive.button:focus {
  background: rgb(63, 62, 62);
}
button.ui.positive.button:hover {
  background: rgb(63, 62, 62);
}
.unselectable {
  -webkit-user-select: none; /* Safari, Chrome */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE */
  user-select: none; /* CSS3 */
}
.undraggable {
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
}
label {
  font-size: 90%;
  font-weight: bold;
  color: rgb(33, 74, 74);
  padding-left: 1%;
}
</style>
