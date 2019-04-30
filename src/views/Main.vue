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
            <input v-model="classCode" placeholder="클래스코드를 입력하세요.">
            <v-btn dark @click="enterClass">입장하기</v-btn>
        </v-layout>
         <v-layout v-if="this.$session.get('Identity')==2">
            <input v-model="className" placeholder="클래스이름을 입력하세요.">
            <v-btn dark @click="createClass">생성하기</v-btn>
        </v-layout>
      </v-container>
      <v-sheet
        class="d-flex"
      >
        <core-class-list/>
        <core-class-list/>
        <core-class-list/>
        <core-class-list/>
        <core-class-list/>
        <core-class-list/>
        <core-class-list/>
        <core-class-list/>
      </v-sheet>
    </v-content>
  </v-app>
</template>

<script>
/* eslint-disable */
import Auth from "../api/Auth.js"

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
    this.$store.commit('setClassCode',this.classCode) // 클래스 코드 입력받기 
  },
  data(){
    return {
      classCode:'',
      className:'',
    }
  },
  methods: {
    enterClass() {
      alert(this.classCode);
      this.$router.push({name: 'class', params: { classCode: this.classCode }})
    },
    createClass(){
      alert(this.className + " 클래스 생성이 완료 되었습니다.");
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
