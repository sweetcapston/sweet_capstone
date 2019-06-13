<template>
  <v-expansion-panel>
    <v-expansion-panel-content v-for="(survey,i) in surveyList" :key="i">
      <template v-slot:header>
        <div>{{survey.surveyName}}</div>
      </template>
      <v-card style="background:aliceblue" v-if="survey.surveyList[0].count.reduce((a, b) => a + b, 0) != 0">
        <v-card-text v-for="(item,index) in survey.surveyList.length" :key="index">
          <h4>{{index+1}}. {{survey.surveyList[index].surveyQuestion}}</h4>
          <apexchart
            style="margin-top:25px;"
            v-if="survey.surveyList[index].surveyType==1"
            type="donut"
            width="80%"
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
            type="pie"
            width="80%"
            :options="{
          labels: survey.surveyList[index].content,
          theme: {
            monochrome: {
              enabled: false
            }
          },
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        }"
            :series="survey.surveyList[index].count"
          />
          <div v-if="survey.surveyList[index].surveyType==3">
            <v-expansion-panel style="margin-top:10px">
              <v-expansion-panel-content style="padding:3px 2px 2px 3px">
                <template v-slot:header>
                  <div>
                    <h4>응답 결과</h4>
                  </div>
                </template>
                <v-divider/>
                <div v-for="i in survey.surveyList[index].content.length" :key="i">
                  <v-card-text>{{survey.surveyList[index].content[i-1]}}</v-card-text>
                  <v-divider/>
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </div>
          <v-divider/>
        </v-card-text>
      </v-card>
        <v-card v-else>
        <v-card-text>
          <v-layout align-center justify-center>
            No data available
          </v-layout>
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
    return {
      headers: [
        {
          text: "내 용",
          align: "center",
          sortable: false
        }
      ]
    };
  }
};
</script>