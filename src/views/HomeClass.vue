<template>
  <v-app>
    <h1>클래스 코드 : {{this.$store.state.classCode}}</h1>
    <span>
      <v-btn dark @click="addClass()" >수하기</v-btn>
    </span>
  </v-app>
</template>

<script>
import Stud from "../api/Stud";

export default {
  data(){
    return{
      classList: [],
      // 클래스 정보 필요
    }
  },
  methods: {
    addClass() {
      Stud.classAdd(this.$store.state.classCode).then(res=>{
        if(res.data === 'false') alert('error');
        else{
          // 로컬 스토리지에 클래스 리스트 추가
          this.classList = JSON.parse(localStorage.getItem('access_classList'));
          this.classList.push({classCode : this.$store.state.classCode});
          localStorage.removeItem('access_classList');
          localStorage.setItem('access_classList', JSON.stringify(this.classList));
          alert('성공');
        } 
      })
    },
    //...
  }
};
</script>