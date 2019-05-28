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
        <template v-for="n in steps">
          <v-stepper-step
            :key="`${n}-step`"
            :complete="e1 > n"
            :step="n"
            editable
            color="cyan lighten-1"
          >문항 {{ n }}</v-stepper-step>

          <v-divider v-if="n !== steps" :key="n"></v-divider>
        </template>

        <template>
          <v-icon class="cyan lighten-1 white--text" @click="addStep()">mdi-plus-circle</v-icon>
        </template>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content v-for="n in steps" :key="`${n}-content`" :step="n" class="listItem">
          <v-card color="grey lighten-3" height="250px" style="height:100%">
            <v-textarea box label="Image" value="이미지가 들어갈 공간.">
            </v-textarea>
          </v-card>
          <v-card color="grey lighten-3" height="50px" class="typeCard">
            <v-radio-group v-model="type[n-1]" :mandatory="false" class="quizType" row>
              <v-radio label="객관식" value="1" color="cyan ligten-1" select></v-radio>
              <v-radio label="객관식 (복수 응답 가능)" value="2" color="cyan ligten-1"></v-radio>
              <v-radio label="주관식" value="3" color="cyan ligten-1"></v-radio>
            </v-radio-group>
          </v-card>

          <v-card class="mb-5" color="grey lighten-3">
            <v-btn absolute dark fab top right class="crimson" @click="deleteStep()">
              <v-icon>remove</v-icon>
            </v-btn>

            <v-container>
              <v-text-field
                label="질문을 입력하세요"
                single-line
                color="cyan ligten-1"
                class="quizQuestion"
              ></v-text-field>
              <v-layout>
                <v-flex md3 style="padding:2px">
                  <v-text-field :id="'correct'+ `${n-1}`" color="cyan ligten-1" label="정답"/>
                </v-flex>
                <v-flex md3 style="padding:2px">
                  <v-text-field :id="'point'+ `${n-1}`" color="cyan ligten-1" label="배점"/>
                </v-flex>
              </v-layout>
              <div v-if="type[n-1] === '1'">
                <template v-for="i in samplestype1[n-1].length">
                  <v-layout :key="i">
                    <v-text-field
                      class="type1"
                      prepend-icon="mdi-checkbox-blank-circle-outline"
                      label="보기를 입력하세요"
                      single-line
                      color="rgb(111, 111, 111)"
                    ></v-text-field>
                    <v-spacer/>
                    <v-icon @click="deleteType1(i)">mdi-close</v-icon>
                  </v-layout>
                </template>

                <v-layout v-if="type[n-1] === '1'" @click="addType1(n)">
                  <v-icon>mdi-plus</v-icon>
                  <v-input label="보기 추가" class="addSample"></v-input>
                </v-layout>
              </div>

              <div v-if="type[n-1] === '2'">
                <template class="type2" v-for="j in samplestype2[n-1].length">
                  <v-layout :key="1000+j">
                    <v-text-field
                      class="type2"
                      prepend-icon="mdi-checkbox-blank-outline"
                      label="보기를 입력하세요"
                      single-line
                      color="rgb(111, 111, 111)"
                    ></v-text-field>
                    <v-spacer/>
                    <v-icon @click="deleteType2(j)">mdi-close</v-icon>
                  </v-layout>
                </template>

                <v-layout v-if="type[n-1] === '2'" @click="addType2(n)">
                  <v-icon>mdi-plus</v-icon>
                  <v-input label="보기 추가" class="addSample"></v-input>
                </v-layout>
              </div>

              <v-layout v-if="type[n-1] === '3'">
                <v-textarea solo flat outline color="cyan lighten-1"></v-textarea>
              </v-layout>
            </v-container>
          </v-card>

          <v-layout justify-space-between>
            <v-btn class="cyan lighten-1 white--text" @click="preStep(n)">Pre</v-btn>

            <v-btn
              v-if="n !== steps"
              :key="n"
              class="cyan lighten-1 white--text"
              @click="nextStep(n)"
            >Next</v-btn>
            <v-btn
              v-if="n === steps"
              :key="n"
              class="cyan lighten-1 white--text"
              @click="completeQuiz()"
            >Complete</v-btn>
          </v-layout>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-expansion-panel-content>
</template>

<script>
/*eslint-disable */
import store from "@/store.js";
import { Prof } from "@/api";
export default {
  data() {
    return {
      e1: 1,
      steps: 3,
      icon: "mdi-plus-circle",
      type: new Array(3).fill("1"),
      samplestype1: [[1], [1], [1]],
      samplestype2: [[1], [1], [1]]
    };
  },
  watch: {
    steps(val) {
      if (this.e1 > val) {
        this.e1 = val;
      }
    }
  },
  methods: {
    completeQuiz() {
      let moment = require("moment");
      moment.locale("ko");
      const quizName = document.querySelector(".quizName input").value;
      const classCode = this.$store.state.currentClass.classCode;
      const date = moment().format("LLL");
      const quizList = [];

      for (var j = 0; j < this.steps; j++) {
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
      this.steps = this.steps + 1;
      this.type.push("1");
      this.samplestype1.push([1]);
      this.samplestype2.push([1]);
    },
    deleteStep(n) {
      this.steps = this.e1 - 1;
      this.type.pop();
      this.samplestype1.pop();
      this.samplestype2.pop();
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
    addType1(n) {
      this.samplestype1[n - 1].push(1);
    },
    addType2(n) {
      this.samplestype2[n - 1].push(1);
    },
    deleteType1(i) {
      this.samplestype1 = this.samplestype1 - 1;
    },
    deleteType2(j) {
      this.samplestype2 = this.samplestype2 - 1;
    }
  }
};
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
</style>