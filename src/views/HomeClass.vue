<template>
  <v-app>
    <h1>클래스 이름 : {{this.$store.state.currentClass.className}}</h1>
    <h1>클래스 코드 : {{this.$store.state.currentClass.classCode}}</h1>
    <h1>교수 이름 : {{this.$store.state.currentClass.profName}}</h1>
    <span>
      <v-btn color="primary"
        @click="addClass()"
        v-if="this.$session.get('Identity') == 1 && (this.$store.state.already == -1)" >수광하기</v-btn> <!-- 수광하지않고있는 학생에게만 보여지도록.. 학생의 수광리스트에서 -->
      <v-btn color="error" @click="outClass()" >클래스 나가기</v-btn>
    </span>
  </v-app>
</template>

<script>
import Stud from "../api/Stud";

export default {
  data(){
    return{
      currentClass: {
        className: '',
        classCode: '',
        profName: '',
      },
      classList: []
    }
  },
  methods: {
    addClass() {
      Stud.classAdd(this.$store.state.currentClass.classCode).then(res => {
        if(res.data === 'false') alert('클래스 수광 실패');
        else{
          this.currentClass = this.$store.state.currentClass
          // currentClass객체로 하면 오류남.
          this.$store.commit("addClassList", {
            className: this.currentClass.className,
            classCode: this.currentClass.classCode,
            profName: this.currentClass.profName
          });
          alert('성공');
        } 
      })
    },
    outClass(){
      this.$store.commit("removeCurrentClass");
      alert('클래스에서 나괍니다.');
      this.$router.push({name: 'main'});
    }
    //...
  }
};
</script>