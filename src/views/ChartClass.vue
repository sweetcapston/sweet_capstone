<template>
  <v-layout row wrap fill-height>
    <v-flex xs12 sm12 md6 align-center justify-center >
      <v-flex row md12 style=" height:50%; border:1px solid;">
        <h3>질문 클래스 통계</h3>
        <apexchart type="bar" height="300" :options="chartOptions" :series="series"/>
      </v-flex>
      <v-flex row md12 style="border:1px solid; height:50%">
        <h3>설문 클래스 통계</h3>
        <apexchart width="330" type="donut" :options="option1" :series="list1"/>
      </v-flex>
    </v-flex>
    <v-flex d-flex xs12 sm12 md6 child-flex style="border:1px solid">
      <apexchart type="bar" height="350" :options="chartOptions2" :series="series2"/>
    </v-flex>
  </v-layout>
</template>

<script>
/*eslint-disable */

export default {
  data() {
    return {
      series: [
        {
          name: "Servings",
          data: [55, 45, 65, 35, 70, 40]
        }
      ],
      chartOptions: {
        annotations: {  // TODO: 어노테이션.
          points: [
            {
              x: "나",
              seriesIndex: 0,
              label: {
                borderColor: "#775DD0",
                offsetY: 0,
                style: {
                  color: "#fff",
                  background: "#775DD0"
                },
                text: "평균보다 높네요."
              }
            }
          ]
        },
        chart: {
          height: 350,
          type: "bar"
        },
        plotOptions: {
          bar: {
            columnWidth: "30%",
            endingShape: "rounded"
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: 2
        },

        grid: {
          row: {
            colors: ["#fff", "#f2f2f2"]
          }
        },
        xaxis: {
          labels: {
            rotate: -45
          },
          categories: [
            "나",
            "평균",
            "TOP 5 평균",
            "Min",
            "Max",
            "Mid",
        
       
          ]
        },
        yaxis: {
          title: {
            text: "질문횟수"
          }
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "light",
            type: "horizontal",
            shadeIntensity: 0.25,
            gradientToColors: undefined,
            inverseColors: true,
            opacityFrom: 0.85,
            opacityTo: 0.85,
            stops: [50, 0, 100]
          }
        }
      },
      option1: { labels: ["SWEET", "임승배", "치킨집"] },
      list1: [60, 10, 20],
    };
    //   series: [
    //     {
    //       name: "Series 1",
    //       data: [80, 50, 30, 40, 100, 20]
    //     }
    //   ],
    //   chartOptions: {
    //     labels: ["January", "February", "March", "April", "May", "June"],
    //     title: {
    //       text: "Basic Radar Chart"
    //     }
    //   },
    //   series2: [
    //     {
    //       data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
    //     }
    //   ],
    //   chartOptions2: {
    //     plotOptions: {
    //       bar: {
    //         horizontal: true
    //       }
    //     },
    //     dataLabels: {
    //       enabled: false
    //     },
    //     xaxis: {
    //       categories: [
    //         "South Korea",
    //         "Canada",
    //         "United Kingdom",
    //         "Netherlands",
    //         "Italy",
    //         "France",
    //         "Japan",
    //         "United States",
    //         "China",
    //         "Germany"
    //       ]
    //     }
    //   }
    // };
    // series: [{
    //   name: 'series-1',
    //   data: [30, 40, 35, 50, 49, 60, 70, 91]
    // }]
  },
  methods: {}
};
</script>

<style>

</style>
