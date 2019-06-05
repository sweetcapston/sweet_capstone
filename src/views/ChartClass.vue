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
            <v-flex lg6>
              <v-card>
                <v-card-title>
                  <h4>퀴즈결과</h4>
                </v-card-title>
                <v-divider></v-divider>
                <v-list dense v-for="(item,index) in quizList" :key="index">
                  <v-list-tile @click="test(index + 1)">
                    <v-list-tile-content>{{item.quizName}}</v-list-tile-content>
                    <v-list-tile-content class="align-end"></v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card>
            </v-flex>
            <v-flex row xs12 sm12 md12 lg12 xl12>
              <core-quiz-list v-bind:series2="series2"></core-quiz-list>
            </v-flex>
          </v-layout>
        </material-card>
      </v-flex>
    </v-flex>
    <!-- TODO: 설문 -->
    <v-flex wrap xs12 sm12 md6 lg6 xl6 child-flex style="padding:5px 5px 5px 8px;">
      <material-card color="crimson" title="설문 클래스 통계" text="Survey Data"></material-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Vue from "vue";
import SurveyForm from "./SurveyForm.vue";
import SurveyList from "./SurveyList.vue";
import StudentList from "./StudentList.vue";
import { Stud, Prof } from "@/api";
import { URL } from "@/plugins/api.config.js";

Vue.component("SurveyForm", SurveyForm);
Vue.component("SurveyList", SurveyList);
Vue.component("StudentList", StudentList);

/*eslint-disable */

export default {
  created() {
    Stud.loadStatistics(
      this.$store.state.currentClass.classCode,
      this.$store.state.studentID
    ).then(res => {
      if (res.data === "false") alert("차트 가져오기 실패");
      else {
      }
    });
    this.series[0].data = [10, 20, 30, 40, 50, 60];

    Stud.loadQuiz(
      this.$store.state.currentClass.classCode,
      this.$store.state.userID
    ).then(res => {
      if (res.data === "false") alert("퀴즈 가져오기 실패");
      else {
        const { quizList, myAnswer_Q } = res.data;
        this.quizList = quizList;
        this.myAnswer_Q = myAnswer_Q;
        this.elem = new Array(quizList.length).fill(1);
        this.steps = [];
        quizList.forEach(element => {
          this.steps.push(element.quizList.length);
        });
      }
    });
  },
  data() {
    return {
      quizList: [],
      series2: [{ data: "" }],
      items: [10, 20, 30, 40, 50, 60, 70],
      questionData: "",
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
          categories: ["나", "평균", "TOP 5 평균", "Min", "Max", "Mid"]
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
      list1: [60, 10, 20]
    };
  },
  methods: {
    test(n) {
      this.series2[0].data = [n * 5, n * 7, n * 10, n * 13, n * 16, n * 20];
    }
  }
};
</script>

<style>
.v-card .v-offset .v-card--material__header.v-card {
  padding: 10px;
}
</style>
