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
        <core-survey-edit-steps
          v-for="(card_data, n) in card_datas"
          :key="card_data.id"
          :step="n+1"
          class="listItem"
          v-bind:n="n"
          v-bind:steps="card_datas.length"
          v-bind:card_data="card_data"
          v-bind:survey="survey.surveyList[n]"
          v-bind:SID="survey.SID"
          @remove="deleteStep(n)"
          @preStep="preStep(n+1)"
          @nextStep="nextStep(n+1)"
          @edit="editSurvey()"
        />
      </v-stepper-items>
    </v-stepper>
</template>

<script>
/*eslint-disable */
import { Prof } from "@/api";
export default {
  created() {
    let i = 0
    for(i; i<this.survey.surveyList.length;i++){
        let samplestype1=[]
        let samplestype2 = []
        if(this.survey.surveyList[i].surveyType !=3){
            for(let j = 0; j<this.survey.surveyList[i].content.length;j++){
                samplestype1.push({id:j+1})
                samplestype2.push({id:j+1001})
            }
        }
         this.card_datas.push({
            id:i+1,
            type:`${this.survey.surveyList[i].surveyeType}`,
            samplestype1:samplestype1,
            samplestype2:samplestype2
        })
    }
    this.newID = i+1;
  },
  props: {
    survey: Object
  },
  data() {
    return {
        e1: 1,
        surveyName:"",
        card_datas: [],
        classCode:this.$store.state.currentClass.classCode,
        newID: 0,
    }
  },
  methods: {
    editSurvey() {
        let moment = require("moment");
        moment.locale("ko");
        const surveyName = document.querySelector(".surveyName input").value;
        const classCode = this.$store.state.currentClass.classCode;
        const date = moment().format("LLL");
        const surveyList = [];

        for (var j = 0; j < this.card_datas.length; j++) {
            let surveyType = document.querySelectorAll(
            ".surveyType input[type='radio']:checked"
            )[j].value;
            let surveyQuestion = document.querySelectorAll(
            ".listItem .surveyQuestion input[type='text']"
            )[j];
            if (surveyQuestion.value == "") {
            this.e1 = j + 1;
            alert("질문이 입력되지 않았습니다.");
            setTimeout(() => surveyQuestion.focus(), 50);
            return;
            }
            surveyQuestion = surveyQuestion.value;
            let content = [];
            let doc;
            let count;
            switch (surveyType) {
            case "1":
                doc = document
                .querySelectorAll(".listItem .surveyQuestion")
                [j].nextElementSibling.querySelectorAll(`.type1_${j + 1}`);
                for (let i = 0; i < doc.length; i++) {
                if (doc[i].querySelector("input").value == "") {
                    this.e1 = j + 1;
                    alert("입력되지 않은 항목이 있습니다.");
                    setTimeout(() => doc[i].querySelector("input").focus(), 50);
                    return;
                }
                content.push(doc[i].querySelector("input").value);
                }
                count = new Array(doc.length).fill(0);
                break;
            case "2":
                doc = document
                .querySelectorAll(".listItem .surveyQuestion")
                [j].nextElementSibling.querySelectorAll(`.type2_${j + 1}`);
                for (let i = 0; i < doc.length; i++) {
                if (doc[i].querySelector("input").value == "") {
                    this.e1 = j + 1;
                    alert("입력되지 않은 항목이 있습니다.");
                    setTimeout(() => doc[i].querySelector("input").focus(), 50);
                    return;
                }
                content.push(doc[i].querySelector("input").value);
                }
                count = new Array(doc.length).fill(0);
                break;
            case "3":
                doc = document.querySelector("textarea").value;
                content.push(doc);
                count = 1;
                break;
            }
            surveyList.push({
              surveyType: parseInt(surveyType),
              surveyQuestion: surveyQuestion,
              content: content,
              count: count
            });
        }
        let newSurvey;
        if (surveyName == "") {
            surveyName="이름없음"
        } 
        console.log(surveyList)
        newSurvey = {
          _id:this.survey._id,
          public:this.survey.public,
          active:this.survey.active,
          surveyName: surveyName,
          surveyList: surveyList,
          classCode: classCode,
          SID: this.survey.SID,
          date: date,
        };
        if(confirm("기존응답이 모두 삭제됩니다. \n수정하시겠습니까?")){
            Prof.surveyEdit(newSurvey).then(res => {
                if(res.data) this.$emit("edited",res.data)
            });
        }
      
    },
    addStep(n) {
      this.card_datas.push({
        id: this.newID++,
        type: "1",
        samplestype1: [
          {
            id: 1
          }
        ],
        samplestype2: [
          {
            id: 1001
          }
        ]
      });
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
.newSurvey:hover {
  background: cyan;
}
.surveyName > .v-input__control > .v-text-field__details {
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
.surveyType > .v-input__control > .v-input__slot {
  margin-top: 10px;
  margin-left: 5px;
}
.addSample {
  margin-top: 20px;
}
</style>
