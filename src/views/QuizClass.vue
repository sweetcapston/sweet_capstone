<template>
  <div>
    <v-stepper v-model="e1">
      <v-stepper-header>   
        <v-text-field
          solo
          flat
          label="제목을 입력하세요"
          color="cyan ligten-1"
          height="70px"
        >
          <template v-slot:append>
            <v-btn 
              class="cyan lighten-1 white--text"
              @click="completeSurvey(n)"
            >
              Complete
            </v-btn>
          </template>
        </v-text-field>
        
      </v-stepper-header>
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
            class="mb-5"
            color="grey lighten-3"
            height="50px"            
          >
            <v-radio-group v-model="type" :mandatory="false" row>
              <v-radio label="객관식" value="radio-1" color="cyan ligten-1"></v-radio>
              <v-radio label="객관식 (복수 응답 가능)" value="radio-2" color="cyan ligten-1"></v-radio>
              <v-radio label="주관식" value="radio-3" color="cyan ligten-1"></v-radio>
            </v-radio-group>
          </v-card>

          <v-card
            class="mb-5"
            color="grey lighten-3"
            height="270px"
          >
            <v-container fluid>
              <v-text-field                
                label="질문을 입력하세요"
                single-line
                color="cyan ligten-1"
              ></v-text-field>

              <v-layout v-if="type == 'radio-1'">
                <v-radio-group v-model="answer" column>
                  <p>{{ answer }}</p>
                  <v-radio label="보기 1" value="ans-1" color="cyan ligten-1"></v-radio>
                  <v-radio label="보기 2" value="ans-2" color="cyan ligten-1"></v-radio>
                  <v-radio label="보기 3" value="ans-3" color="cyan ligten-1"></v-radio>
                  <v-radio label="보기 4" value="ans-4" color="cyan ligten-1"></v-radio>
                  <v-radio label="보기 5" value="ans-5" color="cyan ligten-1"></v-radio>
                </v-radio-group>
              </v-layout>

              <v-layout v-if="type == 'radio-2'">
                <p>{{ selected }}</p>
                <v-checkbox v-model="selected" label="보기 1" value="ans-1" color="cyan ligten-1"></v-checkbox>
                <v-checkbox v-model="selected" label="보기 2" value="ans-2" color="cyan ligten-1"></v-checkbox>
                <v-checkbox v-model="selected" label="보기 3" value="ans-3" color="cyan ligten-1"></v-checkbox>
                <v-checkbox v-model="selected" label="보기 4" value="ans-4" color="cyan ligten-1"></v-checkbox>
                <v-checkbox v-model="selected" label="보기 5" value="ans-5" color="cyan ligten-1"></v-checkbox>
              </v-layout>

              <v-layout v-if="type == 'radio-3'">
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
              class="cyan lighten-1 white--text"
              @click="nextStep(n)"
            >
              Next
            </v-btn>
          </v-layout>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
import Vue from "vue";
import store from '@/store.js'
import {URL} from '@/plugins/api.config.js'
import io from 'socket.io-client';
export default {
  data () {
    return {
      e1: 1,
      steps: 3,
      icon: "mdi-plus-circle",
      type: 'radio-1',
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
    completeSurvey() {

    },
    addStep(n) {
      this.steps = this.steps + 1
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
    }
  }
}
</script>
