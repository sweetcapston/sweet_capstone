<template>
  <v-expansion-panel-content class="createSurvey">
    <template v-slot:actions>
      <v-icon color="cyan ligten-1">$vuetify.icons.expand</v-icon>
    </template>
    <template
      v-slot:header>
      <v-text-field
        single-line
        label="제목을 입력하세요"
        color="cyan ligten-1"
        class="surveyName"
        @click.stop
      />
    </template>


    <div
      v-for="n in card_datas.length"
      :key="`${n}-content`"
      :remove="card_datas.splice(n - 1, 1)"
      v-show="e1==n"
      class="listItem"
    >
      <card-item v-bind:card_data="card_datas[n-1]"/>

      <v-layout justify-space-between>
        <v-btn 
          class="cyan lighten-1 white--text"
          @click="preStep(n)"
        >
          Pre
        </v-btn>

        <v-btn 
          v-if="n !== card_datas.length" 
          :key="n"
          class="cyan lighten-1 white--text"
          @click="nextStep(n)"
        >
          Next
        </v-btn>
        <v-btn
          v-if="n === card_datas.length" 
          :key="n"
          class="cyan lighten-1 white--text"
          @click="completeSurvey()"
        >
          Complete
        </v-btn>
      </v-layout>
    </div>
  </v-expansion-panel-content>
</template>

<script>
/*eslint-disable */
import Vue from 'vue'
import store from '@/store.js'
import CardItem from './CardItem';
import { Prof } from "@/api";
Vue.component("card-item", CardItem)
export default {
  data () {
    return {
      e1: 1,
      card_datas:[{
        type:1,
        samplestype1:1,
        samplestype2:1
      }],
      icon: "mdi-plus-circle"
    };
  },
  methods: {
    completeSurvey() {
      // let moment = require('moment');
      // moment.locale('ko');
      // const surveyName = document.querySelector('.surveyName input').value;
      // const classCode = this.$store.state.currentClass.classCode;
      // const date = moment().format("LLL");
      // const surveyList = []
      
      // for(var j = 0; j<this.steps; j++){
      //   const surveyType = document.querySelectorAll(".surveyType input[type='radio']:checked")[j].value;
      //   const surveyQuestion = document.querySelectorAll(".listItem .surveyQuestion input[type='text']")[j].value;
      //   let content = [];
      //   let doc;
      //   let count;
      //   switch(surveyType){
      //     case "1": 
      //       doc = document.querySelectorAll('.type1')
      //       for(let i = 0 ; i<doc.length; i++)              
      //         content.push(doc[i].querySelector('input').value);
      //       count = new Array(doc.length).fill(0)
      //       break;
      //     case "2": 
      //       doc = document.querySelectorAll('.type2')
      //       for(let i = 0 ; i<doc.length; i++)              
      //         content.push(doc[i].querySelector('input').value);
      //       count = new Array(doc.length).fill(0)
      //       break;
      //     case "3": 
      //       doc = document.querySelector('textarea').value;
      //       content.push(document.querySelector('textarea').value);
      //       count = 1;
      //       break;
      //   }
      //   surveyList.push({
      //     surveyType: parseInt(surveyType), 
      //     surveyQuestion: surveyQuestion, 
      //     content:content, 
      //     count:count
      //   })
      // }
      // const newSurvey = {
      //   surveyName:surveyName,
      //   surveyList:surveyList,
      //   classCode:classCode,
      //   date:date,
      //   public:true,
      //   active:false,
      // }
      
      // Prof.surveyCreate(newSurvey)
      // .then(res => {
      //   if(res.data){
      //     this.$emit("childs-event",true)
      //     window.history.go(0);
      //   }
      // });
    },
    addStep(n) {
      this.steps = this.steps + 1
      this.type.push('1');
      this.samplestype1.push([1])
      this.samplestype2.push([1])
    },
    deleteStep(e) {
      console.log(e)
      this.steps -= 1
      this.e1 -= 1
      this.samplestype1.splice(index, 1)
      this.samplestype2.splice(index, 1)
    },
    nextStep(n) {
      this.e1 = n + 1
    },
    preStep(n) {
      if (1 === this.steps) {
        this.e1 = 1
      } else {
        this.e1 = n - 1
      }
    },
    // addType1(n) {
    //   this.samplestype1[n-1].push(1)
    // },
    // addType2(n) {
    //   this.samplestype2[n-1].push(1)
    // },
    // deleteType1(i) {
    //   this.samplestype1 = this.samplestype1 - 1
    // },
    // deleteType2(j) {
    //   this.samplestype2 = this.samplestype2 - 1
    // }
  }
}
</script>
<style>
.mdi.mdi-plus-circle:hover {
  background:aqua !important;
}
.mdi.mdi-plus-circle:active {
  box-shadow: 0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12);
}
.newSurvey:hover {
  background: cyan;
}
.surveyName > .v-input__control > .v-text-field__details{
  height:0px;
  margin-bottom:0px;
}
.addSample > .v-input__control > .v-message {
  height: 0px;
  margin: 0px;
}
.typeCard > .v-input__control > .v-message {
  height: 0px;
  margin: 0px;
}
.surveyType > .v-input__control > .v-input__slot{
  margin-top: 10px;
  margin-left: 5px;
}
.addSample{
  margin-top:20px;
}
</style>