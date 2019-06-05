<template>
  <v-layout row wrap fill-height>
    <v-flex xs12 sm12 md6 lg6 xl6 align-center justify-center>
      <!-- TODO: 질문 -->
      <v-flex row xs12 sm12 md12 lg12 xl12 style="padding:5px 8px 0px 5px">
        <material-card color="crimson" title="질문 클래스 통계" text="Question Data">
          <apexchart type="bar" :options="chartOptions" :series="series"/>
        </material-card>
      </v-flex>
      <!-- TODO: 퀴즈 -->
      <v-flex row wrap md12 style="padding:0px 8px 5px 5px;">
        <material-card color="crimson" title="퀴즈 클래스 통계" text="Quiz Data">
          <v-layout fill-height>
            <v-flex xs12 sm12 md6 lg6 xl6>
              <v-card>
                <v-card-title>
                  <h4>퀴즈결과</h4>
                </v-card-title>
                <v-divider></v-divider>
                <v-list dense v-for="(item,index) in quizList" :key="index">
                  <div v-if="myAnswer_Q[index].None !=0">
                    <v-list-tile
                      @click="selectQuiz(myAnswer_Q[index].QID, myAnswer_Q[index].score)"
                    >
                      <v-list-tile-content>{{item.quizName}}</v-list-tile-content>
                      <v-list-tile-content
                        v-if="myAnswer_Q[index].None !=0"
                        class="align-end"
                      >{{myAnswer_Q[index].score}}</v-list-tile-content>
                    </v-list-tile>
                  </div>
                </v-list>
              </v-card>
            </v-flex>
            <v-flex row xs12 sm12 md6 lg6 xl6>
              <QuizResult v-bind:quizResult="quizResult"></QuizResult>
            </v-flex>
          </v-layout>
        </material-card>
      </v-flex>
    </v-flex>
    <!-- TODO: 설문 -->
    <v-flex wrap xs12 sm12 md6 lg6 xl6 child-flex style="padding:5px 5px 5px 8px;">
      <material-card color="crimson" title="설문 클래스 통계" text="Survey Data">
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
import { Stud, Prof } from "@/api";
import { URL } from "@/plugins/api.config.js";

Vue.component("SurveyForm", SurveyForm);
Vue.component("SurveyList", SurveyList);
Vue.component("StudentList", StudentList);
Vue.component("QuizResult", QuizResult);
Vue.component("SurveyResult", SurveyResult);
/*eslint-disable */

export default {
  created() {
    //퀴즈 통계
    //질문 통계
    Stud.loadStatistics(
      this.$store.state.currentClass.classCode,
      this.$store.state.studentID
    ).then(res => {
      if (res.data === "false") alert("질문차트 가져오기 실패");
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
    //퀴즈리스트
    Stud.loadQuiz(
      this.$store.state.currentClass.classCode,
      this.$store.state.userID
    ).then(res => {
      if (res.data === "false") alert("퀴즈 가져오기 실패");
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
      if (res.data === "false") alert("설문 가져오기 실패");
      else {
        const { surveyList, myAnswer_S } = res.data;
        this.surveyList = surveyList;
        this.myAnswer_S = myAnswer_S;
      }
    });
  },
  data() {
    return {
      surveyList: [],
      myAnswer_S: "",
      quizList: [],
      myAnswer_Q: "",
      quizResult: [{ data: "" }],
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
    selectQuiz(QID, score) {
      Stud.loadStatisticsQuiz(
        this.$store.state.currentClass.classCode,
        QID
      ).then(res => {
        if (res.data === "false") alert("퀴즈통계 가져오기 실패");
        else {
          this.quizResult[0].data = [
            score,
            res.data.data.max,
            res.data.data.min,
            res.data.data.mid,
            res.data.data.avg,
            res.data.data.top5
          ];
        }
      });
    }
  }
};
</script>

<style>
.v-card .v-offset .v-card--material__header.v-card {
  padding: 10px;
}
</style>
