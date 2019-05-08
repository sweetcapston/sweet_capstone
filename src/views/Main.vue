<template>
  <v-app>
    <v-container >
      <v-toolbar
        class="gradient white--text"
        app 
        flat   
      >
        <v-toolbar-title class="headline text-uppercase">
          <span >OpenClass</span>
          <span class="font-weight-light"> {{this.$store.state.userName}} </span>
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
        <img src="@/assets/logo.svg" alt="Vuetify.js" height="150">
        </v-layout>
      <v-content>
          <v-layout align-center justify-center v-if="this.$store.getters.getIdentity == 1">
            <v-flex xs6 sm6 md3 order-12>
            <v-text-field
                v-model="classCode"
                placeholder="클래스코드를 입력하세요."
                solo
                outline
                flat
              ></v-text-field>
            </v-flex>
            &nbsp;&nbsp;&nbsp;
            <v-btn bottom positive class="cyan lighten-1 white--text" large @click="enterClass(getClassCode())">입장하기</v-btn>
          </v-layout>
          <v-layout align-center justify-center v-if="this.$store.getters.getIdentity == 2" >
              <v-flex xs6 sm6 md3 order-12 lg2>
                <v-text-field
                  v-model="className"
                  placeholder="클래스이름을 입력하세요."
                  outline
                  solo
                  flat
                ></v-text-field>
              </v-flex>
              &nbsp;&nbsp;&nbsp;
              <v-btn bottom class="cyan lighten-1 white--text" large @click="createClass(getClassName())">생성하기</v-btn>
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
      switch(this.$session.get("Identity")){
        case 2: 
          break;
            this.$session.set('token', res.data.token)
            this.$store.commit("setIdentity", res.data.Identity);
      }
    })
  },
  data(){ 
    return {
      classCode: '',
      className: '',
      classList: [],
    }
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
      alert(classCode);
      Stud.classEnter(classCode)
      .then(res => {
        if(res.data == false) alert('error');
        else{
          alert(classCode);
          //클래스 입장시에 해당 클래스코드 vuex에 저장. 클래스 퇴장시 저장된 클래스코드 삭제
          this.$store.commit("setCurrentClass", {
            classCode: classCode,
            className: res.data.className,
            profName: res.data.profName
          });
          const checkApply = this.$store.state.classList.findIndex(function(item) { return item.classCode == classCode })
          this.$store.commit('setCheckApply', checkApply);
          this.$router.push({path: `/class/${this.classCode}/home`}) // 해당 클래스 페이지로 이동
        }
      })
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
    },
    logout(){
      this.$session.destroy();
      Auth.logout().then(res => {
        if(res.data == "logout"){
          this.$store.commit('removeUserName');
          this.$router.push({name: 'login'});
        }
      })
    }
  }
};
</script>
<style>
  div.layout.row.wrap{
    background:#FAFAFA
  }
  .v-text-field--box.v-text-field--single-line input, .v-text-field--full-width.v-text-field--single-line input, .v-text-field--outline.v-text-field--single-line input{
    margin-top:0px;
  }
  .v-text-field--box input, .v-text-field--full-width input, .v-text-field--outline input {
    margin-top: 0px;
  }
  .gradient {
    background: linear-gradient(100deg, #26C6DA, #9198e5)
  }  
</style>