<template>
  <div>
    <v-layout class="addButton" v-show="Identity==2 && !formShow">
      <v-icon class="add" @click="addQuiz()"
      >add_circle</v-icon>
    </v-layout>

    <v-layout class="addButton" v-show="Identity==2 && formShow">
      <v-icon class="remove" @click="addQuiz()"
      >remove-circle</v-icon>
    </v-layout>

    <v-expansion-panel v-if="Identity==1" v-model="panel" expand>
      <StudentQuizList v-for="(quiz, _id) in quizList" v-bind:quiz="quiz" :key="_id" />
    </v-expansion-panel>

    <v-expansion-panel v-else v-model="panel" expand>
      <QuizForm v-show="formShow" @childs-event="parentsMethod" />
      <QuizList v-for="(quiz, _id) in quizList" v-bind:quiz="quiz" :key="_id" />
    </v-expansion-panel>
  </div> 
</template>

<script>
import Vue from "vue";
import QuizForm from "./QuizForm.vue";
import QuizList from "./QuizList.vue";
import StudentQuizList from "./StudentQuizList.vue";
import store from '@/store.js';
import { Stud, Prof } from "@/api";
import { URL } from "@/plugins/api.config.js";
import io from "socket.io-client";

Vue.component("QuizForm", QuizForm);
Vue.component("QuizList", QuizList);
Vue.component("StudentQuizList", StudentQuizList);
export default {
  beforeCreate() {
    if(this.$store.state.Identity == 1) {
      Stud.loadQuiz(this.$store.state.currentClass.classCode, this.$store.state.userID).then(res => {
        if(res.data === "false")
          alert("퀴즈 가져오기 실패")
        else {
          this.quizList = res.data.quizList;
          this.panel = new Array(res.data.quizList.length).fill(false);
          this.elem = new Array(res.data.quizList.length).fill(1);
          this.steps = []
          res.data.quizList.forEach(element => {
            this.steps.push(element.quizList.length);
          });
        }
      });
    }
    else {
      Prof.loadQuiz(this.$store.state.currentClass.classCode).then(res => {
        if(res.data === "false")
          alert("퀴즈 가져오기 실패")
        else {
          this.quizList = res.data.quizList;
          this.panel = new Array(res.data.quizList.length).fill(false);
          this.elem = new Array(res.data.quizList.length).fill(1);
          this.steps = []
          res.data.quizList.forEach(element => {
            this.steps.push(element.quizList.length);
          });
        }
      });
    }    
  },
  data() {
    return {
      icon: "mdi-plus-circle",
      radios: '1',
      panel: [],
      Identity: this.$store.state.Identity,
      elem: [],
      steps: [],
      quizList: [],
      formShow: false
    }
  },
  method: {
    addQuiz() {
      this.formShow = !this.formShow;
      if(this.formShow) {
        this.panel = new Array(this.panel.length + 1).fill(false);
        this.panel[0] = true;
      }
    },
    parentsMethod: function(active) {
      this.formShow = false;
    }
  }
}
</script>
      