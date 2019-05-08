<template>
  <v-app>
    <core-toolbar/> 
    <v-content>
      <v-container fluid grid-list-md fill-height>
        <v-layout row wrap> 
          <core-drawer/>
          <router-view/>
        </v-layout>
      </v-container>
    </v-content>
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
  sockets: {
    connect: function () {
      console.log('socket connected')
    }
  },
  methods: {
    
  }
}

</script>
<style lang="scss">
  @import "@/styles/index.scss";
</style>