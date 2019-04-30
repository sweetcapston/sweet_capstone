<template>
  <v-toolbar
    app
    flat
    dark color="secendary"
  >
    <v-toolbar-side-icon
      class="hidden-md-and-up"
      @click="toggleDrawer"
    />
    <v-container
      mx-auto
      py-0
    >
      <v-layout>
        <v-img
          :src="require('../../assets/logo.svg')"
          class="mr-4"
          contain
          height="48"
          width="48"
          max-width="48"
        />
        <v-btn
          v-for="(link, i) in $store.state.links"
          :key="i"
          :to="link.to"
          class="ml-0 hidden-sm-and-down"
          flat
        >
          {{ link.text }}
        </v-btn>
      </v-layout>
    </v-container>
  </v-toolbar>
</template>

<script>
  // Utilities
  import {
    mapMutations
  } from 'vuex'

  export default {
    methods: {
      ...mapMutations(['toggleDrawer'])
    }
  }
</script>