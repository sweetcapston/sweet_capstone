<template>
  <v-toolbar
    flat
    height="50px"
  >
  <v-toolbar-side-icon
      class="hidden-md-and-up"
      @click="toggleDrawer"
    />
    <div class="v-toolbar-title">
      <v-toolbar-title
        class="tertiary--text font-weight-light"
      >
      {{ title }}
      </v-toolbar-title>
    </div>

    <v-spacer />

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