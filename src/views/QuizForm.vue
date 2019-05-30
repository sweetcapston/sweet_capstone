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
  </v-expansion-panel-content>
</template>

<script>
/*eslint-disable */
import { Prof } from "@/api";
import { maxHeaderSize } from 'http';


export default {
  data() {
    return {
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
      moment.locale("ko");
      const quizName = document.querySelector(".quizName input").value;
      const classCode = this.$store.state.currentClass.classCode;
      const date = moment().format("LLL");
      const quizList = [];

      for (var j = 0; j < this.card_datas.length; j++) {
        const quizType = document.querySelectorAll(
          ".quizType input[type='radio']:checked"
        )[j].value;
        const quizQuestion = document.querySelectorAll(
          ".listItem .quizQuestion input[type='text']"
        )[j].value;
        let content = [];
        let point = [];
        let correct;
        let doc;
        let count;
        point.push(document.querySelector(`#point${j}`).value);
        correct = document.querySelector(`#correct${j}`).value;
        switch (quizType) {
          case "1":
            doc = document.querySelectorAll(".type1");
            for (let i = 0; i < doc.length; i++) {
              content.push(doc[i].querySelector("input").value);
            }
            count = new Array(doc.length).fill(0);
            break;
          case "2":
            doc = document.querySelectorAll(".type2");
            for (let i = 0; i < doc.length; i++) {
              content.push(doc[i].querySelector("input").value);
            }
            count = new Array(doc.length).fill(0);
            break;
          case "3":
            doc = document.querySelector("textarea").value;
            content.push(document.querySelector("textarea").value);
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
        samplestype1:1,
        samplestype2:1
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
</style>