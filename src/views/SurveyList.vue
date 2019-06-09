<template >
  <v-expansion-panel-content :class="`survey${survey.SID}`">
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
          @click.stop=""
          >
            <template v-slot:activator>
              <v-btn
                class="fab surveyFab"
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
              color = "red"
              class="surveyFab"
              @click.stop="deleteSurvey()"
            >
              <v-icon>delete</v-icon>
            </v-btn>
            <v-btn
              v-model="fab"
              fab
              dark
              small
              class="surveyFab"
              color="green"
              @click.stop="editSurvey()"
            >
              <v-icon>edit</v-icon>
            </v-btn>
          </v-speed-dial>
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
    <template v-slot:header v-else>
      <v-text-field
        single-line
        label="제목을 입력하세요"
        color="cyan ligten-1"
        v-model="survey.surveyName"
        class="surveyName"
        @click.stop
      ></v-text-field>
      <v-btn 
      class="red lighten-1 white--text cancelBtn" 
      @click.stop="cancel">
        <v-icon>cancel</v-icon>
      </v-btn>
    </template>
    <v-stepper v-model="e1"  v-if="!edit">
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
              <span class="question-title">{{survey.surveyList[n-1].surveyQuestion}}</span>
              <!-- FIXME: 라디오버튼 -->
              <v-radio-group v-show="survey.surveyList[n-1].surveyType == 1" column>
                <div v-for="c in survey.surveyList[n-1].content.length" :key="`${c}-radio`">
                  <v-radio disabled :id="`${c}`" color="cyan ligten-1">
                    <template v-slot:label>
                      <v-flex>
                        {{survey.surveyList[n-1].content[c-1]}} ({{survey.surveyList[n-1].count[c-1]}}명)
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
              <!-- FIXME: 체크박스 -->
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
                      {{survey.surveyList[n-1].content[c-1]}} ({{survey.surveyList[n-1].count[c-1]}}명)
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
              <div
                v-if="survey.surveyList[n-1].surveyType == 3"
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

            <v-btn class="cyan lighten-1 white--text next" @click="nextStep(n)">Next</v-btn>
          </v-layout>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
    <SurveyEdit v-bind:survey="survey" @edited="edited" v-else/>
  </v-expansion-panel-content>
</template>

<script>
import { Prof } from "@/api";
import Vue from "vue";
import SurveyEdit from "./SurveyEdit.vue";
Vue.component("SurveyEdit", SurveyEdit);
/*eslint-disable */
export default {
  created() {
    this.$EventBus.$on("surveyEdit", data => {
      this.fab = false;
      if(data != this.survey.SID){
        this.edit = false;
        if(this.survey && document.querySelector(`.survey${this.survey.SID} .v-expansion-panel__body`).style.display !="none"){
          document.querySelector(`.survey${this.survey.SID} .v-expansion-panel__header`).click();
        }
      }
    })
    this.socket.on("survey", (data) => {
      if(this.survey.SID == data.SID){
        for (let i = 0; i < data.surveyType.length; i++) {
          if (parseInt(data.surveyType[i]) < 3) {
            let check = parseInt(data.answer[i]);
            while (check >= 1) {
                this.survey.surveyList[i].count[check % 10 - 1]++;
                check = parseInt(check / 10)
            }
          } else{
            this.survey.surveyList[i].content.push(data.answer[i]);
          }
        }
      }
    })
    
  },
  data() {
    return {
      steps: this.survey.surveyList.length,
      userName: this.$store.state.userName,
      profName:this.$store.state.currentClass.profName,
      edit:false,
      e1: 1,
      userName: this.$store.state.userName,
      profName:this.$store.state.currentClass.profName,
      fab:false
    };
  },
  props: {
    survey: Object,
    socket: Object
  },
  methods: {

    cancel(){
      if(confirm("취소하시겠습니까?")) this.edit = false;
    },
    edited: function(editedSurvey){
      this.$emit("edited", editedSurvey)
      this.edit = false;
    },
    floating: function(){
      this.fab = !this.fab;
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
    surveyActive() {
      Prof.surveyActive(this.survey).then(res => {
        console.log(res);
        this.survey.active = res.data;
      });
    },
    deleteSurvey(){
      this.fab = false;
      this.socket.emit("delete", this.survey.SID)
    },
    editSurvey(){
      this.$EventBus.$emit("surveyEdit", this.survey.SID)
      this.fab = false;
      this.edit = true;
      if(document.querySelector(`.survey${this.survey.SID} .v-expansion-panel__body`).style.display =="none"){
        document.querySelector(`.survey${this.survey.SID} .v-expansion-panel__header`).click();
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

.surveyFab{
  border-radius: 50% !important;
}
</style>
