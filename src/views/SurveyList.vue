<template>
  <v-expansion-panel-content>
    <template v-slot:actions>
      <v-icon color="cyan ligten-1">$vuetify.icons.expand</v-icon>
    </template>
    <template v-slot:header>
      <v-layout align-center>
        <v-flex lg5 xs3>{{survey.surveyName}}</v-flex>
        <v-flex lg5 xs4>{{survey.date}}</v-flex>
        <v-flex lg2 xs2>
          <v-btn
            v-show="!survey.active"
            class="green accent-4 white--text surveyStart"
            @click.stop="surveyActive()"
          >설문 시작</v-btn>
          <v-btn
            v-show="survey.active"
            class="crimson white--text surveyEnd"
            @click.stop="surveyActive()"
          >설문 종료</v-btn>
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
          >문항 {{ n }}</v-stepper-step>
          <v-divider v-if="n !== steps" :key="n"/>
        </template>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content v-for="n in steps" :key="`${n}-content`" :step="n">
          <v-card class="mb-5" color="grey lighten-3" style="padding-bottom:3%">
            <v-container fluid>
              {{survey.surveyList[n-1].surveyQuestion}}
              <v-radio-group v-show="survey.surveyList[n-1].surveyType == 1" column>
                <div v-for="c in survey.surveyList[n-1].content.length" :key="`${c}-radio`">
                  <v-radio disabled :id="`${c}`" color="cyan ligten-1">
                    <template v-slot:label>
                      <v-flex>
                        {{survey.surveyList[n-1].content[c-1]}} {{survey.surveyList[n-1].count[c-1]}}
                        <v-progress-linear
                          color="cyan"
                          width="50px"
                          height="20"
                          v-bind:value="survey.surveyList[n-1].count[c-1] * getPercent(survey.surveyList[n-1].count)"
                        />
                      </v-flex>
                    </template>
                  </v-radio>
                </div>
              </v-radio-group>

              <div v-show="survey.surveyList[n-1].surveyType == 2">
                <v-checkbox
                  disabled
                  :id="`${c}`"
                  v-for="c in survey.surveyList[n-1].content.length"
                  :key="`${c}-checkbox`"
                  color="cyan ligten-1"
                >
                  <template v-slot:label>
                    <v-flex>
                      {{survey.surveyList[n-1].content[c-1]}} {{survey.surveyList[n-1].count[c-1]}}
                      <v-progress-linear
                        color="cyan"
                        width="50px"
                        height="20"
                        v-bind:value="survey.surveyList[n-1].count[c-1] * getPercent(survey.surveyList[n-1].count)"
                      />
                    </v-flex>
                  </template>
                </v-checkbox>
              </div>
              <!-- FIXME: 주관식 -->
              <div v-if="survey.surveyList[n-1].surveyType == 3" id="scroll-target" style="max-height: 400px " class="scroll-y">
                  <v-expansion-panel>
                    <v-expansion-panel-content style="padding:3px 2px 2px 3px">
                      <template v-slot:header>
                        <div>응답 리스트</div>
                      </template>
                      <div v-for="i in survey.surveyList[n-1].content.length" :key="i">
                    
                          <v-card-text>{{survey.surveyList[n-1].content[i-1]}}</v-card-text>
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
/*eslint-disable */
export default {
  data() {
    return {
      steps: this.survey.surveyList.length,
      e1: 1
    };
  },
  props: {
    survey: Object,
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
    surveyActive() {
      Prof.surveyActive(this.survey).then(res => {
        console.log(res);
        this.survey.active = res.data;
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
