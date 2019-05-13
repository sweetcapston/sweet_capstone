<template>
  <v-app>
    <h1>설문 페이지</h1>
    <h1>클래스 코드 : {{this.$store.state.currentClass.classCode}}</h1>
    
    <v-card
      class="mx-auto"
      color="#26c6da"
      dark
      max-width="400"
    >
      <v-card-title>
        <v-list-tile class="grow">
          <v-list-tile-content>
            <v-list-tile-title>Evan You</v-list-tile-title>
          </v-list-tile-content>
          <v-layout
            justify-end
          >
            <v-icon class="mr-1">mdi-heart</v-icon>
            <span class="subheading mr-2">256</span>
          </v-layout>
        </v-list-tile>
      </v-card-title>

      <v-card-text>
        "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well."
      </v-card-text>
    </v-card>
   
  </v-app>

  
</template>