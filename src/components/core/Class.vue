<template>
  <v-app>
    <core-drawer/>
    <v-layout>
      <core-toolbar/> 
      <router-view />
    </v-layout>
  </v-app>
</template>
<script>
/* eslint-disable */
import Vue from "vue";
import store from '@/store.js'
import SocketIO from 'socket.io-client';
import VueSocketIO from 'vue-socket.io'
Vue.use(new VueSocketIO({
    debug: true,
    connection: SocketIO('http://localhost:3000'), //options object is Optional
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_"
    }
  })
);
export default {
  created() {
    this.$socket.emit('channelJoin', {
      classCode: this.$store.state.currentClass.classCode,
      userID: this.$store.state.userID
    })
    if (!(Notification && Notification.permission === "granted")) {
      Notification.requestPermission(function (status) {
        // This allows to use Notification.permission with Chrome/Safari
        if (Notification.permission !== status) {
          Notification.permission = status;
        }
      });
    }
  },
  sockets: {
    connect: function () {
      console.log('socket connected')
    },
    joinSuccess: function(data){
      console.log(data);
    }
  },
  methods: {
  }
}

</script>
