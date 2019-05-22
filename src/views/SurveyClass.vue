<template>
  <div>
    <v-layout class="addButton" v-show="Identity==2 && !formShow">

      <v-icon class="add" @click="addSurvey()"
      >add_circle</v-icon>
        
    </v-layout>
    <v-layout class="addButton" v-show="Identity==2 && formShow">
      <v-icon class="remove" @click="addSurvey()"
      >remove_circle</v-icon>
    </v-layout>
    <v-expansion-panel v-if="Identity==1" v-model="panel" expand>
      <StudentList v-for="n in surveyList.length" v-bind:survey="surveyList[n-1]" v-bind:answer_S="myAnswer_S[n-1]" v-bind:socket="socket" :key="n"/>
    </v-expansion-panel>
    <v-expansion-panel v-else v-model="panel" expand>
      <SurveyForm v-show="formShow" @childs-event="parentsMethod"/>
      <SurveyList v-for="(survey, _id) in surveyList" v-bind:survey="survey"  v-bind:socket="socket" :key="_id"/>
    </v-expansion-panel>
  </div>
</template>

<script>
/*eslint-disable */
import Vue from "vue";
import SurveyForm from "./SurveyForm.vue";
import SurveyList from './SurveyList.vue';
import StudentList from "./StudentList.vue";
import store from '@/store.js'
import { Stud, Prof } from "@/api";
import { URL } from '@/plugins/api.config.js'
import io from 'socket.io-client';

Vue.component("SurveyForm", SurveyForm);
Vue.component("SurveyList", SurveyList);
Vue.component("StudentList", StudentList);
export default {
  beforeCreate() {
    if(this.$store.state.Identity==1){
      Stud.loadSurvey(this.$store.state.currentClass.classCode, this.$store.state.userID).then(res => {
        if (res.data === "false") 
          alert("설문 가져오기 실패")
        else {
          const {surveyList, myAnswer_S} = res.data;
          this.surveyList = surveyList;
          this.myAnswer_S = myAnswer_S;
          this.panel = new Array(surveyList.length).fill(false);
          this.elem = new Array(surveyList.length).fill(1);
          this.steps = []
          surveyList.forEach(element => {
            this.steps.push(element.surveyList.length);
          });
        }
      });
    } else {
      Prof.loadSurvey(this.$store.state.currentClass.classCode).then(res => {
        if (res.data === "false") 
          alert("설문 가져오기 실패")
        else {
          const {surveyList} = res.data;
          this.surveyList = surveyList;
          this.panel = new Array(surveyList.length).fill(false);
          this.elem = new Array(surveyList.length).fill(1);
          this.steps = []
          surveyList.forEach(element => {
            this.steps.push(element.surveyList.length);
          });
        }
      });
    }
  },
  created() {
    this.socket.emit("channelJoin", {
      classCode: this.$store.state.currentClass.classCode, 
      Identity: this.$store.state.Identity, 
      userName: this.$store.state.userName, 
      userID: this.$store.state.userID
    })
    this.socket.on("joinSuccess", data=>{
      console.log("socket connect")
    })
    this.socket.on("survey", (data) => {
      console.log(data);
    })
  },
  data () {
    return {
      socket: io(`${URL}:3000/survey`),
      icon: "mdi-plus-circle",
      radios: 'radio-1',
      panel: [],
      Identity:this.$store.state.Identity,
      elem:[],
      steps:[],
      surveyList:[],
      completeList:[],
      formShow:false
    }
  },
  methods: {
    addSurvey(){
      this.formShow = !this.formShow;
      if(this.formShow){
        this.panel = new Array(this.panel.length + 1).fill(false);
        this.panel[0] = true;
      } 
    },
    parentsMethod: function(active) {
      this.formShow = false;
    },
  },
  beforeRouteLeave (to, from, next) {
    this.socket.emit("diconnect");
    this.socket.disconnect();
    next()
  },
}
</script>
<style>
.addButton{
  display:block;
  width:100%;
  align-content: center;
  text-align: center;
}
label{
  padding-left:0% !important;
  padding-right:5px;
}
.add{
  font-size:40px;
  color:darkgreen !important;
}
.remove{
  font-size:40px;
  color: crimson !important;
}
.v-input.v-input--selection-controls.v-input--radio-group.v-input--radio-group--column.theme--light{
  
  margin-top:0px !important;
}
.v-input.v-input--selection-controls.v-input--checkbox.theme--light{
  margin-top:0px;
}
.v-input.v-input--selection-controls.v-input--checkbox.theme--light > .v-input__control> .v-messages.theme--light{
  height:0px !important;
  min-height: 0px;
}
.v-input.v-input--selection-controls.v-input--checkbox.theme--light > .v-input__control> .v-input__slot{
  padding-top:0px;
  margin-bottom: 8px !important;
}
.crimson{
  background:crimson !important;
}
</style>
