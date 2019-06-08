<template>
  <v-app>
    <v-container>
      <v-toolbar
        class="gradient white--text"
        app 
        flat   
      >
        <v-toolbar-title class="headline text-uppercase">
          <img class="logo" src="@/assets/logo_white.png" height="40">
          <span class="hidden-md-and-down username"> {{this.$store.state.userName}} </span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          flat
          @click="logout"
        >
          <span class="mr-2 white--text" >logout</span>
        </v-btn>
      </v-toolbar>     
      <br>
      <br>
      <v-layout justify-center>
        <img :src="logo" height="150">
      </v-layout>
      <br/>
      <v-content>
        <v-layout align-center justify-center v-if="this.$store.getters.getIdentity == 1">
          <v-flex xs6 sm6 md3 order-12>
          <v-text-field
            v-model="classCode"
            class="classCodeInput"
            placeholder="클래스코드를 입력하세요."
            solo
            outline
            flat
            v-on:keyup.enter='enterClass(getClassCode())'
          ></v-text-field>
          </v-flex>
          &nbsp;&nbsp;&nbsp;
          <v-btn bottom positive class="cyan light-1 white--text enter" large @click="enterClass(getClassCode())">입장하기</v-btn>
        </v-layout>
        <v-layout align-center justify-center v-if="this.$store.getters.getIdentity == 2" >
          <v-flex xs6 sm6 md3 order-12>
            <v-text-field
              v-model="className"
              class="classNameInput"
              placeholder="클래스이름을 입력하세요."
              outline
              solo
              flat
              v-on:keyup.enter='createClass(getClassName())'
            ></v-text-field>
          </v-flex>
          &nbsp;&nbsp;&nbsp;
          <v-btn bottom class="cyan light-1 white--text create" large @click="createClass(getClassName())">생성하기</v-btn>
        </v-layout>

        <v-sheet mobile-break-point="960">
          <v-layout row wrap width="800" justify-center>          
            <core-class-list  
              v-for="(Class, i) in this.$store.state.classList"
              :currentClass='Class'
              :key="i"
              avatar
            />
          </v-layout>
        </v-sheet>
      </v-content>
    </v-container>

    <v-tour v-if="this.$store.state.Identity==1 &&  this.$store.state.classList.length != 0" name="classCreate" :steps="guideStuCard"></v-tour>
    <v-tour v-else-if="this.$store.state.Identity==1 &&  this.$store.state.classList.length == 0" name="classCreate" :steps="guideStu"></v-tour>
    <v-tour v-else-if="this.$store.state.Identity==2 && this.$store.state.classList.length != 0 " name="classCreate" :steps="guideProfCard"></v-tour>
    <v-tour v-else-if="this.$store.state.Identity==2 && this.$store.state.classList.length == 0 " name="classCreate" :steps="guideProf"></v-tour>
  </v-app>
</template>

<script>
/* eslint-disable */
import {Auth, Class, Prof, Stud} from "@/api"
export default {
  created() {
    Auth.auth().then(res => {
      if(!res.data){
        this.$router.push({name: 'login'})
      }
    });
    this.$store.commit("setDrawer", true);
  },
  name: 'classCreate',
  data(){ 
    return {
      guideProf :[
        {
          target: '.classNameInput .v-input__control .v-input__slot',
          content: `생성 할 클래스의 이름을 입력하세요.`,
          params: {
            placement: 'bottom',
            enableScrolling: false
          }
        },{
          target: '.create',
          content: `버튼을 눌러 클래스를 생성 할 수 있습니다.`,
          params: {
            placement: 'bottom',
            enableScrolling: false
          }
        }
      ],
      guideProfCard :[
        {
          target: '.classNameInput .v-input__control .v-input__slot',
          content: `생성 할 클래스의 이름을 입력하세요.`,
          params: {
            placement: 'bottom',
            enableScrolling: false
          }
        },{
          target: '.create',
          content: `버튼을 눌러 클래스를 생성 할 수 있습니다.`,
          params: {
            placement: 'bottom',
            enableScrolling: false
          }
        },
        {
          target: '.classCard',
          content: `클래스카드를 눌러 바로 입장 할 수 있습니다.`,
          params: {
            placement: 'top',
            enableScrolling: false
          }
        }
      ],
      guideStu :[
        {
          target: '.classCodeInput .v-input__control .v-input__slot',
          content: `입장 할 클래스의 코드 6자리를 입력하세요.`,
          params: {
            placement: 'bottom',
            enableScrolling: false
          }
        },{
          target: '.enter',
          content: `버튼을 눌러 클래스에 입장 할 수 있습니다.`,
          params: {
            placement: 'bottom',
            enableScrolling: false
          }
        },
      ],
      guideStuCard :[
        {
          target: '.classCodeInput .v-input__control .v-input__slot',
          content: `입장 할 클래스의 코드 6자리를 입력하세요.`,
          params: {
            placement: 'bottom',
            enableScrolling: false
          }
        },{
          target: '.enter',
          content: `버튼을 눌러 클래스에 입장 할 수 있습니다.`,
          params: {
            placement: 'bottom',
            enableScrolling: false
          }
        },
        {
          target: '.classCard',
          content: `클래스카드를 눌러 바로 입장 할 수 있습니다.`,
          params: {
            placement: 'top',
            enableScrolling: false
          }
        }
      ],
      classCode: '',
      className: '',
      classList: [],
    }
  },
  mounted() {
    this.$tours['classCreate'].start();
  },
  methods: {
    // v-model의 코드와 이름을 얻기 위한 임시 비동기 처리
    getClassCode(){
      return this.classCode;
    },
    getClassName(){
      return this.className;
    },
    enterClass(classCode) {
      Stud.classEnter(classCode)
      .then(res => {
        if(res.data == false) alert('없는 클래스 입니다.');
        else{
          //클래스 입장시에 해당 클래스코드 vuex에 저장. 클래스 퇴장시 저장된 클래스코드 삭제
          this.$store.commit("setCurrentClass", {
            classCode: classCode,
            className: res.data.className,
            profName: res.data.profName
          });
          const checkApply = this.$store.state.classList.findIndex(function(item) { return item.classCode == classCode })
          this.$store.commit('setCheckApply', checkApply);
          this.$router.push({path: `/class/${classCode}/home`}) // 해당 클래스 페이지로 이동
        }
      })
      this.classCode = "";
    },
    createClass(className){
      Prof.classCreate(className)
      .then(res => {
        if (res.data == undefined ) alert('error');
        else{
          // currentClass객체로 하면 오류남.
          if(res.data.errors) return false;
          this.$store.commit("addClassList", {
            className: className,
            classCode: res.data.classCode,
            profName: this.$store.state.userName
          });
        }
      });
      this.className = "";
    },
    logout(){
      this.$session.destroy();
      Auth.logout().then(res => {
        if(res.data == "logout"){
          this.$store.commit('removeLoginData');
          this.$router.push({name: 'login'});
        }
      })
    }
  },
  computed: {
    logo() {
      return require("@/assets/logo_black_animation.svg")
    }
  }
};
</script>

<style>
  div.layout.row.wrap{
    background:#FAFAFA
  }
  .v-text-field--box.v-text-field--single-line input, .v-text-field--full-width.v-text-field--single-line input, .v-text-field--outline.v-text-field--single-line input{
    margin-top: 0px;
  }
  .v-text-field--box input, .v-text-field--full-width input, .v-text-field--outline input {
    margin-top: 0px;
  }
  .gradient {
    background: linear-gradient(100deg, #9198e5, #26C6DA)
  }
  .logo {
    margin-top: 5px;
  }  
  .username{
    margin-left: 9px;
    margin-top: 11px;
    position: absolute;
  } 
  @font-face { 
    font-family: userFont; 
    src: url(../styles/themes/default/assets/fonts/humanletter.ttf) 
    format('truetype'); 
  }
</style>
