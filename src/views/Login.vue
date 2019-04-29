<template>
  <v-app>
    <v-content>
        <modal-login-form/>
        <modal-sign-up-form/>
    </v-content>
  </v-app>
</template>

<script>
import "semantic-ui-css/semantic.min.css";
import SuiVue from "semantic-ui-vue";
import VeeValidate from "vee-validate";
import ko from "vee-validate/dist/locale/ko.js";
import Auth from "../api/Auth";
import VueSession from "vue-session";
import Vue from "vue";

const config = {
  locale: "ko",
  dictionary: {
    ko
  }
};

Vue.use(VeeValidate, config);
Vue.use(SuiVue);
Vue.use(VueSession);

/* eslint-disable */
export default {
  name: "app",
  created() {
    Auth.auth(this.$session.get("token")).then(res => {
      console.log(res);
      res.data
    });
  },
  data() {
    return {
      username:'',
      password:'',
      Identity: 0   //0 로그인x, 1 학생 , 2 교수, 3 관리자
    };
  },
  methods: {
    // this.$router.push({name: 'main'}) // 로그인 성공후 메인페이지로 이동
    login(){
      this.$store.dispatch('retrieveToken',{
        username: this.username,
        password: this.password
      })
    },

  }
};
</script>
<style lang="scss">

@import '@/styles/index.scss';

</style>