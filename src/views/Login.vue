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
    Auth.auth().then(res => {
      if(!res.data)
        return;
      switch(this.$session.get("Identity")){
          case 1: //학생
            this.$router.push({name: 'main'}) // 로그인 성공후 메인페이지로 이동
            break;
          case 2: //교수
            break;
          case 3: //관리자
            break;
      }
    });
  },
  data() {
    return {
      username:'',
      password:'',
    };
  },
  methods: {
    // this.$router.push({name: 'main'}) // 로그인 성공후 메인페이지로 이동
    login(){
      this.$store.dispatch('retrieveToken',{
        username: this.username,
        password: this.password,
      })
    },

  }
};
</script>
<style lang="scss">

@import '@/styles/index.scss';

</style>