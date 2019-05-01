<template>
  <v-card
    class="mx-auto"
    max-width="200"
  >
    <v-img
      class="white--text"
      height="150px"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    >
      <v-card-title class="align-start fill-height" :classname="classname">{{classname}}</v-card-title>
    </v-img>

    <v-card-text :professorname="professorname" :classtime="classtime">
      <span class="text--primary">
        <span>{{professorname}}</span><br>
        <span>{{classtime}}</span><br>
      </span>
    </v-card-text>

    <v-card-actions>
      <v-btn
        text 
        color="orange"
      >
        입장
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data(){
    return{
      classCode: ''
    }
  },
  props: {
    classcode: {
      type: String
    },
    classname: {
      type: String
    },
    professorname: {
      type: String
    },
    classtime: {
      type: String
    }
  }  
}
</script>
