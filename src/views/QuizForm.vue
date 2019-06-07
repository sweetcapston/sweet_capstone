<template>
  <v-expansion-panel-content class="createQuiz">
    <template v-slot:actions>
      <v-icon color="teal">done</v-icon>
    </template>

    <template v-slot:header>
      <v-text-field
        single-line
        label="제목을 입력하세요"
        color="cyan ligten-1"
        class="quizName"
        @click.stop
      ></v-text-field>
    </template>

    <v-stepper v-model="e1">
      <v-stepper-header>
        <template v-for="n in card_datas.length">
          <v-stepper-step
            :key="`${n}-step`"
            :complete="e1 > n"
            :step="n"
            editable
            color="cyan lighten-1"
          >문항 {{ n }}</v-stepper-step>

          <v-divider v-if="n !== card_datas.length" :key="n"></v-divider>
        </template>

        <template>
          <v-icon class="cyan lighten-1 white--text" @click="addStep()">mdi-plus-circle</v-icon>
        </template>
      </v-stepper-header>

      <v-stepper-items>
        <core-quiz-steps 
          v-for="(card_data, n) in card_datas"
          :key="card_data.id"
          :step="n+1" 
          class="listItem"
          v-bind:n="n"
          v-bind:steps="card_datas.length"
          v-bind:card_data="card_data" 
          @remove="deleteStep(n)"
          @preStep="preStep(n+1)"
          @nextStep="nextStep(n+1)"
          @complete="completeQuiz()"
        >
        </core-quiz-steps>
      </v-stepper-items>
    </v-stepper>
    <v-tour name="quizForm" :steps="guide"></v-tour>
  </v-expansion-panel-content>
</template>

<script>
/*eslint-disable */
import Vue from 'vue'
import VueTour from 'vue-tour'
import { Prof } from "@/api";
import { maxHeaderSize } from 'http';
require('vue-tour/dist/vue-tour.css')
Vue.use(VueTour)

export default {
  name: "quizForm",
  data() {
    return {
      guide: [
        {
          target: '.addButton',  
          content: `퀴즈를 생성할 수 있습니다!`,
          params: {
            placement: 'bottom',
            enableScrolling: false
          }
        },
        {
          target: '.quizName', 
          content: `<strong>제목을 입력하세요</strong>!`,
          params: {
            placement: 'bottom',
            enableScrolling: false
          }
        },
        {
          target: '.v-stepper__step__step.cyan.lighten-1', 
          content: `문항 번호를 확인 하세요.`,
          params: {
            placement: 'bottom',
            enableScrolling: false
          }
        },
        {
          target: '.mdi-plus-circle',
          content: '더 많은 문제를 작성하세요.',
          params: {
            placement: 'bottom',
            enableScrolling: false
          }
        },
        {
          target: '.v-btn--floating',
          content: '문제를 삭제할 수 있습니다.',
          params: {
            placement: 'bottom',
            enableScrolling: false
          }
        },
        {
          target: '#imageUpload',
          content: '퀴즈에 이미지를 추가할 수 있습니다.',
          params: {
            placement: 'bottom',
            enableScrolling: false
          }
        },  
        {
          target: 'input[type=radio]',
          content: `<strong>정답을 체크해 주세요</strong>`,
          params: {
            placement: 'bottom',
            enableScrolling: false
          }
        },
        {
          target: '[role=radiogroup] .v-radio.theme--light.cyan--text.text--ligten-1',
          content: '타입을 선택할 수 있습니다.',
          params: {
            placement: 'bottom',
            enableScrolling: false
          }
        },
        {
          target: '#point0',
          content: '문제의 점수는?',
          params: {
            placement: 'bottom',
            enableScrolling: false
          }
        },
        {
          target: '#next',
          content: '버튼을 눌러 다음 문제를 작성하세요.',
          params: {
            placement: 'bottom',
            enableScrolling: false
          }
        }
      ],
      e1: 1,
      card_datas: [
        {
          id:1,
          type:'1',
          samplestype1:[{
            id:1
          }],
          samplestype2:[{
            id:1001
          }]
        },
        {
          id:2,
          type:'1',
          samplestype1:[{
            id:1
          }],
          samplestype2:[{
            id:1001
          }]
        },
        {
          id:3,
          type:'1',
          samplestype1:[{
            id:1
          }],
          samplestype2:[{
            id:1001
          }]
        }
      ],
      newID: 4,
      icon: "mdi-plus-circle"
    };
  },
  methods: {
    completeQuiz() {
      let moment = require("moment");
      const quizName = document.querySelector(".quizName input").value;
      // if(quizName=="") {
      //   alert("퀴즈의 제목을 입력하세요")
      //   return;
      // }
      const classCode = this.$store.state.currentClass.classCode;
      const date = moment().format();
      const quizList = [];
      for (var j = 0; j < this.card_datas.length; j++) {
        const quizType = document.querySelectorAll(
          ".quizType input[type='radio']:checked"
        )[j].value;
        const quizQuestion = document.querySelector(`.quizQuestion_${j+1}`).innerHTML;
        if(quizQuestion==""){
          alert("질문이 입력되지 않았습니다.")
          this.e1 = j+1
          setTimeout(()=> document.querySelector(`.quizQuestion_${j+1}`).focus(), 50)
          return 
        }
        let content = [];
        let point = [];
        let correct;
        let doc, checkedbox;
        let count;
        let pointDoc = document.querySelector(`#point${j}`);
        if(pointDoc.value==""){
          alert("점수를 입력해주세요.")
          this.e1 = j+1
          setTimeout(()=> pointDoc.focus(), 50) 
          return;
        }
        point.push(pointDoc.value);
        switch (quizType) {
          case "1":
            doc = document.querySelectorAll(`.type1_${j+1}`);
            for (let i = 0; i < doc.length; i++) {
              let elem = document.querySelector(`input[type=radio]:checked#correct${j}`);
              if(elem == null){
                alert("정답을 체크해주세요")
                this.e1 = j+1
                setTimeout(()=> document.querySelector(`input[type=radio]#correct${j}`).focus(), 50)
                return
              }
              correct = String(parseInt(elem.value)+1)
              if(doc[i].querySelector("input").value == ""){
                alert("입력되지 않은 항목이 있습니다.")
                this.e1 = j+1
                setTimeout(()=> doc[i].querySelector("input").focus(), 50)
                return
              }
              content.push(doc[i].querySelector("input").value);
            }
            count = new Array(doc.length).fill(0);
            break;
          case "2":
            correct = ""
            checkedbox = document.querySelectorAll(`input[type=checkbox]:checked#correct${j}`)
            if(checkedbox.length == 0){
              alert("정답을 체크해주세요")
              this.e1 = j+1
              setTimeout(()=> document.querySelector(`input[type=checkbox]#correct${j}`).focus(), 50)
              return
            }
            checkedbox.forEach(checked => {
              correct += String(parseInt(checked.value)+1)
            })
            doc = document.querySelectorAll(`.type2_${j+1}`);
            for (let i = 0; i < doc.length; i++) {
              if(doc[i].querySelector("input").value == ""){
                alert("입력되지 않은 항목이 있습니다.")
                this.e1 = j+1
                setTimeout(()=> doc[i].querySelector("input").focus(), 50)
                return
              }
              content.push(doc[i].querySelector("input").value);
            }
            count = new Array(doc.length).fill(0);
            break;
          case "3":
            doc = document.querySelector("textarea");
            if(doc.value==""){
              alert("정답을 입력해주세요")
              this.e1 = j+1
              setTimeout(()=> doc.focus(), 50)
              return
            }
            content.push(doc.value);
            count = 1;
            break;
        }
        quizList.push({
          quizType: parseInt(quizType),
          quizQuestion: quizQuestion,
          content: content,
          count: count,
          point: point,
          correct: correct
          // TODO: 정답이랑 배점도 추가해야함.
        });
      }
      const newQuiz = {
        quizName: quizName,
        quizList: quizList,
        classCode: classCode,
        date: date,
        public: true,
        active: false
      };
      Prof.quizCreate(newQuiz).then(res => {
        if (res.data) {
          this.$emit("childs-event", true);
          window.history.go(0);
        }
      });
    },
    addStep(n) {
      this.card_datas.push({
        id:this.newID++,
        type:'1',
        samplestype1:[{
          id:1
        }],
        samplestype2:[{
          id:1001
        }]
      })
    },
    deleteStep(n) {
      this.card_datas.splice(n, 1);
      this.e1 -= 1;
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
    }
  },
  mounted: function () {
    this.$tours['quizForm'].start()
  }
}
</script>
<style>
.mdi.mdi-plus-circle:hover {
  background: aqua !important;
}
.mdi.mdi-plus-circle:active {
  box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),
    0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
}
.newQuiz:hover {
  background: cyan;
}
.quizName > .v-input__control > .v-text-field__details {
  height: 0px;
  margin-bottom: 0px;
}
.addSample > .v-input__control > .v-message {
  height: 0px;
  margin: 0px;
}
.typeCard > .v-input__control > .v-message {
  height: 0px;
  margin: 0px;
}
.quizType > .v-input__control > .v-input__slot {
  margin-top: 10px;
  margin-left: 5px;
}
.addSample {
  margin-top: 20px;
}
.progress-bar {
  margin: 10px 0;
}
input[type="file"] {
  position: absolute;
  clip: rect(0,0,0,0);
}
.resize-container {
    position: relative;
    display: inline-block;
    cursor: move;
    margin: 0 auto;
}
.resize-container img {
    display: block
}
.resize-container:hover img,
.resize-container:active img {
    outline: 2px dashed rgba(222,60,80,.9);
}
div[data-v-aa0cbe42]{
 z-index: 10;
}
</style>
