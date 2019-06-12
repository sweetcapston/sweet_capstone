<template>
  <v-expansion-panel-content :class="`quiz${quiz.QID}`">
    <template v-slot:actions>
      <v-icon color="cyan ligten-1">$vuetify.icons.expand</v-icon>
    </template>
    <template v-slot:header v-if="!edit">
      <v-layout align-center>
        <v-speed-dial
          v-if="profName == userName "
          v-model="fab"
          absolute
          small
          :direction="'left'"
          :open-on-hover="false"
          :transition="'slide-x-reverse-transition'"
          @click.stop
        >
          <template v-slot:activator>
            <v-btn
              class="fab quizFab"
              v-model="fab"
              color="transparent"
              fab
              @click.stop="floating()"
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-btn
            v-model="fab"
            fab
            dark
            small
            color="red"
            class="quizFab"
            @click.stop="deleteQuiz()"
          >
            <v-icon>delete</v-icon>
          </v-btn>
          <v-btn
            v-model="fab"
            fab
            dark
            small
            class="quizFab"
            color="green"
            @click.stop="editQuiz()"
          >
            <v-icon>edit</v-icon>
          </v-btn>
        </v-speed-dial>
        <v-flex lg5 xs3>{{ quiz.quizName }}</v-flex>
        <v-flex lg4 xs3 class="dateTime">{{ new Date(quiz.date).format("yyyy년 MM월 dd일 a/p hh:mm") }}</v-flex>
        <v-flex lg1 xs1/>
        <v-flex lg2 xs2 v-if="quiz.active " class="timer">
          <span class="minute">{{ minutes }}</span>
          <span>:</span>
          <span class="seconds">{{ seconds }}</span>
        </v-flex>
        <v-flex lg1 xs1 justify-end @click.stop v-else-if="!quiz.active">
          <v-text-field
            v-model="minutes"
            class="minutes"
            type="number"
            text-align="center"
            @click.stop
          ></v-text-field>
        </v-flex>
        <v-flex lg1 xs1 @click.stop v-if="!quiz.active">분</v-flex>
        <v-flex lg1 xs1 @click.stop/>
        <v-flex lg1 xs1 @click.stop>
          <v-icon
            v-show="!quiz.active"
            class="transparent quizStart"
            @click.stop="quizStart()"
          >mdi-play-circle-outline</v-icon>
          <v-icon
            v-show="quiz.active"
            class="transparent quizEnd"
            @click.stop="quizStop()"
          >mdi-stop-circle-outline</v-icon>
        </v-flex>
      </v-layout>
    </template>
    <template v-slot:header v-else>
      <v-text-field
        single-line
        label="제목을 입력하세요"
        color="cyan ligten-1"
        v-model="quizName"
        class="quizName"
        @click.stop
      ></v-text-field>
    </template>
    <v-stepper v-model="e1" v-if="!edit">
      <v-stepper-header>
        <template class="step" v-for="n in steps">
          <v-stepper-step
            :key="`${n}-step`"
            :complete="e1 > n"
            :step="n"
            editable
            color="cyan lighten-1"
          >문항 {{ n }} ({{quizList[n-1].point}}점)</v-stepper-step>
          <v-divider v-if="n !== steps" :key="n"></v-divider>
        </template>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content v-for="n in steps" :key="`${n}-content`" :step="n">
          <v-card class="mb-5" color="grey lighten-3" min-height="250px">
            <v-container fluid>
              <!-- TODO: 그림 받는 div -->
              <v-flex
                style="font-size:1.5rem; font-weight:600"
                xs12
                sm12
                md8
                lg8
                xl8
                :class="'imgQues_'+`${quiz.QID}_`+`${n-1}`"
                v-html="`${n}. ${quizList[n-1].quizQuestion}`"
              ></v-flex>
              <!-- FIXME: 라디오버튼 -->
              <v-radio-group
                v-show="quiz.quizList[n-1].quizType == 1"
                column
                v-model="radioValue[n-1]"
              >
                <div
                  style="padding-top:6px"
                  v-for="c in quiz.quizList[n-1].content.length"
                  :key="`${c}-radio`"
                >
                  <v-radio
                    disabled
                    value="true"
                    :id="`${c}`"
                    :label="`${quizList[n-1].content[c-1]} count:  ${quizList[n-1].count[c-1]}`"
                    color="cyan ligten-1"
                  >
                    <template v-slot:label>
                      <v-flex>
                        {{quizList[n-1].content[c-1]}} ({{quizList[n-1].count[c-1]}}명)
                        <v-progress-linear
                          color="cyan"
                          width="50px"
                          height="20"
                          v-bind:value="quizList[n-1].count[c-1] * getPercent(quizList[n-1].count)"
                        />
                      </v-flex>
                    </template>
                  </v-radio>
                </div>
              </v-radio-group>
              <!-- FIXME: 체크박스 -->
              <div v-if="quizList[n-1].quizType == 2">
                <v-checkbox
                  disabled
                  :id="`${c}`"
                  v-for="c in quizList[n-1].content.length"
                  :key="`${c}-checkbot`"
                  color="cyan lighten-1"
                  v-model="checkValue"
                  :value="`${c}`"
                >
                  <template v-slot:label>
                    <v-flex>
                      {{quizList[n-1].content[c-1]}} ({{quizList[n-1].count[c-1]}}명)
                      <v-progress-linear
                        color="cyan"
                        width="50px"
                        height="20"
                        v-bind:value="quizList[n-1].count[c-1] * getPercent(quizList[n-1].count)"
                      />
                    </v-flex>
                  </template>
                </v-checkbox>
              </div>
              <!-- FIXME:주관식 -->
              <div
                v-if="quizList[n-1].quizType == 3"
                id="scroll-target"
                style="max-height: 400px "
                class="scroll-y"
              >
                <v-expansion-panel>
                  <v-expansion-panel-content style="padding:3px 2px 2px 3px">
                    <template v-slot:header>
                      <div>
                        <h4>응답 결과</h4>
                      </div>
                    </template>
                    <v-divider/>
                    <div v-for="i in quizList[n-1].content.length" :key="i">
                      <v-card-text>{{quizList[n-1].content[i-1]}}</v-card-text>
                      <v-divider/>
                    </div>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </div>
            </v-container>
          </v-card>
          <v-layout justify-space-between>
            <v-btn class="cyan lighten-1 white--text" @click="preStep(n)">Pre</v-btn>

            <v-btn class="cyan lighten-1 white--text" @click="nextStep(n)">Next</v-btn>
          </v-layout>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
    <QuizEdit v-bind:quiz="quiz" v-else/>
  </v-expansion-panel-content>
</template>


<script>
import { Prof } from "@/api";
import Vue from "vue";
import QuizEdit from "./QuizEdit.vue";
Vue.component("QuizEdit", QuizEdit);
let moment = require("moment");
export default {
  data() {
    return {
      radioValue: [],
      checkValue: [],
      steps: 0,
      quizList: [],
      userName: this.$store.state.userName,
      profName: this.$store.state.currentClass.profName,
      edit: false,
      e1: 1,
      minutes: "0",
      quizName: "",
      seconds: -1,
      totalTime: 0,
      timer: null,
      fab: false
    };
  },
  props: {
    quiz: Object,
    socket: Object
  },
  created() {
    this.steps = this.quiz.quizList.length;
    this.quizList = this.quiz.quizList;
    this.$EventBus.$on("edit", data => {
      this.fab = false;
      if (data != this.quiz.QID) {
        this.edit = false;
        if (
          document.querySelector(
            `.quiz${this.quiz.QID} .v-expansion-panel__body`
          ) != null &&
          document.querySelector(
            `.quiz${this.quiz.QID} .v-expansion-panel__body`
          ).style.display != "none"
        ) {
          document
            .querySelector(`.quiz${this.quiz.QID} .v-expansion-panel__header`)
            .click();
        }
      }
    });
    this.quizName = this.quiz.quizName;
    if (this.quiz.active) {
      const { minutes, date } = this.quiz;
      this.totalTime = parseInt(
        (new Date(date) - Date.now() + minutes * 60 * 1000) / 1000
      );
      this.minutes = this.padTime(Math.floor(this.totalTime / 60));
      this.seconds = this.padTime(this.totalTime - this.minutes * 60);
      this.timer = setInterval(() => {
        if (this.minutes == "00" && this.seconds == "00") {
          return;
        }
        this.totalTime--;
        this.minutes = this.padTime(Math.floor(this.totalTime / 60));
        this.seconds = this.padTime(this.totalTime - this.minutes * 60);
      }, 1000);
    }
    this.socket.on("quizStart", data => {
      const { active, minutes, date, QID } = data;
      if (this.quiz.QID == QID) {
        this.quiz.active = active;
        this.quiz.date = date;
        this.minutes = this.padTime(minutes);
        this.seconds = "00";
        this.totalTime = minutes * 60;
        this.timer = setInterval(() => {
          if (this.minutes == "00" && this.seconds == "00") {
            return;
          }
          this.totalTime--;
          this.minutes = this.padTime(Math.floor(this.totalTime / 60));
          this.seconds = this.padTime(this.totalTime - this.minutes * 60);
        }, 1000);
      }
    });
    this.socket.on("quizStop", data => {
      const { active, QID } = data;
      if (this.quiz.QID == QID) {
        this.quiz.active = active;
        this.minutes = "0";
        this.seconds = -1;
        clearInterval(this.timer);
        this.timer = null;
      }
    });
    // this.radioValue = 
    for(let i=0; i<this.quizList.length; i++){
      this.radioValue.push(this.quizList[i].correct)
    }
    alert(this.radioValue)
  },
  methods: {
    cancel() {
      if (confirm("취소하시겠습니까?")) this.edit = false;
    },
    // edited: function(editedQuiz){
    //   this.$emit("edited", editedQuiz)
    //   this.edit = false;
    // },
    floating: function() {
      this.fab = !this.fab;
    },
    padTime: function(time) {
      return (time < 10 ? "0" : "") + time;
    },
    getPercent(array) {
      var sum = 0;
      for (var i = 0; i < array.length; i++) sum = sum + array[i];
      return 100 / sum;
    },
    nextStep(n) {
      this.e1 = n + 1;
    },
    preStep(n) {
      if (1 === this.steps) {
        this.e1 = 1;
      } else {
        this.e1 = n - 1;
      }
    },
    quizStart() {
      const date = moment().format();
      this.socket.emit("quizStart", {
        minutes: this.minutes,
        QID: this.quiz.QID,
        date: date
      });
    },
    quizStop() {
      this.socket.emit("quizStop", this.quiz.QID);
    },
    deleteQuiz() {
      this.fab = false;
      this.socket.emit("delete", this.quiz.QID);
    },
    editQuiz() {
      this.$EventBus.$emit("edit", this.quiz.QID);
      this.fab = false;
      this.edit = true;
      if (
        document.querySelector(`.quiz${this.quiz.QID} .v-expansion-panel__body`)
          .style.display == "none"
      ) {
        document
          .querySelector(`.quiz${this.quiz.QID} .v-expansion-panel__header`)
          .click();
      }
    }
  }
};
</script>

<style>
.classStat {
  width: 120px !important;
}
.v-expansion-panel__header {
  display: -webkit-box;
}
.surveyStart {
  margin-right: 5px !important;
}
.surveyEnd {
  margin-right: 5px !important;
}
.surveyStart:hover {
  background: #00e676;
}
.minutes .v-input__control {
  text-align: -webkit-right;
}
.minutes
  .v-input__control
  .v-input__slot
  .v-text-field__slot
  input[type="number"] {
  text-align: center;
}
.minutes .v-input__control .v-input__slot {
  width: 70%;
}
.minutes .v-input__control .v-text-field__details {
  width: 0px;
}
@media only screen and (max-width: 600px) {
  .dateTime {
    display: none !important;
  }
}
.timer {
  font-size: 3rem;
}
.quizStart {
  font-size: -webkit-xxx-large;
}
.quizStart:hover {
  transform: scale(1.2);
}
.quizEnd {
  font-size: -webkit-xxx-large;
}
.quizEnd:hover {
  transform: scale(1.2);
}
.quizFab {
  border-radius: 50% !important;
}
</style>