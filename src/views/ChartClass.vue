<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex d-flex xs12 sm6 md4>
        <apexchart width="330" type="donut" :options="options" :series="lists"/>
      </v-flex>
      <v-flex d-flex xs12 sm6 md3>
        
      </v-flex>
      <v-flex d-flex xs12 sm6 md2 child-flex>
        <v-card color="green lighten-2" dark>
          <v-card-text>{{ lorem.slice(0, 90) }}</v-card-text>
        </v-card>
      </v-flex>
      <v-flex d-flex xs12 sm6 md3>
        <v-card color="blue lighten-2" dark>
          <v-card-text>{{ lorem.slice(0, 100) }}</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
    data: function() {
      return {
        lorem: "Lorem ipsum dolor sit amet, mel at cu",
        options: { labels: ['SWEET', '임승배', '치킨집']},
        lists:[60,10,20]
        // series: [{
        //   name: 'series-1',
        //   data: [30, 40, 35, 50, 49, 60, 70, 91]
        // }]
      }
    },
};
</script>
