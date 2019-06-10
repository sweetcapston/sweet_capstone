<template>

  <v-app>  
    <v-toolbar class="v-toolbar--fixed white--text elevation-0 transparent">
      <img class="hidden-md-and-up" src="@/assets/logo_white.svg" height="25">
      <img class="hidden-md-and-down" src="@/assets/logo_white.svg" height="50">
      <v-spacer />
      <sui-button class="transparent" positive @click="OpenLogin">로그인</sui-button>
      <sui-button class="cyan lighten-1" positive @click.native="OpenRegister" id="signbtn">회원가입</sui-button>
    </v-toolbar>

    <router-view/>

    <v-content>
      <section id="main">
        <v-parallax 
          height="700"
          src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
        >
          <v-layout
            column
            align-center
            justify-center
            class="white--text logoImage"
          >      
            <img :src="logo" width="70%">
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
            </div>
          </v-flex>

          <v-flex xs12 class="how-to-use-big">
            <v-container grid-list-xl>
              <v-btn-toggle v-model="toggle_one" mandatory>
                <v-layout column wrap align-center>
                  <v-flex>
                    <v-btn flat>
                      <v-card class="elevation-0 transparent">
                        <v-card-text class="text-xs-center">
                          <v-icon x-large class="cyan--text text--lighten-1">mdi-google-classroom</v-icon>
                        </v-card-text>
                        <v-card-title primary-title class="layout justify-center">
                          <div class="headline">클래스 생성</div>
                        </v-card-title>
                      </v-card>
                    </v-btn>

                    <v-btn flat>   
                      <v-card class="elevation-0 transparent">
                        <v-card-text class="text-xs-center">
                          <v-icon x-large class="cyan--text text--lighten-1">mdi-application-import</v-icon>
                        </v-card-text>
                        <v-card-title primary-title class="layout justify-center">
                          <div class="headline">클래스 입장</div>
                        </v-card-title>
                      </v-card>                      
                    </v-btn>

                    <v-btn flat>                      
                      <v-card class="elevation-0 transparent">
                        <v-card-text class="text-xs-center">
                          <v-icon x-large class="cyan--text text--lighten-1">mdi-comment-question-outline</v-icon>
                        </v-card-text>
                        <v-card-title primary-title class="layout justify-center">
                          <div class="headline">질문</div>
                        </v-card-title>
                      </v-card>                      
                    </v-btn>
                  </v-flex>

                  <v-flex>
                    <v-btn flat>                      
                      <v-card class="elevation-0 transparent">
                        <v-card-text class="text-xs-center">
                          <v-icon x-large class="cyan--text text--lighten-1">mdi-clipboard-text-outline</v-icon>
                        </v-card-text>
                        <v-card-title primary-title class="layout justify-center">
                          <div class="headline">설문</div>
                        </v-card-title>
                      </v-card>                      
                    </v-btn>

                    <v-btn flat>                      
                      <v-card class="elevation-0 transparent">
                        <v-card-text class="text-xs-center">
                          <v-icon x-large class="cyan--text text--lighten-1">mdi-quora</v-icon>
                        </v-card-text>
                        <v-card-title primary-title class="layout justify-center">
                          <div class="headline">퀴즈</div>
                        </v-card-title>
                      </v-card>                      
                    </v-btn>

                    <v-btn flat>                    
                      <v-card class="elevation-0 transparent">
                        <v-card-text class="text-xs-center">
                          <v-icon x-large class="cyan--text text--lighten-1">mdi-chart-bar</v-icon>
                        </v-card-text>
                        <v-card-title primary-title class="layout justify-center">
                          <div class="headline">통계</div>
                        </v-card-title>
                      </v-card> 
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-btn-toggle>
            </v-container>
          </v-flex>



          <v-flex xs12 class="how-to-use-small">
            <v-container grid-list-xl>
              <v-btn-toggle v-model="toggle_one" mandatory>
                <v-layout column wrap align-center>
                  <v-flex>
                    <v-btn flat>
                      <v-card class="elevation-0 transparent">
                        <v-card-text class="text-xs-center">
                          <v-icon x-large class="cyan--text text--lighten-1">mdi-google-classroom</v-icon>
                        </v-card-text>
                        <v-card-title primary-title class="layout justify-center">
                          <div class="p2">클래스 생성</div>
                        </v-card-title>
                      </v-card>
                    </v-btn>

                    <v-btn flat>   
                      <v-card class="elevation-0 transparent">
                        <v-card-text class="text-xs-center">
                          <v-icon x-large class="cyan--text text--lighten-1">mdi-application-import</v-icon>
                        </v-card-text>
                        <v-card-title primary-title class="layout justify-center">
                          <div class="p2">클래스 입장</div>
                        </v-card-title>
                      </v-card>                      
                    </v-btn>

                    <v-btn flat>                      
                      <v-card class="elevation-0 transparent">
                        <v-card-text class="text-xs-center">
                          <v-icon x-large class="cyan--text text--lighten-1">mdi-comment-question-outline</v-icon>
                        </v-card-text>
                        <v-card-title primary-title class="layout justify-center">
                          <div class="p2">질문</div>
                        </v-card-title>
                      </v-card>                      
                    </v-btn>
                  </v-flex>

                  <v-flex>
                    <v-btn flat>                      
                      <v-card class="elevation-0 transparent">
                        <v-card-text class="text-xs-center">
                          <v-icon x-large class="cyan--text text--lighten-1">mdi-clipboard-text-outline</v-icon>
                        </v-card-text>
                        <v-card-title primary-title class="layout justify-center">
                          <div class="p2">설문</div>
                        </v-card-title>
                      </v-card>                      
                    </v-btn>

                    <v-btn flat>                      
                      <v-card class="elevation-0 transparent">
                        <v-card-text class="text-xs-center">
                          <v-icon x-large class="cyan--text text--lighten-1">mdi-quora</v-icon>
                        </v-card-text>
                        <v-card-title primary-title class="layout justify-center">
                          <div class="p2">퀴즈</div>
                        </v-card-title>
                      </v-card>                      
                    </v-btn>

                    <v-btn flat>                    
                      <v-card class="elevation-0 transparent">
                        <v-card-text class="text-xs-center">
                          <v-icon x-large class="cyan--text text--lighten-1">mdi-chart-bar</v-icon>
                        </v-card-text>
                        <v-card-title primary-title class="layout justify-center">
                          <div class="p2">통계</div>
                        </v-card-title>
                      </v-card> 
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-btn-toggle>
            </v-container>
          </v-flex>
          
        </v-layout>

        <v-layout class="gif">
          <v-card 
            height="600" 
            width="100%"
            flat
            class="transparent"  
          >
            <div class="back">
              <img id="gif" src="@/assets/test.gif" />
            </div>
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


      <section id="contact team">
        <v-container grid-list-xl>
          <v-layout row wrap justify-center class="my-5">           
            <v-flex xs12 sm4 offset-sm1>
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
                      <v-list-tile-title><a href="https://github.com/sweetcapston">Github</a></v-list-tile-title>
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
      /* bottomNav: 'home' */
      toggle_one: 0,
      items: [
        { title: '질문', icon: 'mdi-comment-question-outline'},
        { title: '설문', icon: 'mdi-clipboard-text-outline'},
        { title: '퀴즈', icon: 'mdi-quora'},
        { title: '통계', icon: 'mdi-chart-bar'}
      ],
      admins: [
        ['Management', 'people_outline'],
        ['Settings', 'settings']
      ],
      cruds: [
        ['Create', 'add'],
        ['Read', 'insert_drive_file'],
        ['Update', 'update'],
        ['Delete', 'delete']
      ]
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
    overflow-x: hidden;
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
    margin-top: 27px;
    margin-bottom: 50px;
    z-index: 10;
    height: 400px; 
    width: 46%;
  }
  .back{
    text-align: center;
    background-image: url("../assets/monitor.png");
    background-position: center center;
    background-size: 60% 100%;
  }
  .theme--light.v-btn-toggle {
    background: #fafafa;
  }
  .how-to-use-big .v-btn {
    width: 200px;
    background-color: #fafafa;
  }
  .how-to-use-small .v-btn {
    width: 100px;
    background-color: #fafafa;
  }
  .v-btn-toggle--selected {
    box-shadow: none;
  }
  @media only screen and (max-width: 600px) {
  .gif {
    display: none !important;
    }
  }
  @media only screen and (min-width: 600px) {
  .how-to-use-small {
    display: none !important;
    }
  }
  @media only screen and (max-width: 600px) {
  .how-to-use-big {
    display: none !important;
    }
  }
  @media (min-width: 600px) {
  .flex.offset-sm1 {
    margin: 8.333333333333332%; 
    }
  }
</style>