<template>
  <apexchart type="bar" height="350" :options="chartOptions2" :series="series2"/>
</template>

<script>
export default {
  props: {
    series2: Array
  },
  data() {
    return {
      chartOptions2: {
        plotOptions: {
          bar: {
            barHeight: "100%",
            distributed: true,
            horizontal: true,
            dataLabels: {
              position: "bottom"
            }
          }
        },
        colors: [
          "#33b2df",
          "#546E7A",
          "#d4526e",
          "#13d8aa",
          "#A5978B",
          "#2b908f",
          "#f9a3a4",
          "#90ee7e",
          "#f48024",
          "#69d2e7"
        ],
        dataLabels: {
          enabled: true,
          textAnchor: "start",
          style: {
            colors: ["#fff"]
          },
          formatter: function(val, opt) {
            return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
          },
          offsetX: 0,
          dropShadow: {
            enabled: true
          }
        },

        stroke: {
          width: 1,
          colors: ["#fff"]
        },
        xaxis: {
          categories: ["내 점수", "Max", "Min", "Mid", "Avg", "Top5 Avg"]
        },
        yaxis: {
          labels: {
            show: false
          }
        },
        title: {
          text: "n번째 퀴즈 결과",
          align: "center",
          floating: true
        },
        subtitle: {
          text: "퀴즈 응시 결과 입니다.",
          align: "center"
        },
        tooltip: {
          theme: "dark",
          x: {
            show: false
          },
          y: {
            title: {
              formatter: function() {
                return "";
              }
            }
          }
        }
      }
    };
  }
};
</script>