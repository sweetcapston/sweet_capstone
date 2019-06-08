<template>
  <v-expansion-panel-content>
    <template v-slot:actions>
      <v-icon color="cyan ligten-1">$vuetify.icons.expand</v-icon>
    </template>
    <template v-slot:header>
      <v-layout align-center>
        <v-flex lg5 xs3>{{ quiz.quizName }}</v-flex>
        <v-flex 
        lg4 
        xs3
        class="dateTime"
        >{{ new Date(quiz.date).format("yyyy년 MM월 dd일 a/p hh:mm") }}</v-flex>
        <v-flex lg1 xs1/>
        <v-flex lg2 xs2 v-if="quiz.active " class="timer">
          <span class="minute">{{ minutes }}</span>
          <span>:</span>
          <span class="seconds">{{ seconds }}</span>
        </v-flex>
        <v-flex lg1 xs1 justify-end @click.stop="" v-else-if="!quiz.active">
          <v-text-field
            v-model="minutes"
            class="minutes"
            type="number"
            text-align="center"
            @click.stop=""
          ></v-text-field>
        </v-flex>
        <v-flex lg1 xs1 @click.stop="" v-if="!quiz.active">분</v-flex>
        <v-flex lg1 xs1 @click.stop=""/>
        <v-flex lg1 xs1 @click.stop="">
          <v-icon
          v-show="!quiz.active"
          class="transparent  quizStart"
          @click.stop="quizStart()" 
          >mdi-play-circle-outline</v-icon>
          <v-icon 
          v-show="quiz.active"
          class="transparent  quizEnd"
          @click.stop="quizStop()"
          >mdi-stop-circle-outline</v-icon>
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
              <!-- TODO: 그림 받는 div -->
              <v-flex xs12 sm12 md6 lg6 xl6 :class="'imgQues_'+`${quiz.QID}_`+`${n-1}`">{{n}}.</v-flex>
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
let moment = require("moment");
export default {
  mounted() {
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
      steps: this.quiz.quizList.length,
      e1: 1,
      minutes:"0",
      seconds:-1,
      totalTime:0,
      timer:null
    };
  },
  props: {
    quiz: Object,
    socket: Object
  },
  created() {
    if(this.quiz.active){
      const {minutes, date} = this.quiz;
      this.totalTime = parseInt((new Date(date) - Date.now() + minutes*60*1000  )/1000)
      this.minutes = this.padTime(Math.floor(this.totalTime / 60));
      this.seconds = this.padTime(this.totalTime - (this.minutes * 60));
      this.timer = setInterval(()=>{
        if(this.minutes == "00" && this.seconds == "00"){
          return;
        }
        this.totalTime--;
        this.minutes = this.padTime(Math.floor(this.totalTime / 60));
        this.seconds = this.padTime(this.totalTime - (this.minutes * 60));
      }, 1000);
    }
    this.socket.on("quizStart",(data)=>{
      const{active, minutes, date, QID} = data;
      if(this.quiz.QID == QID){
        this.quiz.active = active;
        this.quiz.date = date;
        this.minutes = this.padTime(minutes)
        this.seconds = "00"
        this.totalTime = minutes * 60;
        this.timer = setInterval(()=>{
          if(this.minutes == "00" && this.seconds == "00"){
            return;
          }
          this.totalTime--;
          this.minutes = this.padTime(Math.floor(this.totalTime / 60));
          this.seconds = this.padTime(this.totalTime - (this.minutes * 60));
        }, 1000);
      }
    })
    this.socket.on("quizStop",(data)=>{
      const {active, QID} = data;
      if(this.quiz.QID == QID){
        this.quiz.active = active;
        this.minutes = "0"
        this.seconds = -1
        clearInterval(this.timer);
        this.timer = null;
      }
    })
  },
  methods: {
    padTime: function(time){
      return (time < 10 ? '0' : '') + time;
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
        minutes:this.minutes,
        QID:this.quiz.QID,
        date:date
      })
    },
    quizStop(){
      this.socket.emit("quizStop", this.quiz.QID)
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
.minutes .v-input__control{
  text-align: -webkit-right;
}
.minutes .v-input__control .v-input__slot .v-text-field__slot input[type="number"]{
  text-align: center;
}
.minutes .v-input__control .v-input__slot{
  width:70%;
}
.minutes .v-input__control .v-text-field__details{
  width:0px;
}
@media only screen and (max-width: 600px) {
  .dateTime {
    display: none !important;
  }
}
.timer{
  font-size: 3rem;
}
.quizStart{
  font-size:-webkit-xxx-large;
}
.quizStart:hover{
  transform: scale(1.2);
}
.quizEnd{
  font-size:-webkit-xxx-large;
}
.quizEnd:hover{
  transform: scale(1.2);
}
</style>