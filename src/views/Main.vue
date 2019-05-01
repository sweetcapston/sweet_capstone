<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>OpenClass</span>
        <span class="font-weight-light"> username </span>
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
      <v-container>
        <v-layout v-if="this.$session.get('Identity')==1">
            <input v-model="classcode" placeholder="클래스코드를 입력하세요.">
            <v-btn dark @click="enterClass">입장하기</v-btn>
        </v-layout>
         <v-layout v-if="this.$session.get('Identity')==2">
            <input v-model="className" placeholder="클래스이름을 입력하세요.">
            <v-btn dark @click="createClass">생성하기</v-btn>
        </v-layout>
      </v-container>
      
      <v-sheet class="d-flex" mobile-break-point="960">
      <v-layout row wrap>
        <core-class-list 
          v-for="(prof, i) in profs"
          :profs='prof'
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
import axios from "axios";
const BaseUrl = "http://localhost:5000";

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
            switch(res.data.Identity){
              case 1: //학생
                this.$router.push({name: 'main'}); // 로그인 성공후 메인페이지로 이동
        case 3: 
          break;
      }
    }
  })
  },
   updated() {
     // 서버에서 클래스 목록 받아와서 띄워 주기.
     axios.get(`${BaseUrl}/class`)
     .then(res => {
       this.classes = res.data;
     })
     .catch(e => {
       this.errors.push(e);
     })
   },
  data(){ 
    return {
      classcode:'',
      classname:'',
      classes: [], 
      profs: // 클래스 정보 로컬 테스트(서버 연동후 삭제)
       [
          {
            classname: 'SW 캡스톤디자인',
            profname: '윤대균',
            classtime: '월F목F',
            classcode: 'tes2'
          },
          {
            classname: '컴파일러',
            profname: '류기열',
            classtime: '월A수A',
            classcode: 'a3d'
          },
          {
            classname: '시스템 프로그래밍',
            profname: '고정길',
            classtime: '월F목F',
            classcode: 'k3d'
          }
       ]
    }
  },
  methods: {
    enterClass() {
      alert(this.classcode);
      axios.get(`${BaseUrl}/class`, {
      })
      .then(res=>{
        
      });
      // 클래스 입장시에 해당 클래스코드 vuex에 저장. 클래스 퇴장시 저장된 클래스코드 삭제.
      this.$store.commit("setClassCode", this.classcode);
      this.$router.push({name: 'class', params: { classCode: this.classcode }}) // 해당 클래스 페이지로 이동
    },
    createClass(){
      axios.post(`${BaseUrl}/prof/classcreate`, {
        classname : this.classname // 클래스이름 서버로 전송
      })
      .then(res=>{
        if (res.data) alert(res.data);
        alert(this.className + " 클래스 생성이 완료 되었습니다.");
      });
      // 클래스 추가 로컬 테스트(서버 연동후 삭제)
      this.profs.push({classname : this.className});
    },
    logout(){
      this.$session.destroy();
      Auth.logout().then(res => {
        if(res.data == "logout"){
          this.$router.push({name: 'login'})
        }
      })
    }
  }
};
</script>

<style>

</style>
