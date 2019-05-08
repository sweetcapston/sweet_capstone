<template>
  <v-app>
    <h1> 질문 페이지 </h1>
    <h1>클래스 코드 : {{this.$store.state.currentClass.classCode}}</h1>
    <sui-button @click="test">Test</sui-button>
  </v-app>
</template>
<script>
/* eslint-disable */
export default {
  sockets:{
    MESSAGE: function(data){
      console.log("data")
    }
  },
  methods:{
    test(e){
      e.preventDefault();
      this.$socket.emit('chat', {
        classCode:this.$store.state.currentClass.classCode,
        userID:this.$store.state.userID,
        userName:this.$store.state.userName,
        question:"messsssssage",
        anonymous:false
      })
    },
  }
}
</script>
