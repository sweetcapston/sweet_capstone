<template>
  <v-layout row wrap fill-height>
    <v-flex xs12 sm12 md6 lg6 xl6 align-center justify-center>
      <!-- TODO: 질문 -->
      <v-flex row md12 lg12 xl12 style=" height:50%; padding:5px 8px 0px 5px">
        <material-card color="crimson" title="질문 클래스 통계" text="Question Data">
          <apexchart type="bar" height="300" :options="chartOptions" :series="series"/>
        </material-card>
      </v-flex>
      <!-- TODO: 퀴즈 -->
      <v-flex row wrap md12 style="height:50%; padding:0px 8px 5px 5px;">
        <material-card color="crimson" title="퀴즈 클래스 통계" text="Quiz Data">
          <v-layout fill-height>
            <v-flex lg6 style="background:beige;">
              <h4>퀴즈 리스트</h4>
            </v-flex>
            <v-flex lg6>
              <apexchart type=bar height=350 :options="chartOptions2" :series="series2" />
            </v-flex>
          </v-layout>
        </material-card>
      </v-flex>
    </v-flex>
    <!-- TODO: 설문 -->
    <v-flex wrap xs12 sm12 md6 lg6 xl6 child-flex style="padding:5px 5px 5px 8px;">
      <material-card color="crimson" title="설문 클래스 통계" text="Survey Data">
        <v-expansion-panel v-if="Identity==1">
          <StudentList
            v-for="n in surveyList.length"
            v-bind:survey="surveyList[n-1]"
            v-bind:answer_S="myAnswer_S[n-1]"
            v-bind:socket="socket"
            :key="n"
          />
        </v-expansion-panel>
        <v-expansion-panel v-else>
          <SurveyForm v-show="formShow"/>
          <SurveyList
            v-for="(survey, _id) in surveyList"
            v-bind:survey="survey"
            v-bind:socket="socket"
            :key="_id"
          />
        </v-expansion-panel>
      </material-card>
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
import io from "socket.io-client";

Vue.component("SurveyForm", SurveyForm);
Vue.component("SurveyList", SurveyList);
Vue.component("StudentList", StudentList);

/*eslint-disable */

export default {
  beforeCreate() {
    if (this.$store.state.Identity == 1) {
      Stud.loadSurvey(
        this.$store.state.currentClass.classCode,
        this.$store.state.userID
      ).then(res => {
        if (res.data === "false") alert("설문 가져오기 실패");
        else {
          const { surveyList, myAnswer_S } = res.data;
          this.surveyList = surveyList;
          this.myAnswer_S = myAnswer_S;
          this.elem = new Array(surveyList.length).fill(1);
          this.steps = [];
          surveyList.forEach(element => {
            this.steps.push(element.surveyList.length);
          });
        }
      });
    } else {
      Prof.loadSurvey(this.$store.state.currentClass.classCode).then(res => {
        if (res.data === "false") alert("설문 가져오기 실패");
        else {
          const { surveyList } = res.data;
          this.surveyList = surveyList;
          this.elem = new Array(surveyList.length).fill(1);
          this.steps = [];
          surveyList.forEach(element => {
            this.steps.push(element.surveyList.length);
          });
        }
      });
    }
  },
  created() {
    this.socket.emit("channelJoin", {
      classCode: this.$store.state.currentClass.classCode,
      Identity: this.$store.state.Identity,
      userName: this.$store.state.userName,
      userID: this.$store.state.userID
    });
    this.socket.on("joinSuccess", data => {
      console.log("socket connect");
    });
  },
  data() {
    return {
      socket: io(`${URL}:3000/survey`),
      icon: "mdi-plus-circle",
      radios: "radio-1",
      Identity: this.$store.state.Identity,
      elem: [],
      steps: [],
      surveyList: [],
      completeList: [],
      formShow: false,
      series2: [
        {
          data: [70, 100, 30, 50, 55, 85]
        }
      ],
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
          categories: [
            "내 점수",
            "Max",
            "Min",
            "Mid",
            "Avg",
            "Top5 Avg",
          ]
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
      },
      series: [
        {
          name: "Servings",
          data: [55, 45, 65, 35, 70, 40]
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
    addSurvey() {
      this.formShow = !this.formShow;
      document
        .querySelector(".createSurvey .v-expansion-panel__header")
        .click();
    }
  },
  beforeRouteLeave(to, from, next) {
    this.socket.emit("diconnect");
    this.socket.disconnect();
    next();
  }
};
</script>

<style>
.v-card .v-offset .v-card--material__header.v-card {
  padding: 10px;
}
</style>
