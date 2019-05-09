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
      <span >OpenClass</span>
      <span class="font-weight-light"> {{this.$store.state.userName}} </span>
    </v-toolbar-title>
    <v-spacer/>

    <v-toolbar-items>
      <v-flex
        align-center
        layout
        py-2
      >
        <v-icon color="tertiary">mdi-bell</v-icon>
        <v-icon color="tertiary">mdi-account-circle</v-icon>
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
