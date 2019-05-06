<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>OpenClass</span>
        <span class="font-weight-light"> {{this.$store.state.userName}} </span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        @click="logout"
      >
        <span class="mr-2">logout</span>
      </v-btn>
    </v-toolbar>

    <v-content>
        <v-layout justify-center v-if="this.$store.getters.getIdentity == 1">
          <v-flex xs12 sm6 md3 order-12>
          <v-text-field
              v-model="classCode"
              placeholder="클래스코드를 입력하세요."
              solo
            ></v-text-field>
          </v-flex>
            <v-btn bottom dark @click="enterClass(getClassCode())">입장하기</v-btn>
        </v-layout>
         <v-layout justify-center v-if="this.$store.getters.getIdentity == 2" >
            <v-flex xs12 sm6 md3 order-12>
            <v-text-field
              v-model="className"
              placeholder="클래스이름을 입력하세요."
              solo
            ></v-text-field>
            </v-flex>
             <v-btn bottom dark @click="createClass(getClassName())">생성하기</v-btn>
        </v-layout>
      

      <v-sheet mobile-break-point="960">
      <v-layout row wrap>
        <core-class-list  
          v-for="(Class, i) in this.$store.state.classList"
          :classes='Class'
          :key="i"
          avatar
        />
      </v-layout>
      </v-sheet>
    </v-content>
  </v-app>
</template>

<script>
/* eslint-disable */
import Auth from "../api/Auth.js"
import Class from "../api/Class.js"
import Prof from "../api/Prof.js"
import Stud from "../api/Stud.js"

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
          const idx = this.$store.state.classList.findIndex(function(item) { return item.classCode == classCode })
          this.$store.commit('setAlready', idx);
          this.$router.push({path: `/class/${this.classCode}/home`}) // 해당 클래스 페이지로 이동
        }
      })
    },
    createClass(className){
      Prof.classCreate(className)
      .then(res => {
        if (res.data == false) alert('error');
        else{
          // currentClass객체로 하면 오류남.
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

</style>
