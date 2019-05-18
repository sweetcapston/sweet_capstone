<template>
  <v-expansion-panel-content>
    <template v-slot:actions>
      <v-icon color="cyan ligten-1">$vuetify.icons.expand</v-icon>
    </template>
    <template v-slot:header >
      <v-text-field
        solo
        flat
        label="제목을 입력하세요"
        color="cyan ligten-1"
        height="70px"
        @click.stop
      />
      <v-btn 
        class="cyan lighten-1 white--text newSurvey"
        @click="completeSurvey(n)"
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
        >
          <v-card
            class="mb-5"
            color="grey lighten-3"
            height="50px"            
          >
            <v-radio-group v-model="radios" :mandatory="false" row>
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
              />
              <v-radio-group v-if="radios == 'radio-1'">
                  <v-radio label="답 1" value="ans-1" color="cyan ligten-1"></v-radio>
                  <v-radio label="답 2" value="ans-2" color="cyan ligten-1"></v-radio>
                  <v-radio label="답 3" value="ans-3" color="cyan ligten-1"></v-radio>
                  <v-radio label="답 4" value="ans-4" color="cyan ligten-1"></v-radio>
                  <v-radio label="답 5" value="ans-5" color="cyan ligten-1"></v-radio>
              </v-radio-group>
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
  </v-expansion-panel-content>
</template>
<script>
/*eslint-disable */
export default {
  data () {
    return {
      e1: 1,
      steps: 3,
      icon: "mdi-plus-circle",
      radios: 'radio-1'
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
        console.log(n)
      if (1 === this.steps) {
        this.e1 = 1
      } else {
        this.e1 = n - 1
      }
    }
  }
}
</script>
<style>
.mdi.mdi-plus-circle:hover{
  background:aqua !important;
}
.mdi.mdi-plus-circle:active{
  box-shadow: 0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12);
}
.newSurvey:hover{
  background: cyan;
}
</style>