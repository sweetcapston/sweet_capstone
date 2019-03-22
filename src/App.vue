<template>
  <div id="app">
    <div id="topbar">
      <Login/>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Vue from "vue";
import SuiVue from "semantic-ui-vue";
import GAuth from "vue-google-oauth2";
import Login from "./components/Login";
import "semantic-ui-css/semantic.min.css";
import VeeValidate from "vee-validate";

Vue.use(VeeValidate);
Vue.use(SuiVue);

export default {
  name: "app",
  components: {
    Login: Login
  }
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
#topbar {
  height: 30%;
  text-align: right;
  padding-top: 1%;
  padding-bottom: 1%;
}
</style>
