<template>
  <div>
    <v-layout class="addButton" v-show="Identity==2 && !formShow">
      <v-icon class="add" @click="addQuiz()">add_circle</v-icon>
    </v-layout>
    <v-layout class="addButton" v-show="Identity==2 && formShow">
      <v-icon class="remove" @click="cancelQuiz()">remove_circle</v-icon>
    </v-layout>
    <v-expansion-panel v-if="Identity==1" >
      <material-card color="metal" title="퀴즈 리스트" text="Quiz List" style="width:100%; margin-top:30px;">
      <StudentQuizList
        v-for="n in quizList.length"
        v-bind:quiz="quizList[n-1]"
        v-bind:answer_Q="myAnswer_Q[n-1]"
        v-bind:socket="socket"
        :key="n"
      />
      <div v-if="quizList.length<1" style="padding-left:10px"><h4>등록된 퀴즈가 없습니다.</h4></div>
      </material-card>
    </v-expansion-panel>
    <v-expansion-panel v-else >
      <material-card color="metal" class="material-card" title="퀴즈 리스트" text="Quiz List" style="width:100%; margin-top:30px;">
      <QuizForm v-if="formShow"/>
      <QuizList
        v-for="(quiz, _id) in quizList"
        v-bind:quiz="quiz"
        v-bind:socket="socket"
        :key="_id"
      />
      <div v-if="quizList.length + this.dataCheck <1" style="padding-left:10px"><h4>등록된 퀴즈가 없습니다.</h4></div>
      </material-card>
    </v-expansion-panel>
  </div>
</template>

<script>
/*eslint-disable */
import Vue from "vue";
import QuizForm from "./QuizForm.vue";
import QuizList from "./QuizList.vue";
import StudentQuizList from "./StudentQuizList.vue";
import store from "@/store.js";
import { Stud, Prof } from "@/api";
import { URL } from "@/plugins/api.config.js";
import io from "socket.io-client";

Vue.component("QuizForm", QuizForm);
Vue.component("QuizList", QuizList);
Vue.component("StudentQuizList", StudentQuizList);
export default {
  beforeCreate() {
    if (this.$store.state.Identity == 1) {
      Stud.loadQuiz(
        this.$store.state.currentClass.classCode,
        this.$store.state.userID
      ).then(res => {
        if (res.data === "false") alert("퀴즈 가져오기 실패");
        else {
          const { quizList, myAnswer_Q } = res.data;
          this.quizList = quizList;
          this.myAnswer_Q = myAnswer_Q;
          this.elem = new Array(quizList.length).fill(1);
          this.steps = [];
          quizList.forEach(element => {
            this.steps.push(element.quizList.length);
          });
        }
      });
    } else {
      Prof.loadQuiz(this.$store.state.currentClass.classCode).then(res => {
        if (res.data === "false") alert("설문 가져오기 실패");
        else {
          const { quizList } = res.data;
          this.quizList = quizList;
          this.elem = new Array(quizList.length).fill(1);
          this.steps = [];
          quizList.forEach(element => {
            this.steps.push(element.quizList.length);
          });
        }
      });
    }
  },
  created() {
    this.$EventBus.$on("sendQuiz", data => {
      this.formShow = false;
      this.quizList.push(data)
    })
    this.$EventBus.$on("edit", data => {
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
      this.quizList.forEach(quiz => {
        if(quiz.QID == data.QID){
          this.quizList.splice(this.quizList.indexOf(quiz), 1);
        }
      })
    })
  },
  data() {
    return {
      socket: io(`${URL}:3000/quiz`),
      icon: "mdi-plus-circle",
      radios: "radio-1",
      Identity: this.$store.state.Identity,
      elem: [],
      steps: [],
      quizList: [],
      completeList: [],
      formShow: false,
      dataCheck: 0
    };
  },
  methods: {
    // edited(editQuiz){
    //   for(let i=0; i<this.quizList.length; i++ ){
    //     if(this.quizList[i].QID == editQuiz.QID) {
    //       this.$set(this.quizList, i, editQuiz);
    //     }
    //   }
    // },
    addQuiz() {
      this.formShow = !this.formShow;
      setTimeout(()=>{
        document.querySelector(".createQuiz .v-expansion-panel__header").click()
      },50)
      this.dataCheck =2;
      this.$EventBus.$emit("edit", "-1")
    },
    cancelQuiz(){
      this.formShow = !this.formShow;
      this.dataCheck = 0;
    },
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
.addSample{
  flex:none;
}
.addSample > .v-input__control > .v-input__slot > label{
  cursor: pointer;
}
</style>
