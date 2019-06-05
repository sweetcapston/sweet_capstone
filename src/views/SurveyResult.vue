<template>
  <v-expansion-panel>
    <v-expansion-panel-content v-for="(survey,i) in surveyList" :key="i">
      <template v-slot:header>
        <div>{{survey.surveyName}}</div>
      </template>
      <v-card style="background:aliceblue">
        <v-card-text v-for="(item,index) in survey.surveyList.length" :key="index">
          {{index+1}}. {{survey.surveyList[index].surveyQuestion}}
          <apexchart
            v-if="survey.surveyList[index].surveyType==1"
            type="donut"
            width="470"
            :series="survey.surveyList[index].count"
            :options="{ 
                        labels: survey.surveyList[index].content,
                        responsive: 
                        [
                          {
                            breakpoint: 480,
                            options: {
                             chart: {
                                width: 200
                              },
                              legend: {
                                position: 'bottom'
                              }
                            }
                          }
                        ]
                      }"
          />
          <apexchart
            v-if="survey.surveyList[index].surveyType==2"
            type="radar"
            height="350"
            :series="[{data:survey.surveyList[index].count}]"
            :options="{
        labels: survey.surveyList[index].content,
        plotOptions: {
                        radar: {
                        size: 140,
                        polygons: {
                          strokeColor: '#e9e9e9',
                          fill: {
                            colors: ['#f8f8f8', '#fff']
                          }
                        }
                      }
                    },
                    colors: ['#FF4560'],
                    markers: {
                      size: 4,
                      colors: ['#fff'],
                      strokeColor: '#FF4560',
                      strokeWidth: 2
                    },
                    tooltip: {
                      y: {
                        formatter: function(val) {
                          return val;
                        }
                      }
                    },
                    yaxis: {
                      tickAmount: 7,
                      labels: {
                        formatter: function(val, i) {
                          if (i % 2 === 0) {
                            return val;
                          } else {
                            return '';
                          }
                        }
                      }
                    }
      }"
          />
          <div v-if="survey.surveyList[index].surveyType==3">
            <p>주관식 답 리스트</p>
            <span>{{survey.surveyList[index].content}}</span>
          </div>
          <v-divider/>
        </v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {
  props: {
    surveyList: Array
  },
  data() {
    return {};
  }
};
</script>