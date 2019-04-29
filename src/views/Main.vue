<template>
  <v-app>
    <v-content>
      <input v-model="classCode" placeholder="클래스코드" >
      <v-btn dark @click="test">입장하기</v-btn>
<<<<<<< HEAD
      <v-btn dark @click="createClass">클래스 생성하기</v-btn>

      <v-btn dark @click="logout">로그아웃</v-btn>
    </span>
=======
      <modal-create-class-form/>
    </v-content>
>>>>>>> 37c63d56766f5aa9118a912d237fbfd084872613
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
      this.$store.commit('setClassCode',this.classCode) // 클래스 코드 입력받기 
  },
  data(){
      return {classCode:''}
  },
  methods: {
    test() {
      alert(this.classCode);
      this.$router.push({name: 'class', params: { classCode: this.classCode }})
<<<<<<< HEAD
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
=======
>>>>>>> 37c63d56766f5aa9118a912d237fbfd084872613
    }
  }
};
</script>
