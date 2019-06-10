<template>
  <v-app >
    <core-drawer/>
    <core-toolbar/>
    <v-container >
      <router-view/>
    </v-container>
    <modal-edit-user/>
  </v-app>
</template>

<script>
/* eslint-disable */
import { Auth } from "@/api";
export default {
  beforeCreate() {
  },
  created() {
    Auth.auth().then(res => {
      if (!res.data) this.$router.push({ name: "login" });
    });
    if(this.$store.state.Identity==2){
      let count = 0
      this.$store.state.classList.forEach(element => {
        if(element.classCode == this.$store.state.currentClass.classCode) count++;
      });
      if(count==0){
        this.$router.push({ name: "main" });
      }
    }
  },
  mounted() {
    if (Notification && Notification.permission != "granted") {
      Notification.requestPermission(function(status) {
        if (Notification.permission !== status) {
          Notification.permission = status;
        }
      });
    }
  }
};
</script>

<style>
.v-content {
  padding-top: 0px !important;
}
.container {
  max-width: inherit;
  height: inherit;
  margin-top: 35px;
  padding-bottom: 0px;
}
</style>
