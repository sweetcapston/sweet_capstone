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
import {Auth} from "@/api"
export default {
  created() {
    Auth.auth().then(res => {
      if(!res.data)
        this.$router.push({name: 'login'});
    })
  },
  mounted() {
    if (Notification && Notification.permission != "granted") {
      Notification.requestPermission(function (status) {
        if (Notification.permission !== status) {
          Notification.permission = status;
        }
      });
    }
  }
}

</script>

<style>
.v-content{
  padding-top:0px !important;
}
.container {
  max-width: inherit;
  height: -webkit-fill-available;
  margin-top:50px;
}
</style>
