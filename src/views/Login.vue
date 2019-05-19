<template>
  <v-app>
    <v-toolbar class="v-toolbar--fixed white--text elevation-0 transparent">
      <img src="@/assets/logo.svg" height="50">
      <v-spacer />
      <sui-button class="transparent" positive @click="OpenLogin">로그인</sui-button>
      <sui-button class="cyan lighten-1" positive @click.native="OpenRegister" id="signbtn">회원가입</sui-button>
    </v-toolbar>
    <router-view/>
    <v-content>
      <section>
        <v-parallax 
          height="700"
          src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
        >
          <v-layout
            column
            align-center
            justify-center
            class="white--text"
          >
            <img src="@/assets/logo.svg" class="unselectable undraggable" alt="Vuetify.js" height="200">
            <h1 class="white--text mb-2 display-1 text-xs-center unselectable undraggable">OpenClass</h1>
            <div class="subheading mb-3 text-xs-center unselectable undraggable">Powered by Sweet</div>
            <v-btn class="cyan lighten-1 mt-5" dark large @click="alert(1)">
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
                      <v-icon x-large class="cyan--text text--lighten-1">home</v-icon>
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
                      <v-icon x-large class="cyan--text text--lighten-1">lightbulb</v-icon>
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
                      <v-icon x-large class="cyan--text text--lighten-1">call</v-icon>
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
                      <v-icon x-large class="cyan--text text--lighten-1">dashboard</v-icon>
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
        <v-parallax
          height="500" 
          src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg">
          <v-layout column align-center justify-center>
            <div class="headline white--text mb-3 text-xs-center">For a better lecture</div>
            <em>Sweet</em>
            <v-btn
              class="cyan lighten-1 mt-5"
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
                      <v-icon class="cyan--text text--lighten-1">phone</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>777-867-5309</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="cyan--text text--lighten-1">place</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>Chicago, US</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="cyan--text text--lighten-1">email</v-icon>
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
import VeeValidate from "vee-validate";
import "@/styles/semantic.min.css";
import SuiVue from "semantic-ui-vue";
import ko from "vee-validate/dist/locale/ko.js";
import {Auth} from "@/api";
import VueSession from "vue-session";
import Vue from "vue";

const config = {
  locale: "ko",
  dictionary: {
    ko
  }
};

Vue.use(VeeValidate, config);
Vue.use(SuiVue)
Vue.use(VueSession);


/* eslint-disable */
export default {
  mounted() {
    document.querySelector("body").addEventListener('scroll', function() {
      var el = document.querySelector('.v-toolbar--fixed.white--text.elevation-0');
      if(document.querySelector("body").scrollTop >= 63) {
        el.classList.add('cyan');
        el.classList.add('lighten-1');
        el.classList.remove('transparent')
      }
      else {
        el.classList.add('transparent')
        el.classList.remove('cyan');
        el.classList.remove('lighten-1');
      }
    });
  },
  name: "app",
  created() {
    //서버에서 활성화
    // if (location.protocol != 'https:')
    // {
    //    location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
    // };
    Auth.auth().then(res => {
      if(!res.data)
        return;
      this.$router.push({name: 'main'});
    });
  },
  methods: {
    OpenLogin() {
      this.$router.push("login")
    },
    OpenRegister() {
      this.$router.push("register")
    }
  }
};
</script>
<style>
  html{
    overflow-x:hidden;
  }
  body::-webkit-scrollbar { 
    display: none; 
  }
  body {
    -ms-overflow-style: -ms-autohiding-scrollbar;
  } 
  .signup.ui.positive.button {
    background-color: #26c6da
  }
</style>