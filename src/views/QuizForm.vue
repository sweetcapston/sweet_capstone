<template>
  <v-expansion-panel-content class="createQuiz">
    <template v-slot:actions>
      <v-icon color="cyan ligten-1">$vuetify.icons.expand</v-icon>
    </template>
    <template
      v-slot:header
    >
      <v-text-field
        single-line
        label="제목을 입력하세요"
        color="cyan ligten-1"
        class="quizName"
      ></v-text-field>
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
          <v-divider
            v-if="n !== steps"
            :key="n"
          ></v-divider>         
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
        >
          <v-card
            class="typeCard"
            color="grey lighten-3"
            height="50px"            
          >
            <v-radio-group v-model="type[n-1]" :mandatory="false" class="quizType" row>
              <v-radio label="객관식" value="1" color="cyan ligten-1"></v-radio>
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
              class="crimson"
              @click="deleteStep()"
            >
              <v-icon>remove</v-icon>
            </v-btn>

            <v-container>
              <v-text-field                
                label="질문을 입력하세요"
                single-line
                color="cyan ligten-1"
              ></v-text-field>
              <div v-if="tyoe[n-1] === '1'">
                <template v-for="i in samplestype1[n-1].length">
                  <v-layout :key="i">
                    <v-text-field
                      class="type1"
                      prepend-icon="mdi-checkbox-blan-circle-outline"
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

                <v-layout
                  v-if="type[n-1] === '1'"
                  @click="addType1(n)"
                >
                  <v-icon>mdi-plus</v-icon>
                  <v-input
                    label="보기 추가"
                    class="addSample"
                  ></v-input>
                </v-layout>
              </div>

              <div v-if="type[n-1] === '2'">
                <template class="type2" v-for="j in samplestype2[n-1].length">
                  <v-layout :key="1000+j">
                    <v-text-field
                      class="type2"
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
                <v-layout 
                  v-if="type[n-1] === '2'"
                  @click="addType2(n)"
                >
                  <v-icon>mdi-plus</v-icon>
                  <v-input
                    label="보기 추가"
                    class="addSample"
                  ></v-input>
                </v-layout>
              </div>

              <v-layout v-if="type[n-1] === '3'">
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
              @click="completeQuiz()"
            >
              complete
            </v-btn>
          </v-layout>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-expansion-panel-content>
</template>

<script>
import store from '@/store.js'
import { Prof } from "@/api";
export default {
  data () {
    return {
      e1: 1,
      steps: 3,
      icon: "mdi-plus-circle",
      type: new Array(3).fill('1'),
      samplestype1: [[1], [1], [1]],
      samplestype2: [[1], [1], [1]],
      answer: [],
      selected: []
    }
  },
  watch: {
    steps (val) {
      if (this.e1 > val) {
        this.e1 = val
      }
    }
  },
  methods: {
    completeQuiz() {

    },
    addStep(n) {
      this.steps = this.steps + 1
      this.type.push('1')
      this.samplestype1.push([1])
      this.samplestype2.push([1])
    },
    deleteStep(n) {
      this.steps = this.e1 - 1
      this.type.pop()
      this.samplestype1.pop()
      this.samplestype2.pop()
    },
    nextStep (n) {
      this.e1 = n + 1
    },
    preStep (n) {
      if (1 === this.steps) {
        this.e1 = 1
      } else {
        this.e1 = n - 1
      }
    },
    addType1(n) {
      this.samplestype1[n-1].push(1)
    },
    addType2(n) {
      this.samplestype2[n-1].push(1)
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
