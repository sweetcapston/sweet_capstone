<template>
  <v-layout row wrap fill-height>
    <v-flex xs12 sm12 md6 lg6 xl6 align-center justify-center>
      <!-- TODO: 질문통계 -->
      <v-flex row xs12 sm12 md12 lg12 xl12 style="padding:5px 8px 0px 5px">
        <material-card color="crimson" title="질문 클래스 통계" text="Question Data">
          <apexchart
            v-if="this.$store.state.Identity==1"
            type="bar"
            :options="chartOptions"
            :series="series"
          />
          <QuestionResult v-if="this.$store.state.Identity==2" v-bind:questionList="questionList"/>
        </material-card>
      </v-flex>
      <!-- TODO: 퀴즈통계 -->
      <v-flex row wrap md12 style="padding:0px 8px 5px 5px;">
        <material-card color="crimson" title="퀴즈 클래스 통계" text="Quiz Data">
          <v-layout fill-height>
            <v-flex xs12 sm12 md6 lg6 xl6 style="padding-right:7px">
              <v-card>
                <v-card-title>
                  <h4>퀴즈결과</h4>
                </v-card-title>
                <v-divider></v-divider>
                <div v-if="quizList.length==0">&nbsp;&nbsp;등록된 퀴즈가 없습니다.</div>
                <v-expansion-panel v-if="this.$store.state.Identity==1">
                  <v-expansion-panel-content
                    v-for="(item,index) in quizList"
                    :key="index"
                    style="padding:3px 2px 2px 3px"
                  >
                    <template
                      v-slot:header
                      v-bind:quizList="quizList"
                      v-bind:quizStatistics="this.quizStatistics"
                    >
                      <v-card-text
                        v-if="myAnswer_Q[index].None !=0"
                        style="padding: 0px 0px 0px 15px;"
                        @click="selectQuiz(quizList[index].QID, quizList[index].QID, myAnswer_Q[index].score, quizList[index].quizName)"
                      >{{quizList[index].quizName}}</v-card-text>
                      <v-card-text
                        style="padding: 0px 0px 0px 15px; background:silver"
                        v-else
                      >응시하지 않은 퀴즈</v-card-text>
                    </template>
                  </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel v-else-if="this.$store.state.Identity==2">
                  <v-expansion-panel-content
                    v-for="(item,index) in quizList"
                    :key="index"
                    style="padding:3px 2px 2px 3px"
                    disable
                  >
                    <template
                      v-slot:header
                      v-bind:quizList="quizList"
                      v-bind:quizStatistics="this.quizStatistics"
                    >
                      <v-card-text
                        style="padding: 0px 0px 0px 15px; background:aliceblue"
                        @click="selectQuiz(quizList[index].QID, quizList[index].QID, myAnswer_Q[index].score, quizList[index].quizName)"
                      >{{quizList[index].quizName}}</v-card-text>
                    </template>
                    <!-- TODO:퀴즈 결과 데이터 분석 -->
                    <apexchart
                      type="radialBar"
                      height="350"
                      :options="chartOptions2"
                      :series="series2"
                    />
                    <v-data-table
                      style="height:100%;"
                      :headers="headers"
                      :items="quizCorrectRate"
                      class="elevation-1"
                    >
                      <template v-slot:items="pp">
                        <td>{{ pp.index+1 }}</td>
                        <td>{{ quizPoint[pp.index] }}</td>
                        <td>{{ quizCorrectRate[pp.index] }}%</td>
                      </template>
                    </v-data-table>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-card>
            </v-flex>
            <v-flex row xs12 sm12 md6 lg6 xl6 style="padding-left:7px">
              <StudentQuizResult
                v-if="this.$store.state.Identity==1"
                v-bind:quizResult="quizResult"
                v-bind:qName="qName"
              ></StudentQuizResult>
              <QuizResult v-if="this.$store.state.Identity==2" v-bind:quizResult="quizResult"></QuizResult>
            </v-flex>
          </v-layout>
        </material-card>
      </v-flex>
    </v-flex>
    <!-- TODO: 설문통계 -->
    <v-flex wrap xs12 sm12 md6 lg6 xl6 child-flex style="padding:5px 5px 5px 8px;">
      <material-card color="crimson" title="설문 클래스 통계" text="Survey Data">
        <div v-if="surveyList.length==0">
          <h3>등록된 설문이 없습니다.</h3>
        </div>
        <SurveyResult v-bind:surveyList="surveyList"/>
      </material-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Vue from "vue";
import SurveyForm from "./SurveyForm.vue";
import SurveyList from "./SurveyList.vue";
import StudentList from "./StudentList.vue";
import QuizResult from "./QuizResult.vue";
import SurveyResult from "./SurveyResult.vue";
import StudentQuizResult from "./StudentQuizResult.vue";
import QuestionResult from "./QuestionResult.vue";
import { Stud, Prof } from "@/api";
import { URL } from "@/plugins/api.config.js";

Vue.component("SurveyForm", SurveyForm);
Vue.component("SurveyList", SurveyList);
Vue.component("StudentList", StudentList);
Vue.component("QuizResult", QuizResult);
Vue.component("SurveyResult", SurveyResult);
Vue.component("StudentQuizResult", StudentQuizResult);
Vue.component("QuestionResult", QuestionResult);

/*eslint-disable */

export default {
  created() {
    Stud.loadStatistics(
      this.$store.state.currentClass.classCode,
      this.$store.state.studentID
    ).then(res => {
      if (res.data === "false") {}
      else {
        this.series[0].data = [
          res.data.data.user,
          res.data.data.avg,
          res.data.data.top5,
          res.data.data.max,
          res.data.data.mid
        ];
      }
    });
    Prof.loadStatistics(this.$store.state.currentClass.classCode).then(res => {
      if (res.data === "false") {}
      else {
        this.questionList = res.data.List;
      }
    });
    //퀴즈리스트
    Stud.loadQuiz(
      this.$store.state.currentClass.classCode,
      this.$store.state.userID
    ).then(res => {
      if (res.data === "false"){}
      else {
        const { quizList, myAnswer_Q } = res.data;
        this.myAnswer_Q = myAnswer_Q;
        this.quizList = quizList;
      }
    });
    //설문
    Stud.loadSurvey(
      this.$store.state.currentClass.classCode,
      this.$store.state.userID
    ).then(res => {
      if (res.data === "false"){}
      else {
        const { surveyList, myAnswer_S } = res.data;
        this.surveyList = surveyList;
        this.myAnswer_S = myAnswer_S;
      }
    });
  },
  data() {
    return {
      series2: [],
      chartOptions2: {
        plotOptions: {
          radialBar: {
            dataLabels: {
              name: {
                fontSize: "22px"
              },
              value: {
                fontSize: "16px"
              },
              total: {
                show: true,
                label: "퀴즈통계",
                formatter: function(w) {
                  return;
                }
              }
            }
          }
        },
        labels: ["Top5", "Avg", "Max", "Min", "Mid"]
      },
      quizPoint: "",
      headers: [
        {
          text: "문제",
          align: "left",
          sortable: false
        },
        {
          text: "배점",
          align: "left",
          sortable: false
        },
        {
          text: "정답률",
          align: "left",
          sortable: false
        }
      ],
      quizCorrectRate: [],
      questionList: [],
      surveyList: [],
      myAnswer_S: "",
      quizList: [],
      qName: "",
      myAnswer_Q: "",
      quizResult: [{ data: "" }],
      quizStatistics: "",
      Identity: this.$store.state.Identity,
      series: [
        {
          name: "Servings",
          data: ""
        }
      ],
      chartOptions: {
        annotations: {
          // TODO: 어노테이션.
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
          categories: ["나", "평균", "TOP5 평균", "Max", "Mid"]
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
      }
    };
  },
  methods: {
    selectQuiz(StudentQID, QID, score, qName) {
      if (this.$store.state.Identity == 1) {
        Stud.loadStatisticsQuiz(
          this.$store.state.currentClass.classCode,
          StudentQID
        ).then(res => {
          if (res.data === "false") {}
          else {
            this.quizResult[0].data = [
              score,
              res.data.data.max,
              res.data.data.min,
              res.data.data.mid,
              res.data.data.avg,
              res.data.data.top5
            ];
            this.qName = qName;
          }
        });
      } else if (this.$store.state.Identity == 2) {
        this.quizResult = [];
        this.quizStatistics = [];
        this.quizCorrectRate = [];
        this.quizPoint = "";
        this.series2 = [];
        Prof.loadStatisticsQuiz(
          this.$store.state.currentClass.classCode,
          QID
        ).then(res => {
          if (res.data === "false") {}
          else {
            this.quizResult = res.data.List;
            this.quizStatistics = res.data.data;
            this.quizCorrectRate = res.data.correctRate;
            this.quizPoint = res.data.point;
            let qData = [];
            qData.push(res.data.data.top5);
            qData.push(res.data.data.avg);
            qData.push(res.data.data.max);
            qData.push(res.data.data.mid);
            qData.push(res.data.data.min);
            this.series2 = qData;
          }
        });
      }
    }
  }
};
</script>

<style>
.v-card .v-offset .v-card--material__header.v-card {
  padding: 10px;
}

</style>
