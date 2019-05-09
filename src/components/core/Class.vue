<template>
  <v-app>
    <core-toolbar/> 
    <v-content>
      <v-container>
        <v-layout row wrap> 
          <core-drawer/>
          <router-view/>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<style>

</style>