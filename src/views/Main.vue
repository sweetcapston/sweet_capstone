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
        <v-layout justify-center v-if="this.$session.get('Identity')==1">
            <input v-model="classCode" placeholder="클래스코드를 입력하세요."/>
            <v-btn dark @click="enterClass">입장하기</v-btn>
        </v-layout>
         <v-layout justify-center v-if="this.$session.get('Identity')==2" >
            <v-flex xs12 sm6 md3 order-12>
            <v-text-field
              v-model="className"
              placeholder="클래스이름을 입력하세요."
              solo
            ></v-text-field>
           
          </v-flex>
             <v-btn bottom="" dark @click="createClass">생성하기</v-btn>
        </v-layout>
      

      <v-sheet mobile-break-point="960">
      <v-layout row wrap>
        <core-class-list  
          v-for="(Class, i) in this.classList"
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
    this.classList = JSON.parse(localStorage.getItem('access_classList'));
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
      classCode:'',
      className:'',
      classList: [],
    }
  },

  methods: {
    enterClass() {
      Stud.classEnter(this.classCode)
      .then(res => {
        if(res.data == true)
        {
          // 클래스 입장시에 해당 클래스코드 vuex에 저장. 클래스 퇴장시 저장된 클래스코드 삭제(새로고침하면 자동으로 되는듯.)
          this.$store.commit("setClassCode", this.classCode);
          this.$router.push({name: 'class', params: { classCode: this.classCode }}) // 해당 클래스 페이지로 이동
        }
        else alert('없는 클래스코드 입니다.');
      })
    },
    createClass(){
      Prof.classCreate(this.className)
      .then(res=>{
        if (res.data) alert(res.data);
        alert(this.className + " 클래스 생성이 완료 되었습니다.");
        this.classList.push({className : this.className, classCode : res.data}); // 현재 유저 네임도 받아와야함. 세션으로?
        localStorage.removeItem('access_classList');
        localStorage.setItem('access_classList', JSON.stringify(this.classList));
      });
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
