<template>
  <div>
    <apexchart
      type="bar"
      height="330"
      :options="{
        plotOptions: {
          bar: {
            barHeight: '100%',
            distributed: true,
            horizontal: true,
            dataLabels: {
              position: 'bottom'
            }
          }
        },
        colors: [
          '#13d8aa',
          '#A5978B',
          '#2b908f',
          '#f9a3a4',
          '#f48024',
          '#69d2e7'
        ],
        dataLabels: {
          enabled: true,
          textAnchor: 'start',
          style: {
            colors: ['#fff']
          },
          formatter: function(val, opt) {
            return opt.w.globals.labels[opt.dataPointIndex] + ': ' + val;
          },
          offsetX: 0,
          dropShadow: {
            enabled: true
          }
        },

        stroke: {
          width: 1,
          colors: ['#fff']
        },
        xaxis: {
          categories: ['내 점수', 'Max', 'Min', 'Mid', 'Avg', 'Top5 Avg']
        },
        yaxis: {
          labels: {
            show: false
          }
        },
        title: {
          text: this.qName,
          align: 'center',
          floating: true
        },
        subtitle: {
          text: this.msg,
          align: 'center'
        },
        tooltip: {
          theme: 'dark',
          x: {
            show: false
          },
          y: {
            title: {
              formatter: function() {
                return '';
              }
            }
          }
        }
      }"
      :series="quizResult"
    />
  </div>
</template>

<script>
export default {
  updated() {
    if (this.quizResult[0].data[0] >= this.quizResult[0].data[4]) {
      this.msg = "잘했습니다! 평균보다 높습니다.";
    } else {
      this.msg = "큰일났습니다! 평균보다 낮습니다.";
    }
  },
  props: {
    quizResult: Array,
    qName: String
  },
  data() {
    return {
      msg: ""
    };
  }
};
</script>