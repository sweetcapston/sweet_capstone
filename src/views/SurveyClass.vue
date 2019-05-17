<template>
  <div>
    <v-card class="mb-3">
      <v-card-text>
        <div> 문항수를 입력하세요 </div>

        <v-text-field
          :value="steps"
          hint="This demo has a maximum of 6 steps"
          label="# of steps"
          persistent-hint
          type="number"
          @input="onInput"
        ></v-text-field>
      </v-card-text>
    </v-card>

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
            Step {{ n }}
          </v-stepper-step>

          <v-divider
            v-if="n !== steps"
            :key="n"
          ></v-divider>
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
              flat
              @click="preStep(n)"
            >
              Cancel
            </v-btn>

            <v-btn
              class="cyan lighten-1 white--text"
              @click="nextStep(n)"
            >
              Continue
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
      steps: 2,
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
    onInput (val) {
      this.steps = parseInt(val)
    },
    nextStep (n) {
      if (n === this.steps) {
        this.e1 = 1
      } else {
        this.e1 = n + 1
      }
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
