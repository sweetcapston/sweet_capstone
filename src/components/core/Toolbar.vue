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
      <img class="logo" src="@/assets/logo_white.png" height="40" @click="moveToMain">
      <span  class="hidden-md-and-down username font-weight"> {{this.$store.state.userName}} </span>
    </v-toolbar-title>
    <v-spacer/>
      
    <v-toolbar-items>
      <v-flex
        align-center
        layout
        py-2        
      >
        <v-icon v-if="alarm && this.$store.state.Identity==2" class="hidden-md-and-down" color="tertiary" margin="2px" @click="alarmActive">mdi-bell</v-icon>
        <v-icon v-if="!alarm && this.$store.state.Identity==2" class="hidden-md-and-down" color="tertiary" margin="2px" @click="alarmActive">mdi-bell-off</v-icon>
        <modal-profile/>
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
  import { Prof } from "@/api";
/*eslint-disable */
  // Utilities
  import {
    mapMutations
  } from 'vuex'
  import {
    Auth
  } from "@/api"

  export default {
    created(){
      Prof.getClassData(this.$store.state.currentClass.classCode).then(res => {
        this.$store.commit("setAlarmActive",res.data.alarm)
        this.alarm = res.data.alarm;
      })
    },
    data: () => ({
      title: null,
      alarm:true
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
      },
      alarmActive() {
        Prof.alarmActive(this.$store.state.currentClass.classCode,this.alarm)
        .then(res => {
          this.$store.commit("setAlarmActive", res.data);
          this.alarm = res.data
        });
      },
      profile(){
        alert("edit")
        this.$EventBus.$emit("profile")
      },
      moveToMain(){
        this.$router.push({name: 'main'}) ;
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
.username {
  margin-left: 9px;
  margin-top: 11px;
  position: absolute;
  font-family: userFont
}
.mdi-bell {
  margin: 5px;
}
.mdi-bell-off {
  margin: 5px;
}
.mdi-account-circle {
  margin: 5px;
}
.mdi-cogs {
  margin: 5px;
}
.mdi-bell:hover{
  transform: scale(1.2)
}
.mdi-bell-off:hover{
  transform: scale(1.2)
}
.mdi-account-circle:hover{
  transform: scale(1.2)
}
.flex.align-center.layout.py-2{
  margin-right:25px;
}
</style>
