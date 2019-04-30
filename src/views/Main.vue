<template>
  <v-app dark>
    <v-container>
      <v-layout>
          <input v-model="classCode" placeholder="클래스코드를 입력하세요." >
          <v-btn dark @click="enterClass">입장하기</v-btn>
          <modal-create-class-form/>
          <v-btn dark @click="logout">로그아웃</v-btn>
      </v-layout>
    </v-container>
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
      return {classCode:''}
  },
  methods: {
    enterClass() {
      alert(this.classCode);
      this.$router.push({name: 'class', params: { classCode: this.classCode }})
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
