<template>
  <div>
    <v-expansion-panel v-model="panel" expand>
      <SurveyForm v-show="formShow"/>
      <SurveyList v-for="(survey, _id) in surveyList" v-bind:survey="survey" :key="_id"/>
    </v-expansion-panel>
    <v-layout class="addButton">
      <v-btn
        @click="addSurvey()"
        color="pink"
        dark
        fab
      >
        <v-icon>add</v-icon>
      </v-btn>
    </v-layout>
  <!-- <SurveyForm/> -->
</div>
</template>

<script>
/*eslint-disable */
import Vue from "vue";
import SurveyForm from "./SurveyForm.vue";
import SurveyList from './SurveyList.vue';
import store from '@/store.js'
import { Stud, Prof } from "@/api";
import { URL } from '@/plugins/api.config.js'
import io from 'socket.io-client';

Vue.component("SurveyForm", SurveyForm);
Vue.component("SurveyList", SurveyList);
export default {
  beforeCreate() {
    Stud.loadSurvey(this.$store.state.currentClass.classCode).then(res => {
      if (res.data === "false") 
        alert("설문 가져오기 실패")
      else {
        this.surveyList = res.data.surveyList;
        this.panel = new Array(res.data.surveyList.length).fill(false);
        this.elem = new Array(res.data.surveyList.length).fill(1);
        this.steps = []
        res.data.surveyList.forEach(element => {
          this.steps.push(element.surveyList.length);
        });
      }
    });
  },
  data () {
    return {
      socket: io(`${URL}:3000/survey`),
      icon: "mdi-plus-circle",
      radios: 'radio-1',
      panel: [],
      elem:[],
      steps:[],
      surveyList:[],
      formShow:false
    }
  },
  methods: {
    addSurvey(){
      this.formShow = true;
      this.panel = new Array(this.panel.length + 1).fill(false);
      this.panel[0] = true;
    }
  }
}
</script>
<style>
.addButton{
  display:block;
  width:100%;
  align-content: center;
  text-align: center;
}
</style>
