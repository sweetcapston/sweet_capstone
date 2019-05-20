<template>
  <v-expansion-panel-content :id="'survey'+survey.SID">
    <template v-slot:header>
      <v-layout>
        <v-flex lg5 xs5>{{survey.surveyName}}</v-flex>
        <v-flex lg4 xs6>{{survey.date}}</v-flex>
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
          >문항 {{ n }}</v-stepper-step>
          <v-divider v-if="n !== steps" :key="n"/>
        </template>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content v-for="n in steps" :key="`${n}-content`" :step="n" :id="`step${n}`">
          <v-card class="mb-5" color="grey lighten-3" min-height="250">
            <v-container fluid>
              <span class="question-title">{{survey.surveyList[n-1].surveyQuestion}}</span>
              <v-radio-group class="radio" style="padding-top:10px" v-if="survey.surveyList[n-1].surveyType == 1">
                <v-radio
                  :id="`${c}`"
                  :class="`radioChennel ${c}`"
                  column
                  :value="`${c}`"
                  v-for="c in survey.surveyList[n-1].content.length"
                  :key="`${c}-radio`"
                  :label="`${survey.surveyList[n-1].content[c-1]}  count:  ${survey.surveyList[n-1].count[c-1]}`"
                  color="cyan ligten-1"
                />
              </v-radio-group>
              <div class="check" style="padding-top:10px" v-if="survey.surveyList[n-1].surveyType == 2">
                <v-checkbox
                  :id="`${c}`"
                  v-for="c in survey.surveyList[n-1].content.length"
                  :key="`${c}-checkbox`"
                  :label="`${survey.surveyList[n-1].content[c-1]}  count:  ${survey.surveyList[n-1].count[c-1]}`"
                  color="cyan ligten-1"
                />
              </div>
              <div v-if="survey.surveyList[n-1].surveyType == 3">
                <v-textarea
                  :class="'text'+survey.SID"
                  solo
                  flat
                  outline
                  label="답을 입력하세요"
                  color="cyan lighten-1"
                ></v-textarea>
              </div>
            </v-container>
          </v-card>
          <v-layout justify-space-between>
            <v-btn class="cyan lighten-1 white--text" @click="preStep(n)">Pre</v-btn>
            <v-btn
              class="cyan lighten-1 white--text"
              v-show="steps==n"
              @click="answerSurvey()"
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
  data() {
    return {
      steps: this.survey.surveyList.length,
      e1: 1,
      answer: [],
      ans: "",
      surveyType: []
    };
  },
  props: {
    survey: Object
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
    answerSurvey() {
      const userID = this.$store.state.userID;
      const classCode = this.$store.state.currentClass.classCode;
      const SID = this.survey.SID;
      let surveyType = [];
      let answer = [];
      for (var n = 0; n < this.steps; n++) {
        surveyType.push(this.survey.surveyList[n].surveyType);
        if (this.survey.surveyList[n].surveyType == 1) {
          answer.push(
            "" +
              document.querySelector(
                `#survey${SID} #step${n+1} input[type='radio']:checked`
              ).value
          );
        } else if (this.survey.surveyList[n].surveyType == 2) {
          let temp = "";
          document
            .querySelectorAll(
              `#survey${SID} #step${n+1} input[type='checkbox']:checked`
            )
            .forEach(element => {
              temp += element.id;
            });
          answer.push(temp);
        } else if (this.survey.surveyList[n].surveyType == 3) {
          answer.push(
            document.querySelector(`#survey${SID} #step${n+1} .text${SID} textarea`).value
          );
        }
      }
      const answer_S = {
          userID: userID,
          classCode: classCode,
          SID: SID,
          surveyType: surveyType,
          answer: answer
      }
      console.log(answer_S)
      // Stud.answerSurvey(classCode, answer_S)
      // .then(
      //   res => {
      //     window.history.go(0);
      //   }
      // )
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
</style>