<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex d-flex xs12 sm6 md4 style="border:1px solid" align-center justify-center>
        <apexchart width="330" type="donut" :options="option1" :series="list1"/>
      </v-flex>
      <v-flex d-flex xs12 sm6 md3 style="border:1px solid">
        <apexchart type="radar" height="350" :options="chartOptions" :series="series"/>
      </v-flex>
      <v-flex d-flex xs12 sm6 md5 child-flex style="border:1px solid">
        <apexchart type="bar" height="350" :options="chartOptions2" :series="series2"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: function() {
    return {
      lorem: "Lorem ipsum dolor sit amet, mel at cu",
      option1: { labels: ["SWEET", "임승배", "치킨집"] },
      list1: [60, 10, 20],
      series: [
        {
          name: "Series 1",
          data: [80, 50, 30, 40, 100, 20]
        }
      ],
      chartOptions: {
        labels: ["January", "February", "March", "April", "May", "June"],
        title: {
          text: "Basic Radar Chart"
        }
      },
      series2: [
        {
          data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
        }
      ],
      chartOptions2: {
        plotOptions: {
          bar: {
            horizontal: true
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: [
            "South Korea",
            "Canada",
            "United Kingdom",
            "Netherlands",
            "Italy",
            "France",
            "Japan",
            "United States",
            "China",
            "Germany"
          ]
        }
      }
    };
    // series: [{
    //   name: 'series-1',
    //   data: [30, 40, 35, 50, 49, 60, 70, 91]
    // }]
  }
};
</script>
