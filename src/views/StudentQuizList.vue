<template>
  <v-expansion-panel-content :id="'quiz'+quiz.QID">
    <template v-slot:header>
      <v-layout align-center>
        <v-flex lg5 xs5>{{ quiz.quizName }}</v-flex>
        <v-flex lg4 xs6>{{ quiz.date }}</v-flex>
      </v-layout>
    </template>
    <template v-slot:actions>
      <v-icon color="cyan ligten-1">$vuetify.icons.expand</v-icon>
    </template>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <template class="step" v-for="n in steps">
          <v-stepper-step
            :key="`${n}-step`"
            :complete="e1 > n"
            :step="n"
            editable
            color="cyan lighten-1"
          >문항 {{ n }} ({{quiz.quizList[n-1].point[0]}}점)</v-stepper-step>
          <v-divider v-if="n !== steps" :key="n"/>
        </template>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content v-for="n in steps" :key="`${n}-content`" :step="n" :id="`step${n}`">
          <v-card class="mb-5" color="grey lighten-3" min-height="250">
            <v-container fluid style="padding-bottom:20px">
              <span
                class="question-title"
              >{{n}}. {{ quiz.quizList[n-1].quizQuestion }} ({{quiz.quizList[n-1].point[0]}}점)</span>
              <!-- FIXME: 라디오버튼 -->
              <v-radio-group
                class="radio"
                style="padding-top:10px"
                v-if="quiz.quizList[n-1].quizType == 1"
              >
                <div v-for="c in quiz.quizList[n-1].content.length" :key="`${c}-radio`">
                  <v-radio
                    :id="`${c}`"
                    :class="`radioChennel ${c}`"
                    column
                    :value="`${c}`"
                    :key="`${c}-radio`"
                    color="cyan lighten-1"
                  >
                    <template v-slot:label>
                      <v-flex>
                        <span>{{quiz.quizList[n-1].content[c-1]}}</span>
                        <span v-if="answer_Q.None != 0">({{quiz.quizList[n-1].count[c-1]}}명)</span>
                        <v-progress-linear
                          v-if="answer_Q.None != 0"
                          color="cyan"
                          width="50px"
                          height="20"
                          v-bind:value="quiz.quizList[n-1].count[c-1] * getPercent(quiz.quizList[n-1].count)"
                        />
                      </v-flex>
                    </template>
                  </v-radio>
                </div>
              </v-radio-group>
              <!-- FIXME: 체크박스 -->
              <div class="check" style="padding-top:10px" v-if="quiz.quizList[n-1].quizType == 2">
                <v-checkbox
                  :id="`${c}`"
                  v-for="c in quiz.quizList[n-1].content.length"
                  :key="`${c}-checkbox`"
                  color="cyan lighten-1"
                >
                <template v-slot:label>
                    <v-flex>
                      <span>{{quiz.quizList[n-1].content[c-1]}} </span> <span v-if="answer_Q.None != 0"> ({{quiz.quizList[n-1].count[c-1]}}명)</span>
                      <v-progress-linear
                        v-if="answer_Q.None != 0" 
                        color="cyan"
                        width="50px"
                        height="20"
                        v-bind:value="quiz.quizList[n-1].count[c-1] * getPercent(quiz.quizList[n-1].count)"
                      />
                    </v-flex>
                  </template>
                </v-checkbox>
              </div>
              <!--TODO:  주관식 -->
              <div v-if="quiz.quizList[n-1].quizType == 3">
                <v-textarea
                  :class="'text'+quiz.QID"
                  solo
                  flat
                  outline
                  label="답을 입력하세요"
                  color="cyan lighten-1"
                  v-if="answer_Q.None == 0" 
                ></v-textarea>
                <v-expansion-panel v-if="answer_Q.None != 0" id="scroll-target" style="max-height: 400px" class="scroll-y">
                  <v-expansion-panel-content style="padding:3px 2px 2px 3px">
                    <template v-slot:header>
                      <div><h4>응답 결과</h4></div>
                    </template>
                    <v-divider/>
                    <div v-for="i in quiz.quizList[n-1].content.length" :key="i">
                      <v-card-text>{{quiz.quizList[n-1].content[i-1]}}</v-card-text>
                      <v-divider/>
                    </div>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </div>
            </v-container>
          </v-card>
          <v-layout justify-space-between>
            <v-btn class="cyan lighten-1 white--text" @click="preStep(n)">Pre</v-btn>
            <v-btn class="cyan lighten-1 white--text" v-show="steps==n" @click="answerQuiz()">submit</v-btn>
            <v-btn class="cyan lighten-1 white--text" v-show="steps!=n" @click="nextStep(n)">Next</v-btn>
          </v-layout>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-expansion-panel-content>
</template>

<script>
import { Stud } from "@/api";
/*eslint-disable */
export default {
  created() {
    this.socket.on("quiz", (data) => {
      alert('socket check: ' + data.QID);
      if (this.quiz.QID == data.QID) {
        for (let i = 0; i < data.quizType.length; i++) {
          if (parseInt(data.quizType[i]) < 3) {
            let check = parseInt(data.answer[i]);
            while (check >= 1) {
              this.quiz.quizList[i].count[(check % 10) - 1]++;
              check = parseInt(check / 10);
            }
          } else {
            this.quiz.quizList[i].content.push(data.answer[i]);
          }
        }
      }
    });
  },
  mounted() {
    if (this.answer_Q.None == 0) {
      document
        .querySelector(`#quiz${this.quiz.QID}`)
        .classList.add("incomplete");
    } else {
      const el = document.querySelector(`#quiz${this.quiz.QID}`);
      el.querySelectorAll("input").forEach(doc => {
        doc.disabled = true;
      });
      el.querySelectorAll(".v-input").forEach(doc => {
        doc.classList.add("v-input--is-disabled");
      });
      el.querySelectorAll("textarea").forEach(doc => {
        doc.disabled = true;
      });
      el.querySelectorAll(".v-radio").forEach(doc => {
        doc.classList.add("v-radio--is-disabled");
      });
      el.querySelectorAll(".submit-btn").forEach(element => {
        element.remove(self);
      });
    }
  },
  data() {
    return {
      steps: this.quiz.quizList.length,
      e1: 1,
      answer: [],
      ans: "",
      quizType: []
    };
  },
  props: {
    quiz: Object,
    socket: Object,
    answer_Q: Object
  },
  methods: {
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
    answerQuiz() {
      const userID = this.$store.state.userID;
      const userName = this.$store.state.userName;
      const classCode = this.$store.state.currentClass.classCode;
      const QID = this.quiz.QID;
      let answer = [];
      let quizType = [];
      for (var n = 0; n < this.steps; n++) {
        quizType.push(this.quiz.quizList[n].quizType);
        switch (this.quiz.quizList[n].quizType) {
          case 1:
            answer.push(
              document.querySelector(
                `#quiz${QID} #step${n + 1} input[type='radio']:checked`
              ).value
            );
            break;
          case 2:
            var temp = "";
            document
              .querySelectorAll(
                `#quiz${QID} #step${n + 1} input[type='checkbox']:checked`
              )
              .forEach(element => {
                temp += element.id;
              });
            answer.push(temp);
            break;
          case 3:
            answer.push(
              document.querySelector(
                `#quiz${QID} #step${n + 1} .text${QID} textarea`
              ).value
            );
            break;
        }
      }
      const answer_Q = {
        userID: userID,
        userName: userName,
        classCode: classCode,
        QID: QID,
        quizType: quizType,
        answer: answer
      };
      // Stud.answerQuiz(classCode, answer_Q).then(res => {
      //   window.history.go(0);
      // });
      this.socket.emit("quiz", { answer_Q: answer_Q });
      window.history.go(0);
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
.question-title {
  font-size: 2.3rem;
  font-family: "Roboto", sans-serif;
}
.v-expansion-panel__container.incomplete {
  background: aliceblue !important;
}
.v-input--selection-controls .v-input__control {
  width: 100%;
}
.full-width {
  width: 100%;
}
.v-input .v-progress-linear {
  position: relative;
  width:50%;
}
.v-input--selection-controls.v-input .v-label {
  width: 100%;
}
</style>