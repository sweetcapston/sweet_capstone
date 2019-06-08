<template>
  <v-toolbar
    class="gradient white--text"
    height="50px"
    app 
    flat   
  >
  <v-toolbar-side-icon
      class="hidden-md-and-up"
      @click="toggleDrawer"
  />
    <v-toolbar-title class="headline text-uppercase">
      <img class="logo" src="@/assets/logo_white.png" height="40">
      <span  class="hidden-md-and-down username font-weight"> {{this.$store.state.userName}} </span>
    </v-toolbar-title>
    <v-spacer/>

    <v-toolbar-items>
      <v-flex
        align-center
        layout
        py-2
        
      >
        <v-icon class="hidden-md-and-down" color="tertiary" margin="2px">mdi-bell</v-icon>
        <v-icon class="hidden-md-and-down" color="tertiary" margin="2px">mdi-account-circle</v-icon>
        <v-icon class="hidden-md-and-down" color="tertiary" margin="2px">mdi-cogs</v-icon>
      </v-flex>
    </v-toolbar-items>


    <v-btn
      flat
      @click="logout"
    >
      <span class="mr-2 white--text" >logout</span>
    </v-btn>
    
  </v-toolbar>
</template>

<script>
/*eslint-disable */
  // Utilities
  import {
    mapMutations
  } from 'vuex'
  import {
    Auth
  } from "@/api"

  export default {
    data: () => ({
      title: null
    }),

    watch: {
      '$route' (val) {
        this.title = val.name
      }
    },

    methods: {
      ...mapMutations(['toggleDrawer']),
      logout(){
        this.$session.destroy();
        Auth.logout().then(res => {
          if(res.data == "logout"){
            this.$store.commit('removeLoginData');
            this.$router.push({name: 'login'});
          }
        })
        var img = new Image();
        img.src = "@/assets/logo_white_animation.svg";
      }
    },
    computed: {
      result: function() {
        return require("@/assets/logo_white_animation.svg") 
      }
    }
  }
</script>

<style>
.gradient {
  background: linear-gradient(100deg, #9198e5, #26C6DA)
}
.logo {
  padding-top: 10px;
} 
.username{
  margin-left: 9px;
  margin-top: 11px;
  position: absolute;
  font-family:userFont
}

</style>
