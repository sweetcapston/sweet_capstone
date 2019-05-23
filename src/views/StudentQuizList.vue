<template>
  <v-expansion-panel-content :id="'quiz'+quiz.QID">
    <template v-slot:header>
      <v-layout>
        <v-flex lg5 xs5> {{ quiz.quizName }} </v-flex>
        <v-flex lg4 xs6> {{ quiz.data }} </v-flex>
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
          >문항 {{n}}</v-stepper-step>
          <v-divider v-if="n !== steps" :key="n" />
        </template>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content v-for="n in steps" :key="`${n}-content`" :step="n" :id="`step${n}`">
          <v-card class="mb-5" color="grey lighten-3" min-height="250">
            <v-container fluid>
              <span class="question-title">{{ quiz.quizList[n-1].quizQuestion }}</span>
              <v-radio-group class="radio" style="padding-top:10px" v-if="quiz.quizList[n-1].quizType == 1">
                <v-radio
                  :id="`${c}`"
                  :class="`radioChennel ${c}`"
                  column
                  :value="`${c}`"
                  v-for="c in quiz.quizList[n-1].content.length"
                  :key="`${c}-radio`"
                  :label="`${quiz.quizList[n-1].content[c-1]} count: ${quiz.quizList[n-1].count[c-1]}`"
                  color="cyan lighten-1"
                ></v-radio>
              </v-radio-group>
              <div class="check" style="padding-top:10px" v-if="quiz.quizList[n-1].quizType == 2">
                <v-checkbox
                  :id="`${c}`"
                  v-for="c in quiz.quizList[n-1].content.length"
                  :key="`${c}-checkbox`"
                  :label="`${quiz.quizList[n-1].content[c-1]} count: ${quiz.quizList[n-1].count[c-1]}`"
                  color="cyan lighten-1"
                ></v-checkbox>
              </div>
            </v-container>
          </v-card>
          <v-layout justify-space-between>
            <v-btn class="cyan lighten-1 white--text" @click="preStep(n)">Pre</v-btn>
            <v-btn
              class="cyan lighten-1 white--text"
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
export default {
  data() {
    return {
      steps: this.quiz.quizList.lenght,
      e1: 1,
      answer: [],
      ans: "",
      quizType: []
    };
  },
  props: {
    quiz: Object
  },
  methods: {
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
      const classCode = this.$store.state.currentClass.classCode;
      const QID = this.quiz.QID;
      let quizType = [];
      let answer = [];
      for (var n = 0; n < this.steps; n++) {
        quizType.push(this.quiz.quizList[n].quizType);
        if (this.quiz.quizList[n].quizType == 1) {
          answer.push (
            "" +
              document.querySelector(
                `#quiz${QID} #step${n+1} input[type='radio']:checked`
              ).value
          );
        } else if (this.quiz.quizList[n].quizType == 2) {
          let temp = "";
          document
            .querySelectorAll (
              `#quiz${QID} #step${n+1} input[type='checkbox']:chcked`
            )
            .forEach (element => {
              temp += element.id;
            });
          answer.push(temp);
        } else if (this.quiz.quizList[n].quizType == 3) {
          answer.push(
            document.querySelector(`#quiz${QID} #step${n+1} .text${QID} textarea`).value
          );
        }
      }
      const answer_Q = {
        userID: userID,
        classCode: classCode,
        QID: QID,
        quizType: quizType,
        answer: answer
      }
      // console.log(answer_Q)
    }
  }
};
</script>
