<template>
  <v-app>
    <v-toolbar class="v-toolbar--fixed white--text elevation-0 transparent">
      <img class="logo" src="@/assets/logo_white.svg" height="50">
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
            <img :src="logo" height="200">
            <div class="subheading mb-3 text-xs-center unselectable undraggable">Powered by Sweet Team</div>
            <v-btn class="cyan lighten-1 mt-5" dark large>             
              <a href="#how-to-use" class="page-scroll white--text">How to use</a>
            </v-btn>
          </v-layout>
        </v-parallax>
      </section>


      <section id="how-to-use">
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
                      <v-icon x-large class="cyan--text text--lighten-1">mdi-comment-question-outline</v-icon>
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
                      <v-icon x-large class="cyan--text text--lighten-1">mdi-clipboard-text-outline</v-icon>
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
                      <v-icon x-large class="cyan--text text--lighten-1">mdi-quora</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">퀴즈</div>
                    </v-card-title>
                    <v-card-text>
                      설명 작성 가능합니다. 
                    </v-card-text>
                  </v-card>
                </v-flex>

                <v-flex xs12 md3>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="cyan--text text--lighten-1">mdi-chart-bar</v-icon>
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


        <v-layout>
          <v-card 
            height="500" 
            width="100%"
            flat
            class="transparent"  
          >
            <v-img src="https://github.com/sweetcapston/sweet_capstone/blob/develop/src/assets/monitor.jpg" height="430" width="70%">
              <img id="gif" src="@/assets/test.gif" height="400" width="600"/>
            </v-img>
            
<!--
            <div class="headline text-xs-center pa-5">
              Active: {{ bottomNav }}
            </div>
            <img src="@/assets/test.gif" height="400"/>
            <v-bottom-nav
              :active.sync="bottomNav"
              :value="true"
              absolute
              color="transparent"
              height="70"
            >
              <v-btn
                color="teal" 
                flat
                value="home"
              >
                <span>홈</span>
                <v-icon>mdi-home</v-icon>
              </v-btn>

              <v-btn
                color="teal" 
                flat
                value="question"
              >
                <span>질문</span>
                <v-icon>mdi-comment-question-outline</v-icon>
              </v-btn>

              <v-btn
                color="teal" 
                flat
                value="survey"
              >
                <span>설문</span>
                <v-icon>mdi-clipboard-text-outline</v-icon>
              </v-btn>

              <v-btn
                color="teal" 
                flat
                value="quiz"
              >
                <span>퀴즈</span>
                <v-icon>mdi-quora</v-icon>
              </v-btn>

              <v-btn
                color="teal" 
                flat
                value="chart"
              >
                <span>통계</span>
                <v-icon>mdi-chart-bar</v-icon>
              </v-btn>
            </v-bottom-nav>
-->
          </v-card>
        </v-layout>
      </section>


      <section>
        <v-parallax
          height="600" 
          src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg">
          <v-layout column align-center justify-center>
            <div class="headline white--text mb-3 text-xs-center">For a better lecture</div>
            <em>Sweet Team</em>
            <v-btn
              class="cyan lighten-1 mt-5"
              dark
              large
              href="https://github.com/sweetcapston"
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
                  <div class="headline">Our Team Info</div>
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
                  <div class="headline">Contact Us</div>
                </v-card-title>
                <v-card-text>
                  Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                </v-card-text>
                <v-list class="transparent">
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="cyan--text text--lighten-1">place</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>Seoul, Republic of Korea</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="cyan--text text--lighten-1">home</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>[github](https://github.com/sweetcapston)</v-list-tile-title>
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
  data() {
    return {
      bottomNav: 'home'
    }
  },
  mounted() {
    document.querySelector("body").addEventListener('scroll', function() {
      var el = document.querySelector('.v-toolbar--fixed.white--text.elevation-0');
      if(document.querySelector("body").scrollTop >= 63) {
        el.classList.add('cyan');
        el.classList.add('lighten-1');
        el.classList.remove('transparent');

      }
      else {
        el.classList.add('transparent');
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
    },
  },
  computed: {
    logo() {
      return require("@/assets/logo_white_animation.svg")
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
    background-color: #26c6da;
  }
  .logo {
    margin-top: 10px;
  }
  #gif {
    z-index: 10;
  }
</style>