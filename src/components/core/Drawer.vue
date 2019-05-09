<template>
   <v-navigation-drawer
    id="app-drawer"
    v-model="drawer"
    app
    dark
    floating
    persistent
    mobile-break-point="960"
    width="260"
    >
    <v-img
      :src="image"
      height="100%"
    >
    <v-layout
        class="fill-height"
        tag="v-list"
        column
      >
      <v-list-tile avatar>
          <v-list-tile-avatar
            color="white"
          >
            <v-img
              :src="require('@/assets/logo.svg')"
              height="34"
              contain
            />
          </v-list-tile-avatar>
          <v-list-tile-title class="title">
            {{this.$store.state.currentClass.className + ' ' + this.$store.state.currentClass.profName}}
          </v-list-tile-title>
        </v-list-tile>

        <v-list-tile>
            {{`클래스코드 : ${this.$store.state.currentClass.classCode}`}}
        </v-list-tile>
      <v-divider/>

      <v-list>
        <v-list-tile
          v-for="(link, i) in $store.state.links"
          :key="i"
          @click="moveToPage(link)"
          :active-class= "color"
          avatar
          class="v-list-item"
        >
          <v-list-tile-action>
             <v-icon medium>{{link.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-title v-text="link.text">
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-layout>
    </v-img>
   </v-navigation-drawer>
</template>

<script>
  // Utilities
  import {
    mapMutations
  } from 'vuex'

  export default {
    name: 'drawer',
    data: () => ({
      image: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg',
      logo: '@/assets/logo.svg',
      color: 'error',
      colors: [
        'purple',
        'info',
        'success',
        'warning',
        'error'
      ],
      responsive: false
    }),
    computed: {
      drawer: {
        get () {
          return this.$store.state.drawer
        },
        set (val) {
          this.setDrawer(val)
        }
      }
    },
    methods: {
      ...mapMutations(['setDrawer']),
      moveToPage: function(link){
        this.$router.push(link.to+this.$store.state.currentClass.classCode+link.to2)
      }
    }
  }
</script>


<style lang="scss">
  #app-drawer {
    .v-list__tile {
      border-radius: 4px;
    }
    .v-image__image--contain {
      top: 9px;
      height: 60%;
    }
    .search-input {
      margin-bottom: 30px !important;
      padding-left: 15px;
      padding-right: 15px;
    }
    .fill-height > .v-list{
      background: 0;
    }
  }
</style>