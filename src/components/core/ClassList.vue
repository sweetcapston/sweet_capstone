<template>
  <v-card
    class="mx-auto"
    width="200"
  >
    <v-img
      class="white--text"
      height="150px"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    >
      <v-card-title class="align-start fill-height">{{currentClass.className}}</v-card-title>
    </v-img>

    <v-card-text>
      <span class="text--primary">
        <span>교수명: {{ currentClass.profName }}</span><br>
        <span>클래스코드: {{ currentClass.classCode }}</span><br>
      </span>
    </v-card-text>

    <v-card-actions >
      <v-btn
       text
       color="orange" 
       @click="enterClass(currentClass.classCode)"
      >
        입장
      </v-btn>
      <v-btn
       text color="green"
       @click="deleteClassList(currentClass.classCode)"
       v-if="this.$store.getters.getIdentity === 1"
      >
        삭제
      </v-btn>
      <v-btn text color="green"
       @click="deleteClass(currentClass.classCode)"
       v-if="this.$store.getters.getIdentity === 2"
      >
        삭제
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Prof from "../../api/Prof";
import Stud from "../../api/Stud";

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
    },
    // 클래스 삭제(교수)
    deleteClass: function(classCode){
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
</script>
