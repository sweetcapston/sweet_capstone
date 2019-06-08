<template>
  <v-container>
    <template v-slot:actions>
      <v-icon color="teal">done</v-icon>
    </template>

    <template v-slot:header>
      <v-text-field
        single-line
        label="제목을 입력하세요"
        color="cyan ligten-1"
        v-model="quizName"
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
  </v-container>
</template>

<script>
/*eslint-disable */
import { Prof } from "@/api";

export default {
  created() {
      console.log(this.quiz)
    this.quizName = this.quiz.quizName;
    let i = 0
    for(i; i<this.quiz.quizList.length;i++){
        let samplestype1=[]
        let samplestype2 = []
        for(let j = 0; j<this.quiz.quizList[i].content.length;j++){
            samplestype1.push({id:j+1})
            samplestype2.push({id:j+1001})
        }
        this.card_datas.push({
            id:i+1,
            type:`${this.quiz.quizList[i].quizeType}`,
            samplestype1:samplestype1,
            samplestype2:samplestype2
        })
    }
    console.log(this.card_datas)
    this.newID = i+1;
  },
  name: "quizEdit",
  data() {
    return {
      e1: 1,
      quizName:"",
      card_datas: [],
      classCode:this.$store.state.currentClass.classCode,
      newID: 0,
      icon: "mdi-plus-circle",

    };
  },
  props: {
    quiz: Object
  },
  methods: {
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
  }
}
</script>