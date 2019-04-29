<template>
  <v-app>
    <span>
      <input v-model="classCode" placeholder="클래스코드">
      <v-btn dark @click="test">입장하기</v-btn>
      <v-btn dark @click="createClass">클래스 생성하기</v-btn>

      <v-btn dark @click="logout">로그아웃</v-btn>
    </span>
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
        case 3: 
          break;
      }
    });
  },
  updated() {
      this.$store.commit('setClassCode',this.classCode)
  },
  data(){
      return {classCode:''}
  },
  methods: {
    test() {
      alert(this.classCode);
      this.$router.push({name: 'class', params: { classCode: this.classCode }})
    },
    createClass(){

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
