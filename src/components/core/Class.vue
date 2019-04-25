<template>
  <v-app>
    <v-content>
      <v-container fluid grid-list-md fill-height>
        <v-layout row wrap>
          <Drawer/>
          <Toolbar/>
          <router-view/>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Drawer from "./Drawer";
import Toolbar from "./Toolbar";

export default {
  name: "app",
  components: {
    Drawer,Toolbar
  },
};
</script>

<style lang="scss">

@import '@/styles/index.scss';

</style>