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
      <v-btn 
        class="cyan lighten-1 white--text newSurvey"
        @click="completeSurvey()"
      >
        SAVE
      </v-btn>
    </template>

    <v-stepper v-model="e1">
      <v-stepper-header>
        <template v-for="n in steps">
          <v-stepper-step
            :key="`${n}-step`"
            :complete="e1 > n"
            :step="n"
            editable
            color="cyan lighten-1"
          >
            문항 {{ n }}
          </v-stepper-step>
          <v-divider v-if="n !== steps" :key="n"/>        
        </template>
        <template>
          <v-icon
          class="cyan lighten-1 white--text"
          @click="addStep()"
          >mdi-plus-circle</v-icon>
        </template>        
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content
          v-for="n in steps"
          :key="`${n}-content`"
          :step="n"
          class="listItem"
        >
          <v-card
            class="typeCard"
            color="grey lighten-3"            
          >
            <v-radio-group v-model="type" :mandatory="false" class="surveyType" row>
              <v-radio label="객관식" value="1" color="cyan ligten-1" select></v-radio>
              <v-radio label="객관식 (복수 응답 가능)" value="2" color="cyan ligten-1"></v-radio>
              <v-radio label="주관식" value="3" color="cyan ligten-1"></v-radio>
            </v-radio-group>
          </v-card>

          <v-card
            class="mb-5"
            color="grey lighten-3"
          >
            <v-btn
              absolute
              dark
              fab
              top
              right
              color="pink"
              @click="deleteStep()"
            >
              <v-icon>remove</v-icon>
            </v-btn>

            <v-container>
              <v-text-field                
                label="질문을 입력하세요"
                single-line
                color="cyan ligten-1"
                class="surveyQuestion"
              />
              <template v-if="type === '1'">
                <template v-for="i in samplestype1">
                  <v-layout
                    :key="i"
                  >
                    <v-text-field 
                      prepend-icon="mdi-checkbox-blank-circle-outline"
                      label="보기를 입력하세요"
                      single-line
                      color="rgb(111, 111, 111)"
                    ></v-text-field>
                    <v-spacer />
                    <v-icon
                      @click="deleteType1(i)"
                    >mdi-close</v-icon>
                  </v-layout>
                </template>
            
                <v-layout>
                  <v-icon
                    @click="addType1(i)"
                  >mdi-plus</v-icon>
                  <v-input
                    label="보기 추가"
                  ></v-input>               
                </v-layout>
              </template>
              
              <template v-if="type === '2'">
                <template v-for="j in samplestype2">
                  <v-layout
                    :key="j"
                  >
                    <v-text-field
                      prepend-icon="mdi-checkbox-blank-outline"
                      label="보기를 입력하세요"
                      single-line
                      color="rgb(111, 111, 111)"
                    ></v-text-field>
                    <v-spacer />
                    <v-icon
                      @click="deleteType2(j)"
                    >mdi-close</v-icon>  
                  </v-layout>
                </template>
              
                <v-layout>
                  <v-icon
                    @click="addType2(j)"
                  >mdi-plus</v-icon>
                  <v-input
                    label="보기 추가"
                    class="addSample"
                  ></v-input>             
                </v-layout>
              </template> 

              <v-layout v-if="type === '3'">
                <v-textarea
                  solo
                  flat
                  outline 
                  label="답을 입력하세요"
                  color="cyan lighten-1"
                ></v-textarea>
              </v-layout>
            </v-container>
          </v-card>

          <v-layout justify-space-between>
            <v-btn 
              class="cyan lighten-1 white--text"
              @click="preStep(n)"
            >
              Pre
            </v-btn>

            <v-btn 
              v-if="n !== steps" 
              :key="n"
              class="cyan lighten-1 white--text"
              @click="nextStep(n)"
            >
              Next
            </v-btn>
            <v-btn
              v-if="n === steps" 
              :key="n"
              class="cyan lighten-1 white--text"
              @click="completeSurvey()"
            >
              Complete
            </v-btn>
          </v-layout>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-expansion-panel-content>
</template>

<script>
/*eslint-disable */
import store from '@/store.js'
import { Prof } from "@/api";
export default {
  data () {
    return {
      e1: 1,
      steps: 3,
      icon: "mdi-plus-circle",
      type: '1',
      s1: 1,
      samplestype1: [1],
      s2: 1,
      samplestype2: [1]

    }
  },
  mounted(){
    document.querySelector("")
  },
  watch: {
    steps (val) {
      if (this.e1 > val) {
        this.e1 = val
      }
    },
    samples (val) {
      if (this.s1 > val) {
        this.s1 = val
      }
    }
  },
  methods: {
    completeSurvey() {
      let moment = require('moment');
      moment.locale('ko');
      const surveyName = document.querySelector('.surveyName input').value;
      const classCode = this.$store.state.currentClass.classCode;
      const date = moment().format("LLL");
      const surveyList = []
      
      for(var __ = 0; __<this.steps; __++){
        const surveyType = document.querySelector(".surveyType input[type='radio']:checked").value;
        const surveyQuestion = document.querySelector(".listItem .surveyQuestion input[type='text']").value;
        let content = [];
        let doc;
        switch(surveyType){
          case "1": 
            doc = document.querySelector('.type1 .v-input--radio-group__input').children;
            for(var i = 0 ; i<doc.length; i++)              
              content.push(doc[i].querySelector('.v-label').textContent);
            break;
          case "2": 
            break;
          case "3": 
            break;
        }
        surveyList.push({
          surveyType: parseInt(surveyType), 
          surveyQuestion: surveyQuestion, 
          content:content, 
          count:new Array(doc.length).fill(0)
        })
      }
      const newSurvey = {
        surveyName:surveyName,
        surveyList:surveyList,
        classCode:classCode,
        date:date,
        public:true,
        active:false,
      }
      // Prof.surveyCreate(newSurvey)
      // .then(result => console.log(result));
      console.log("Dddd")
      // this.$router.push({path: `/`});
      // this.$router.push({path: `class/${this.$store.state.currentClass.classCode}/survey`});
    },
    addStep(n) {
      this.steps = this.steps + 1
    },
    deleteStep(n) {
      this.steps = this.steps - 1
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
    addType1(i) {
      this.samplestype1 = this.samplestype1 + 1
    },
    addType2(j) {
      this.samplestype2 = this.samplestype2 + 1
    },
    deleteType1(i) {
      this.samplestype1 = this.samplestype1 - 1
    },
    deleteType2(j) {
      this.samplestype2 = this.samplestype2 - 1
    }
  }
}
</script>
<style>d
.mdi.mdi-plus-circle:hover {
  background:aqua !important;
}
.mdi.mdi-plus-circle:active {
  box-shadow: 0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12);
}
.newSurvey:hover {
  background: cyan;
}
.surveyName > .v-input__control > .v-text-field__details {
  height: 0px;
  margin-bottom: 0px;
}
.addSample > .v-input__control > .v-messages {
  height: 0px;
  margin: 0px;
}
.typeCard > .v-input__control > .v-messages {
  height: 0px;
  margin: 0px;
}
</style>