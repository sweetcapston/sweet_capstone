<template>
  <v-stepper-content :step="n+1">
    <v-card color="grey lighten-3" class="typeCard">
      <v-radio-group v-model="type" :mandatory="false" class="surveyType" row>
        <v-radio label="객관식" value="1" color="cyan ligten-1" select/>
        <v-radio label="객관식 (복수 응답 가능)" value="2" color="cyan ligten-1"/>
        <v-radio label="주관식" value="3" color="cyan ligten-1"/>
      </v-radio-group>
    </v-card>
    <v-card class="mb-5" color="grey lighten-3">
      <v-btn absolute dark fab top right class="crimson" @click="deleteData">
        <v-icon>remove</v-icon>
      </v-btn>

      <v-container>
        <v-text-field label="질문을 입력하세요" single-line color="cyan ligten-1" class="surveyQuestion"/>

        <div v-if="type === '1'">
          <div v-for="(type1, index) in samplestype1" :key="type1.id">
            <v-layout>
              <v-text-field
                :class="'type1_'+`${n+1}`"
                prepend-icon="mdi-checkbox-blank-circle-outline"
                label="보기를 입력하세요"
                single-line
                color="rgb(111, 111, 111)"
              />
              <v-spacer/>
              <v-icon @click="deleteType1(index)">mdi-close</v-icon>
            </v-layout>
          </div>
          <v-layout v-if="type === '1'">
            <v-icon @click="addType1()">mdi-plus</v-icon>
            <v-input @click="addType1()" label="보기 추가" class="addSample"/>
          </v-layout>
        </div>
        <div v-if="type === '2'">
          <div class="type2" v-for="(type2, index) in samplestype2" :key="type2.id">
            <v-layout>
              <v-text-field
                :class="'type2_'+`${n+1}`"
                prepend-icon="mdi-checkbox-blank-outline"
                label="보기를 입력하세요"
                single-line
                color="rgb(111, 111, 111)"
              />
              <v-spacer/>
              <v-icon @click="deleteType2(index)">mdi-close</v-icon>
            </v-layout>
          </div>
          <v-layout v-if="type === '2'">
            <v-icon @click="addType2()">mdi-plus</v-icon>
            <v-input @click="addType2()" label="보기 추가" class="addSample"/>
          </v-layout>
        </div>

        <v-layout v-if="type === '3'">
          <v-textarea disabled solo flat outline color="cyan lighten-1"/>
        </v-layout>
      </v-container>
    </v-card>
    <v-layout justify-space-between>
      <v-btn 
      v-if="n+1 != 1"
      class="cyan lighten-1 white--text" 
      @click="preStep">Pre</v-btn>
      <v-btn 
      v-else
      class="red lighten-1 white--text" 
      @click="cancle">cancle</v-btn>
      <v-btn v-if="n+1 !== steps" class="cyan lighten-1 white--text" @click="nextStep">Next</v-btn>
      
      <v-btn v-if="n+1 === steps" class="cyan lighten-1 white--text" @click="complete">Complete</v-btn>
    </v-layout>
  </v-stepper-content>
</template>
<script>
export default {
  data() {
    return {
      type: this.card_data.type,
      samplestype1: this.card_data.samplestype1,
      samplestype2: this.card_data.samplestype1,
      newID1: 2,
      newID2: 1002
    };
  },
  props: {
    card_data: Object,
    n: Number,
    steps: Number
  },
  methods: {
    deleteData() {
      this.$emit("remove");
    },
    addType1() {
      this.samplestype1.push({
        id: this.newID1++
      });
    },
    addType2() {
      this.samplestype2.push({
        id: this.newID2++
      });
    },
    deleteType1(index) {
      this.samplestype1.splice(index, 1);
    },
    deleteType2(index) {
      this.samplestype2.splice(index, 1);
    },
    preStep() {
      this.$emit("preStep");
    },
    nextStep() {
      this.$emit("nextStep");
    },
    cancle(){
      if(confirm("취소하시겠습니까?")) 
      this.$EventBus.$emit("surveyEdit", true);
    },
    complete() {
      this.$emit("complete");
    }
  }
};
</script>
