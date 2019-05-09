<template>
  <v-layout column align-center justify-center class="xs12 sm5 md3 cardLayout" >
    <v-icon 
      id="delete"
      color="white"
      flat
      @click="deleteClassList(currentClass.classCode)"
      v-if="this.$store.getters.getIdentity === 1"
    >mdi-close</v-icon>

    <v-icon 
      id="delete"
      color="white"
      flat
      @click="deleteClass(currentClass.classCode)"
      v-if="this.$store.getters.getIdentity === 2"
    >mdi-close</v-icon>        
    <v-btn 
      id = "CardButton"
      @click="enterClass(currentClass.classCode)"
      flat
    >
      <v-card
        class="mx-auto"
        width="200"
      >
        <v-img
          id="image"
          class="white--text"
          height="150px"
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        >    
        </v-img>
        <v-card-title class="align-start">{{currentClass.className}}</v-card-title>
        <v-card-text>
          <span class="text--primary">
            <span>교수명: {{ currentClass.profName }}</span><br>
            <span>클래스코드: {{ currentClass.classCode }}</span><br>
          </span>
        </v-card-text>
      </v-card>
    </v-btn>
  </v-layout>
</template>

<script>
import {Prof, Stud} from "@/api";

export default {
  data(){
    return{
      classCode: '',
      classList: []
    }
  },
  props: {
    currentClass: {
      type: Object
    }
  },
  methods:{
    // 클래스 입장
    enterClass: function(classCode){
      this.$store.commit("setCurrentClass", 
      {
        classCode: classCode,
        className: this.currentClass.className,
        profName: this.currentClass.profName
      });
      const checkApply = this.$store.state.classList.findIndex( function(item) { return item.classCode === classCode })
      this.$store.commit('setCheckApply', checkApply);
      this.$router.push({path: `class/${classCode}/home`});
    },
    // 클래스 리스트에서 삭제(학생)
    deleteClassList: function(classCode){
      if(window.confirm("삭제하시겠습니까?")){
        Stud.classDelete(classCode)
        .then(res => {
          if(res.data == false) alert('error!!');
          else {
            // 클래스리스트에서 클래스 삭제하고 새로운 클래스 리스트로 업데이트
            this.classList = this.$store.state.classList;
            const idx = this.classList.findIndex(function(item) {return item.classCode === classCode})
            if (idx > -1) this.classList.splice(idx, 1);
            this.$store.commit('removeClassList', this.classList);
          }
        });
      }
    },
    // 클래스 삭제(교수)
    deleteClass: function(classCode){
      if(window.confirm("삭제하시겠습니까?")){
        Prof.classDelete(classCode)
        .then(res => {
          if(res.data === false) alert('error!!');
          else {
            this.classList = this.$store.state.classList;
            const idx = this.classList.findIndex(function(item) {return item.classCode === classCode})
            if (idx > -1) this.classList.splice(idx, 1);
            this.$store.commit('removeClassList', this.classList);
          }
        });
      }
    }
  }
}
</script>
<style>
  .cardLayout {
    max-width: 300px;
  }
  #CardButton {
    text-transform: none !important;
    height:100%;
    padding-left:40px;
    padding-right:40px;
  }
  #CardButton::before{
    background:transparent;
  }
  #CardButton:hover{
    background:#EDEDED;
  }
  .v-icon.mdi.mdi-close.theme--light.white--text:hover{
    background:#CFD8DC;
  }
  .v-icon.mdi.mdi-close.theme--light.white--text{
    position: relative;
    z-index:1;
    font-size:18px;
    width:30px;
    top:53px;
    left:90px;
  }
  
</style>
