<template>
  <v-expansion-panel-content class="createSurvey">
    <template v-slot:actions>
      <v-icon color="cyan ligten-1">$vuetify.icons.expand</v-icon>
    </template>
    <template v-slot:header>
      <v-text-field
        single-line
        label="제목을 입력하세요"
        color="cyan ligten-1"
        class="surveyName"
        @click.stop
      />
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
        <core-survey-steps
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
          @complete="completeSurvey()"
        />
      </v-stepper-items>
    </v-stepper>
    <v-tour name="surveyForm" :steps="guide"></v-tour>
  </v-expansion-panel-content>
</template>

<script>
/*eslint-disable */
import { Prof } from "@/api";
export default {
  name : "surveyForm",
  data() {
    return {
      guide: [
        {
          target: '.addButton',
          content: `설문를 생성할 수 있습니다!`,
          params: {
            placement: 'bottom',
            enableScrolling: false
          }
        },
        {
          target: '.surveyName',
          content: `<strong>제목을 입력하세요</strong>!`,
          params: {
            placement: 'bottom',
            enableScrolling: false
          }
        },
        {
          target: '.v-stepper__step__step.cyan.lighten-1',
          content: `문항 번호를 확인 하세요.`,
          params: {
            placement: 'bottom',
            enableScrolling: false
          }
        },
        {
          target: '.mdi-plus-circle',
          content: '더 많은 문항를 작성하세요.',
          params: {
            placement: 'bottom',
            enableScrolling: false
          }
        },
        {
          target: '[role=radiogroup] .v-radio.theme--light.cyan--text.text--ligten-1',
          content: '타입을 선택할 수 있습니다.',
          params: {
            placement: 'bottom',
            enableScrolling: false
          }
        },
        {
          target: '.surveyQuestion',
          content: '질문을 입력하세요.',
          params: {
            placement: 'bottom',
            enableScrolling: false
          }
        },
        {
          target: '.addSample',
          content: '보기를 추가 할 수 있습니다.',
          params: {
            placement: 'bottom',
            enableScrolling: false
          }
        },
        {
          target: '.v-btn--floating',
          content: '문항를 삭제할 수 있습니다.',
          params: {
            placement: 'bottom',
            enableScrolling: false
          }
        },
        {
          target: '.cyan lighten-1 white--text',
          content: '버튼을 눌러 다음 문항를 작성하세요.',
          params: {
            placement: 'bottom',
            enableScrolling: false
          }
        }
      ]
      ,
      e1: 1,
      card_datas: [
        {
          id: 1,
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
        },
        {
          id: 2,
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
        },
        {
          id: 3,
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
        }
      ],
      icon: "mdi-plus-circle",
      newID: 4
    };
  },
  mounted() {
    this.$tours['surveyForm'].start()
  },
  methods: {
    completeSurvey() {
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
        newSurvey = {
          surveyList: surveyList,
          classCode: classCode,
          date: date,
          public: true,
          active: false
        };
      } else {
        newSurvey = {
          surveyName: surveyName,
          surveyList: surveyList,
          classCode: classCode,
          date: date,
          public: true,
          active: false
        };
      }
      Prof.surveyCreate(newSurvey).then(res => {
        if (res.data) {
          this.$emit("childs-event", true);
          window.history.go(0);
        }
      });
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
