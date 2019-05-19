<template>
  <v-app>
    <h1>클래스 이름 : {{this.$store.state.currentClass.className}}</h1>
    <h1>클래스 코드 : {{this.$store.state.currentClass.classCode}}</h1>
    <h1>교수 이름 : {{this.$store.state.currentClass.profName}}</h1>
    <span>
      <v-btn color="primary"
        @click="addClass()"
        v-if="this.$store.getters.getIdentity == 1 && (this.$store.state.checkApply == -1)" >수강하기</v-btn> <!-- 수강하지않고있는 학생에게만 보여지도록.. 학생의 수강리스트에서 -->
    </span>
  </v-app>
</template>

<script>
import {Stud} from "@/api";

export default {
  data(){
    return{
    }
  },
  methods: {
    addClass() {
      Stud.classAdd(this.$store.state.currentClass.classCode).then(res => {
        if(res.data === 'false') alert('클래스 수강 실패');
        else{
          // currentClass객체로 하면 오류남.
          this.$store.commit("addClassList", {
            className: this.$store.state.currentClass.className,
            classCode: this.$store.state.currentClass.classCode,
            profName: this.$store.state.currentClass.profName
          });
          this.$store.commit('setCheckApply', 1);
        } 
      })
    },
    outClass(){
      this.$store.commit("removeCurrentClass");
      this.$router.push({name: 'main'});
    },
  }
};
</script>