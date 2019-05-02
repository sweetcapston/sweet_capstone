<template>
  <v-app>
    <v-content>
      <v-container fluid grid-list-md fill-height>
        <v-layout row wrap>
          <core-drawer/>
          <router-view/>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "@/styles/index.scss";
</style>