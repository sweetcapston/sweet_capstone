<template>
  <div>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-toolbar-title>설문제목</v-toolbar-title>
          <template>
            <v-btn class="cyan lighten-1 white--text" @click="completeSurvey(n)">Complete</v-btn>
          </template>
      </v-stepper-header>
      <v-stepper-header>
        <template v-for="n in steps">
          <v-stepper-step
            :key="`${n}-step`"
            :complete="e1 > n"
            :step="n"
            editable
            color="cyan lighten-1"
          >문항 {{ n }}</v-stepper-step>
          <v-divider v-if="n !== steps" :key="n"></v-divider>
        </template>
        <template>
          <v-icon class="cyan lighten-1 white--text" @click="addStep()">mdi-plus-circle</v-icon>
        </template>
      </v-stepper-header>
      
      <v-stepper-items>
        <v-stepper-content v-for="n in steps" :key="`${n}-content`" :step="n">
          <v-card class="mb-5" color="grey lighten-3" height="330px">
            <v-container fluid>
              <v-toolbar-title>질문</v-toolbar-title>
              <v-radio label="답 1" value="ans-1" color="cyan ligten-1"></v-radio>
              <v-radio-group v-if="radios == 'radio-1'" v-model="column" column>
                <v-radio label="답 1" value="ans-1" color="cyan ligten-1"></v-radio>
                <v-radio label="답 2" value="ans-2" color="cyan ligten-1"></v-radio>
                <v-radio label="답 3" value="ans-3" color="cyan ligten-1"></v-radio>
                <v-radio label="답 4" value="ans-4" color="cyan ligten-1"></v-radio>
                <v-radio label="답 5" value="ans-5" color="cyan ligten-1"></v-radio>
              </v-radio-group>
            </v-container>
          </v-card>
          <v-layout justify-space-between>
            <v-btn class="cyan lighten-1 white--text" @click="preStep(n)">Pre</v-btn>

            <v-btn class="cyan lighten-1 white--text" @click="nextStep(n)">Next</v-btn>
          </v-layout>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
import Vue from "vue";
import store from "@/store.js";
import { URL } from "@/plugins/api.config.js";
import io from "socket.io-client";
export default {
  data() {
    return {
      e1: 1,
      steps: 3,
      icon: "mdi-plus-circle",
      socket: io(`${URL}:3000/survey`),
      radios: "radio-1"
    };
  },

  watch: {
    steps(val) {
      if (this.e1 > val) {
        this.e1 = val;
      }
    }
  },
  methods: {
    completeSurvey() {alert('제출완료')},
    addStep(n) {
      this.steps = this.steps + 1;
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