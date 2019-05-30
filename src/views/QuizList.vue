<template>
  <v-expansion-panel-content>
    <template v-slot:actions>
      <v-icon color="teal">done</v-icon>
    </template>
    <template v-slot:header>
      <v-layout align-center>
        <v-flex lg5 xs3>{{ quiz.quizName }}</v-flex>
        <v-flex lg5 xs4>{{ quiz.date }}</v-flex>
        <v-flex lg2 xs2>
          <v-btn
            v-show="!quiz.active"
            class="green accent-4 white--text quizStart"
            @click.stop="quizActive()"
          >퀴즈 시작</v-btn>

          <v-btn
            v-show="quiz.active"
            class="crimson white--text quizEnd"
            @click.stop="quizActive()"
          >퀴즈 종료</v-btn>
        </v-flex>
      </v-layout>
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
          <v-divider v-if="n !== steps" :key="n"></v-divider>
        </template>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content v-for="n in steps" :key="`${n}-content`" :step="n">
          <v-card class="mb-5" color="grey lighten-3" min-height="250px">
            <v-container fluid>
              <span
                class="question-title"
              >{{quiz.quizList[n-1].quizQuestion}} ({{quiz.quizList[n-1].point[0]}}점)</span>
              <!-- FIXME: 라디오버튼 -->
              <v-radio-group v-show="quiz.quizList[n-1].quizType == 1" column>
                <div v-for="c in quiz.quizList[n-1].content.length" :key="`${c}-radio`">
                  <v-radio
                    disabled
                    :id="`${c}`"
                    :label="`${quiz.quizList[n-1].content[c-1]} count:  ${quiz.quizList[n-1].count[c-1]}`"
                    color="cyan ligten-1"
                  >
                    <template v-slot:label>
                      <v-flex>
                        {{quiz.quizList[n-1].content[c-1]}} ({{quiz.quizList[n-1].count[c-1]}}명)
                        <v-progress-linear
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
              <div v-show="quiz.quizList[n-1].quizType == 2">
                <v-checkbox
                  disabled
                  :id="`${c}`"
                  v-for="c in quiz.quizList[n-1].content.length"
                  :key="`${c}-checkbot`"
                  color="cyan lighten-1"
                >
                  <template v-slot:label>
                    <v-flex>
                      {{quiz.quizList[n-1].content[c-1]}} ({{quiz.quizList[n-1].count[c-1]}}명)
                      <v-progress-linear
                        color="cyan"
                        width="50px"
                        height="20"
                        v-bind:value="quiz.quizList[n-1].count[c-1] * getPercent(quiz.quizList[n-1].count)"
                      />
                    </v-flex>
                  </template>
                </v-checkbox>
              </div>
              <!-- FIXME:주관식 -->
              <div
                v-if="quiz.quizList[n-1].quizType == 3"
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

            <v-btn class="cyan lighten-1 white--text" @click="nextStep(n)">Next</v-btn>
          </v-layout>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-expansion-panel-content>
</template>


<script>
import { Prof } from "@/api";
export default {
  data() {
    return {
      steps: this.quiz.quizList.length,
      e1: 1
    };
  },
  props: {
    quiz: Object,
    socket: Object
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
    quizActive() {
      Prof.quizActive(this.quiz).then(res => {
        this.quiz.active = res.data;
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
</style>