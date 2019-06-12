<template>
  <v-expansion-panel-content :id="`quiz${quiz.QID}`">
    <template v-slot:header>
      <v-layout align-center>
        <v-flex md5 lg5 xs5>{{ quiz.quizName }}</v-flex>
        <v-flex md5 lg5 xs5>{{ new Date(quiz.date).format("yyyy년 MM월 dd일 a/p hh:mm") }}</v-flex>
        <v-flex v-if="answer_Q.None != 0" md2 lg2 xs2>{{ answer_Q.score }}점</v-flex>
        <v-flex lg2 xs2 v-else-if="quiz.active" class="timer">
          <span class="minute">{{ minutes }}</span>
          <span>:</span>
          <span class="seconds">{{ seconds }}</span>
        </v-flex>
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
          >문항 {{ n }} ({{quiz.quizList[n-1].point}}점)</v-stepper-step>
          <v-divider v-if="n !== steps" :key="n"/>
        </template>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content v-for="n in steps" :key="`${n}-content`" :step="n" :id="`step${n}`">
          <v-card class="mb-5" color="grey lighten-3" min-height="250">
            <v-container fluid style="padding-bottom:20px">
              <!-- TODO: 그림 받는 div -->
              <v-flex
                xs12
                sm12
                md8
                lg8
                xl8
                style="font-weight:600; font-size:1.5rem"
                :class="'imgQues_'+`${quiz.QID}_`+`${n-1}`"
              >{{n}}.</v-flex>
              <!-- FIXME: 라디오버튼 -->
              <v-radio-group
                class="radio"
                style="padding-top:10px"
                v-if="quiz.quizList[n-1].quizType == 1"
                v-model="radioValue[n-1]"
              >
                <div
                  style="padding-top:6px"
                  v-for="c in quiz.quizList[n-1].content.length"
                  :key="`${c}-radio`"
                >
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
                  v-model="checkValue"
                  :value="`${c}`"
                >
                  <template v-slot:label>
                    <v-flex>
                      <span>{{quiz.quizList[n-1].content[c-1]}}</span>
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
                <v-textarea solo disabled v-if="answer_Q.None != 0" :value="radioValue[n-1]"></v-textarea>
              </div>
            </v-container>
          </v-card>
          <v-layout justify-space-between>
            <v-btn class="cyan lighten-1 white--text" @click="preStep(n)">Pre</v-btn>
            <v-btn
              class="cyan lighten-1 white--text submit-btn"
              v-show="steps==n"
              @click="answerQuiz()"
            >submit</v-btn>
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
    // 학생 응시퀴즈 목록화면에서 체되게
    if (this.answer_Q.None != 0) {
      for (let i = 0; i < this.answer_Q.quizType.length; i++) {
        if (this.answer_Q.quizType[i] == 2)
          for (let j = 0; j < this.answer_Q.answer[i].length; j++)
            this.checkValue.push(this.answer_Q.answer[i][j]);
      }
      this.radioValue = this.answer_Q.answer;
    }
    if (this.quiz.active && this.answer_Q.None == 0) {
      const { minutes, date } = this.quiz;
      this.totalTime = parseInt(
        (new Date(date) - Date.now() + minutes * 60 * 1000) / 1000
      );
      this.minutes = this.padTime(Math.floor(this.totalTime / 60));
      this.seconds = this.padTime(this.totalTime - this.minutes * 60);
      this.timer = setInterval(() => {
        if (this.minutes == "00" && this.seconds == "00") {
          this.sendAnswer();
          return;
        }
        this.totalTime--;
        this.minutes = this.padTime(Math.floor(this.totalTime / 60));
        this.seconds = this.padTime(this.totalTime - this.minutes * 60);
      }, 1000);
    }

    this.socket.on("quiz", data => {
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
    this.socket.on("quizStart", data => {
      const { active, minutes, date, QID } = data;
      if (this.quiz.QID == QID && this.answer_Q.None == 0) {
        const el = document.querySelector(`#quiz${this.quiz.QID}`);
        el.classList.remove("v-expansion-panel__container--disabled");
        el.querySelectorAll("input").forEach(doc => {
          doc.disabled = false;
        });
        el.querySelectorAll(".v-input").forEach(doc => {
          doc.classList.remove("v-input--is-disabled");
        });
        el.querySelectorAll("textarea").forEach(doc => {
          doc.disabled = false;
        });
        el.querySelectorAll(".v-radio").forEach(doc => {
          doc.classList.remove("v-radio--is-disabled");
        });
        this.quiz.active = active;
        this.quiz.date = date;
        this.minutes = this.padTime(minutes);
        this.seconds = "00";
        this.totalTime = minutes * 60;
        this.timer = setInterval(() => {
          if (this.minutes == "00" && this.seconds == "00") {
            this.sendAnswer();
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
      if (this.quiz.QID == QID && this.answer_Q.None == 0) {
        this.quiz.active = active;
        clearInterval(this.timer);
        this.timer = null;
        this.sendAnswer();
      }
    });
  },
  mounted() {
    if (this.answer_Q.None == 0 && !this.quiz.active) {
      const el = document.querySelector(`#quiz${this.quiz.QID}`);
      el.classList.add("v-expansion-panel__container--disabled");
      el.querySelector(
        ".v-expansion-panel__header__icon"
      ).children[0].classList.add("inactive");
      el.querySelector(".v-expansion-panel__body").style.display = "none";
    }
    if (this.answer_Q.None == 0 && this.quiz.active) {
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
    }
    for (let i = 0; i < this.steps; i++) {
      document
        .querySelector(`.imgQues_${this.quiz.QID}_${i}`)
        .insertAdjacentHTML(
          "beforeend",
          `${this.quiz.quizList[i].quizQuestion}`
        );
    }
  },
  data() {
    return {
      radioValue: [],
      checkValue: [],
      steps: this.quiz.quizList.length,
      e1: 1,
      answer: [],
      ans: "",
      quizType: [],
      minutes: "0",
      seconds: "00",
      totalTime: 0,
      timer: null
    };
  },
  props: {
    quiz: Object,
    socket: Object,
    answer_Q: Object,
    num: Number
  },
  methods: {
    sendAnswer: function() {
      const userID = this.$store.state.userID;
      const userName = this.$store.state.userName;
      const classCode = this.$store.state.currentClass.classCode;
      const QID = this.quiz.QID;
      let answer = [];
      let quizType = [];
      let elem;
      for (var n = 0; n < this.steps; n++) {
        quizType.push(this.quiz.quizList[n].quizType);
        switch (this.quiz.quizList[n].quizType) {
          case 1:
            elem = document.querySelector(
              `#quiz${QID} #step${n + 1} input[type='radio']:checked`
            );
            if (elem == null) {
              answer.push("0");
            } else {
              answer.push(elem.value);
            }
            break;
          case 2:
            var temp = "";
            elem = document.querySelectorAll(
              `#quiz${QID} #step${n + 1} input[type='checkbox']:checked`
            );
            if (elem.length == 0) {
              answer.push("0");
            } else {
              elem.forEach(element => {
                temp += element.id;
              });
              answer.push(temp);
            }
            break;
          case 3:
            elem = document.querySelector(
              `#quiz${QID} #step${n + 1} .text${QID} textarea`
            ).value;
            if (elem == "") {
              answer.push("오답");
            } else {
              answer.push(elem);
            }
            break;
        }
      }
      const answer_Q = {
        userID: userID,
        studentID: this.$store.state.studentID,
        userName: userName,
        classCode: classCode,
        studentID: this.$store.state.studentID,
        QID: QID,
        quizType: quizType,
        answer: answer
      };
      Stud.answerQuiz(classCode, answer_Q).then(res => {
        clearInterval(this.timer);
        this.timer = null;
        window.history.go(0);
      });
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
    answerQuiz() {
      const userID = this.$store.state.userID;
      const userName = this.$store.state.userName;
      const classCode = this.$store.state.currentClass.classCode;
      const QID = this.quiz.QID;
      let answer = [];
      let quizType = [];
      let elem;
      for (var n = 0; n < this.steps; n++) {
        quizType.push(this.quiz.quizList[n].quizType);
        switch (this.quiz.quizList[n].quizType) {
          case 1:
            elem = document.querySelector(
              `#quiz${QID} #step${n + 1} input[type='radio']:checked`
            );
            if (elem == null) {
              this.e1 = n + 1;
              alert("입력되지 않은 항목이 있습니다.");
              setTimeout(
                () =>
                  document
                    .querySelector(
                      `#quiz${QID} #step${n + 1} input[type='radio']`
                    )
                    .focus(),
                50
              );
              return;
            }
            answer.push(elem.value);
            break;
          case 2:
            var temp = "";
            elem = document.querySelectorAll(
              `#quiz${QID} #step${n + 1} input[type='checkbox']:checked`
            );
            if (elem.length == 0) {
              this.e1 = n + 1;
              alert("입력되지 않은 항목이 있습니다.");
              setTimeout(
                () =>
                  document
                    .querySelector(
                      `#quiz${QID} #step${n + 1} input[type='checkbox']`
                    )
                    .focus(),
                50
              );
              return;
            }
            elem.forEach(element => {
              temp += element.id;
            });
            answer.push(temp);
            break;
          case 3:
            elem = document.querySelector(
              `#quiz${QID} #step${n + 1} .text${QID} textarea`
            ).value;
            if (elem == "") {
              this.e1 = n + 1;
              alert("입력되지 않은 항목이 있습니다.");
              setTimeout(
                () =>
                  document
                    .querySelector(
                      `#quiz${QID} #step${n + 1} .text${QID} textarea`
                    )
                    .focus(),
                50
              );
              return;
            }
            answer.push(elem);
            break;
        }
      }
      const answer_Q = {
        userID: userID,
        studentID: this.$store.state.studentID,
        userName: userName,
        classCode: classCode,
        studentID: this.$store.state.studentID,
        QID: QID,
        quizType: quizType,
        answer: answer
      };
      Stud.answerQuiz(classCode, answer_Q).then(res => {
        window.history.go(0);
      });
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
.incomplete {
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
  width: 50%;
}
.v-input--selection-controls.v-input .v-label {
  width: 100%;
}
.my-img {
  width: 300px;
  height: 200px;
}
</style>