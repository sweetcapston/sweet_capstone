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
              @click="addSurvey(n)"
            >
              Add
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
            height="270px"
          >
            설문 내용
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
      socket: io(`${URL}:3000/survey`)
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
    addSurvey() {

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
