<template>
  <v-app>
    <core-drawer/>
    <v-layout>
      <core-toolbar/> 
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-layout>
  </v-app>
</template>
<script>
/* eslint-disable */
import Vue from "vue";
import store from '@/store.js'
import SocketIO from 'socket.io-client';
import VueSocketIO from 'vue-socket.io'
import {URL} from '@/plugins/api.config.js'
Vue.use(new VueSocketIO({
    debug: true,  //배포시 삭제
    connection: SocketIO(`http://${URL}:3000`), //options object is Optional
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
    if (Notification && Notification.permission != "granted") {
      Notification.requestPermission(function (status) {
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
