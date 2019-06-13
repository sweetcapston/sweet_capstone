<template>
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
        <core-quiz-edit-steps 
          v-for="(card_data, n) in card_datas"
          :key="card_data.id"
          :step="n+1" 
          class="listItem"
          v-bind:n="n"
          v-bind:steps="card_datas.length"
          v-bind:card_data="card_data" 
          v-bind:quiz="quiz.quizList[n]"
          v-bind:QID="quiz.QID"
          @remove="deleteStep(n)"
          @preStep="preStep(n+1)"
          @nextStep="nextStep(n+1)"
          @edit="editQuiz()"
        >
        </core-quiz-edit-steps>
      </v-stepper-items>
    </v-stepper>
</template>

<script>
/*eslint-disable */
import { Prof } from "@/api";

export default {
  created() {
    let i = 0
    for(i; i<this.quiz.quizList.length;i++){
        let samplestype1=[]
        let samplestype2 = []
        if(this.quiz.quizList[i].quizType !=3){
            for(let j = 0; j<this.quiz.quizList[i].content.length;j++){
                samplestype1.push({id:j+1})
                samplestype2.push({id:j+1001})
            }
        }
         this.card_datas.push({
            id:i+1,
            type:`${this.quiz.quizList[i].quizType}`,
            samplestype1:samplestype1,
            samplestype2:samplestype2
        })
    }
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
    };
  },
  props: {
    quiz: Object
  },
  methods: {
    editQuiz() {
      let moment = require("moment");
      const quizName = document.querySelector(".quizName input").value;
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
        let point = pointDoc.value;
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
            correct = doc.value;
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
      let editQuiz;
      if(quizName == ""){
        quizName = "이름없음"
      } 
      
      editQuiz = {
        _id:this.quiz._id,
        public:this.quiz.public,
        active:this.quiz.active,
        minutes:this.quiz.minutes,
        quizName: quizName,
        classCode:this.classCode,
        quizList: quizList,
        QID: this.quiz.QID,
        date: date,
      };
      if(confirm("기존응답이 모두 삭제됩니다. \n수정하시겠습니까?")){
        Prof.quizEdit(editQuiz).then(res => {
          if(res.data){
            // this.$emit("edited",res.data)
            window.history.go(0)
          }
        })
      }
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
  }
}
</script>