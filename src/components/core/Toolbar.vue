<template>
  <v-toolbar
    class="gradient white--text"
    app 
    flat   
  >
    <v-toolbar-title class="headline text-uppercase">
      <span >OpenClass</span>
      <span class="font-weight-light"> {{this.$store.state.userName}} </span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn
      flat
      @click="logout"
    >
      <span class="mr-2 white--text" >logout</span>
    </v-btn>
  </v-toolbar>
</template>

<script>
  // Utilities
  import {
    mapMutations
  } from 'vuex'

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
      ...mapMutations(['toggleDrawer'])
    }
  }
</script>

<style>
.gradient {
    background: linear-gradient(100deg, #9198e5, #26C6DA)
} 
</style>
