<template>
  <v-stepper-content :step="n+1">
    
    <v-card class="mb-5" color="grey lighten-3">
      <v-btn absolute dark fab top right class="crimson" @click="deleteData">
        <v-icon>remove</v-icon>
      </v-btn>

      <v-container>
        <v-layout>
            <v-radio-group v-model="type" :mandatory="false" class="surveyType" row>
                <v-radio label="객관식" value="1" color="cyan ligten-1" select/>
                <v-radio label="객관식 (복수 응답 가능)" value="2" color="cyan ligten-1"/>
                <v-radio label="주관식" value="3" color="cyan ligten-1"/>
            </v-radio-group>
        </v-layout>
        <v-text-field v-model="surveyQuestion" label="질문을 입력하세요" single-line color="cyan ligten-1" class="surveyQuestion"/>

        <div v-if="type === '1'">
          <div v-for="(type1, index) in samplestype1" :key="type1.id">
            <v-layout>
              <v-text-field
                :class="'type1_'+`${n+1}`"
                prepend-icon="mdi-checkbox-blank-circle-outline"
                label="보기를 입력하세요"
                v-model="content[index]"
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
                v-model="content[index]"
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
      @click="cancel">cancel</v-btn>
      <v-btn
        v-if="n+1 !== steps"
        :key="n"
        class="cyan lighten-1 white--text"
        id="next"
        @click="nextStep(n)"
      >Next</v-btn>
      <v-btn
        v-if="n+1 === steps"
        :key="n"
        class="cyan lighten-1 white--text"
        @click="edit"
      >edit</v-btn>
    </v-layout>
  </v-stepper-content>
</template>
<script>
export default {
    created() {
        if(this.survey!=undefined){
            this.type = `${this.survey.surveyType}`
            this.samplestype1 = this.card_data.samplestype1;
            this.samplestype2 = this.card_data.samplestype2;
            this.newID1 = this.card_data.samplestype1.length+1
            this.newID2 = this.card_data.samplestype2.length+1001
            this.surveyQuestion = this.survey.surveyQuestion;
            if(this.type != "3") this.content = this.survey.content
        }
  },
  data() {
    return {
        radioGroup: 1,
        surveyQuestion:"",
        type: "1",
        samplestype1: [{id:1}],
        samplestype2: [{id:1001}],
        newID1: 2,
        newID2: 1002,
        content:[],
    };
  },
  props: {
    card_data: Object,
    n: Number,
    steps: Number,
    survey:Object,
    SID:Number
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
    edit() {
      this.$emit("edit");
    },
    cancel(){
      if(confirm("취소하시겠습니까?")) this.$EventBus.$emit("surveyEdit", true);
    },

  }
};
</script>
<style>
.v-input.surveyType.v-input--selection-controls.v-input--radio-group{
    margin-top: 0
}
</style>
