<template>
  <v-app>
    <core-drawer/>
    <v-container>
      <core-toolbar/> 
      <router-view />
    </v-container>
  </v-app>
</template>

<script>
/* eslint-disable */
import Vue from "vue";
import {Auth} from "@/api"
import store from '@/store.js'
import SocketIO from 'socket.io-client';
import VueSocketIO from 'vue-socket.io'
import {URL} from '@/plugins/api.config.js'
Vue.use(new VueSocketIO({
    debug: true,  //배포시 삭제
    connection: SocketIO(`${URL}:3000`), //options object is Optional
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_"
    }
  })
);
export default {
  created() {
    Auth.auth().then(res => {
      if(!res.data)
        this.$router.push({name: 'main'});
    }),
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

<style>
.v-content{
  padding-top:0px !important;
}
.container {
  margin-top:50px;
  max-width: 1275px;
}
</style>
