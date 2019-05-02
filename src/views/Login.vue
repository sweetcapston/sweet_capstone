<template>
  <v-app>
    <v-content>
      <section>
        <v-parallax 
          height="600"
          src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
        >
          <v-layout justify-end>
            <modal-login-form />
            <modal-sign-up-form />
          </v-layout>
          <v-layout
            column
            align-center
            justify-center
            class="white--text"
          >
            <img src="../assets/logo.svg" alt="Vuetify.js" height="200">
            <h1 class="white--text mb-2 display-1 text-xs-center">OpenClass</h1>
            <div class="subheading mb-3 text-xs-center">Powered by Sweet</div>
            <v-btn
              class="blue lighten-2 mt-5"
              dark
              large
              href="/pre-made-themes"
            >
              How to use
            </v-btn>
          </v-layout>
        </v-parallax>
      </section>

      <section>
        <v-layout
          column
          wrap
          class="my-5"
          align-center
        >
          <v-flex xs12 sm4 class="my-3">
            <div class="text-xs-center">
              <h2 class="headline">How to use</h2>
              <span class="subheading">
                스크린샷 예시, 설명 
              </span>
            </div>
          </v-flex>
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex xs12 md3>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">home</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">홈</div>
                    </v-card-title>
                    <v-card-text>
                      설명 작성 가능합니다.
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md3>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">lightbulb</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline">질문</div>
                    </v-card-title>
                    <v-card-text>
                      설명 작성 가능합니다. 
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md3>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">call</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">설문</div>
                    </v-card-title>
                    <v-card-text>
                      설명 작성 가능합니다. 
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md3>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">dashboard</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">통계</div>
                    </v-card-title>
                    <v-card-text>
                      설명 작성 가능합니다. 
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>

      <section>
        <v-parallax src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg" height="380">
          <v-layout column align-center justify-center>
            <div class="headline white--text mb-3 text-xs-center">For a better lecture</div>
            <em>Sweet</em>
            <v-btn
              class="blue lighten-2 mt-5"
              dark
              large
              href="/pre-made-themes"
            >
              Get Started
            </v-btn>
          </v-layout>
        </v-parallax>
      </section>

      <section>
        <v-container grid-list-xl>
          <v-layout row wrap justify-center class="my-5">
            <v-flex xs12 sm4>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Company info</div>
                </v-card-title>
                <v-card-text>
                  Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare. 
                  Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
                  Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti. 
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 sm4 offset-sm1>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Contact us</div>
                </v-card-title>
                <v-card-text>
                  Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                </v-card-text>
                <v-list class="transparent">
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">phone</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>777-867-5309</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">place</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>Chicago, US</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">email</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>john@vuetifyjs.com</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </section>
      
      <core-footer />
    </v-content>
  </v-app>
</template>

<script>
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
      password:''
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
