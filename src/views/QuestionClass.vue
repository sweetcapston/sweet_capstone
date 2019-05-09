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
      if (Notification && Notification.permission === "granted" && data) 
      {
        const options = {
          body: `${data._question}`,
          icon: '@/assets/logo.png',
          badge: '@/assets/logo.png',
          image: '@/assets/logo.png',
          tag: 'example-notification'
        };
        var notify = new Notification("오픈클래스", options);
        console.log("data")
        // notify.onshow = function () { 
        //   setTimeout(notify.close(), 5); 
        // }
      }
    }
  },
  methods:{
    test(e){
      e.preventDefault();
      this.$socket.emit('chat', {
        classCode:this.$store.state.currentClass.classCode,
        userID:this.$store.state.userID,
        userName:this.$store.state.userName,
        _question:"messsssssage",
        anonymous:false
      })
    },
  }
}
</script>
