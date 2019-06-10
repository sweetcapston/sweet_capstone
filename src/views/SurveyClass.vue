<template >
  <div>
    <v-layout class="addButton" v-show="Identity==2 && !formShow">
      <v-icon class="add" @click="addSurvey()">add_circle</v-icon>
    </v-layout>
    <v-layout class="deleteButton" v-show="Identity==2 && formShow">
      <v-icon class="remove" @click="cancelSurvey()">remove_circle</v-icon>
    </v-layout>
    <v-expansion-panel v-if="Identity==1">
      <material-card color="metal" title="설문 리스트" text="Survey List" style="width:100%; margin-top:30px;">
      <StudentList
        v-for="n in surveyList.length"
        v-bind:survey="surveyList[n-1]"
        v-bind:answer_S="myAnswer_S[n-1]"
        v-bind:socket="socket"
        :key="n"
      />
      <div v-if="surveyList.length+ this.dataCheck < 1" style="padding-left:10px"><h4>등록된 설문이 없습니다.</h4></div>
      </material-card>
    </v-expansion-panel>
    <v-expansion-panel v-else>
      <material-card color="metal" class="material-card" title="설문 리스트" text="Survey List" style="width:100%; margin-top:30px;">
      <SurveyForm v-if="formShow"/>
      <SurveyList
        v-for="(survey, _id) in surveyList"
        v-bind:survey="survey"
        v-bind:socket="socket"
        :key="_id"
      />
      <div v-if="surveyList.length+ this.dataCheck < 1" style="padding-left:10px"><h4>등록된 설문이 없습니다.</h4></div>
      </material-card>
    </v-expansion-panel>
  </div>
</template>

<script>
/*eslint-disable */
import Vue from "vue";
import SurveyForm from "./SurveyForm.vue";
import SurveyList from "./SurveyList.vue";
import StudentList from "./StudentList.vue";
import store from "@/store.js";
import { Stud, Prof } from "@/api";
import { URL } from "@/plugins/api.config.js";
import io from "socket.io-client";

Vue.component("SurveyForm", SurveyForm);
Vue.component("SurveyList", SurveyList);
Vue.component("StudentList", StudentList);
export default {
  beforeCreate() {
    if (this.$store.state.Identity == 1) {
      Stud.loadSurvey(
        this.$store.state.currentClass.classCode,
        this.$store.state.userID
      ).then(res => {
        if (res.data === "false") alert("설문 가져오기 실패");
        else {
          const { surveyList, myAnswer_S } = res.data;
          this.surveyList = surveyList;
          this.myAnswer_S = myAnswer_S;
          this.elem = new Array(surveyList.length).fill(1);
          this.steps = [];
          surveyList.forEach(element => {
            this.steps.push(element.surveyList.length);
          });
        }
      });
    } else {
      Prof.loadSurvey(this.$store.state.currentClass.classCode).then(res => {
        if (res.data === "false") alert("설문 가져오기 실패");
        else {
          const { surveyList } = res.data;
          this.surveyList = surveyList;
          this.elem = new Array(surveyList.length).fill(1);
          this.steps = [];
          surveyList.forEach(element => {
            this.steps.push(element.surveyList.length);
          });
        }
      });
    }
  },
  created() {
    this.$EventBus.$on("sendSurvey", data => {
      this.formShow = false;
      this.surveyList.push(data)
    })
    this.$EventBus.$on("surveyEdit", data => {
      if(data !="-1") this.formShow = false;
    })
    this.socket.emit("channelJoin", {
      classCode: this.$store.state.currentClass.classCode,
      Identity: this.$store.state.Identity,
      userName: this.$store.state.userName,
      userID: this.$store.state.userID
    });
    this.socket.on("joinSuccess", data => {
      console.log("socket connect");
    });
    this.socket.on("delete", (data) => {
      this.surveyList.forEach(survey => {
        if(survey.SID == data.SID){
          this.surveyList.splice(this.surveyList.indexOf(survey), 1);
        }
      })
    })
  },
  data() {
    return {
      socket: io(`${URL}:3000/survey`),
      icon: "mdi-plus-circle",
      radios: "radio-1",
      Identity: this.$store.state.Identity,
      elem: [],
      steps: [],
      surveyList: [],
      completeList: [],
      formShow: false,
      dataCheck: 0
    };
  },
  methods: {
    // edited(editSurvey){
    //   for(let i=0; i<this.surveyList.length; i++ ){
    //     if(this.surveyList[i].SID == editSurvey.SID) {
    //       this.$set(this.surveyList, i, editSurvey);
    //     }
    //   }
    // },
    addSurvey() {
      this.formShow = !this.formShow;
      setTimeout(()=>{
        document.querySelector(".createSurvey .v-expansion-panel__header").click()
      },50)
      this.dataCheck = 2;
      this.$EventBus.$emit("surveyEdit", "-1")
    },
    cancelSurvey(){
      this.dataCheck = 0;
      this.formShow = !this.formShow;
    }
  },
  beforeRouteLeave(to, from, next) {
    this.socket.emit("diconnect");
    this.socket.disconnect();
    next();
  }
};
</script>
<style>
.addButton {
  display: block;
  width: 100%;
  align-content: center;
  text-align: center;
}
.deleteButton {
  display: block;
  width: 100%;
  align-content: center;
  text-align: center;
}
label {
  padding-left: 0% !important;
  padding-right: 5px;
}
.add {
  font-size: 40px;
  color: darkgreen !important;
}
.remove {
  font-size: 40px;
  color: crimson !important;
}
.v-input.v-input--selection-controls.v-input--radio-group.v-input--radio-group--column.theme--light {
  margin-top: 0px !important;
}
.v-input.v-input--selection-controls.v-input--checkbox.theme--light {
  margin-top: 0px;
}
.v-input.v-input--selection-controls.v-input--checkbox.theme--light
  > .v-input__control
  > .v-messages.theme--light {
  height: 0px !important;
  min-height: 0px;
}
.v-input.v-input--selection-controls.v-input--checkbox.theme--light
  > .v-input__control
  > .v-input__slot {
  padding-top: 0px;
  margin-bottom: 8px !important;
}
.crimson {
  background: crimson !important;
}
.addSample {
  flex: none;
}
.addSample > .v-input__control > .v-input__slot > label {
  cursor: pointer;
}

</style>
