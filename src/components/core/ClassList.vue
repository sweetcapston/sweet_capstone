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
      <v-card-title class="align-start fill-height">{{classes.className}}</v-card-title>
    </v-img>

    <v-card-text>
      <span class="text--primary">
        <span>교수명: {{ classes.profName }}</span><br>
        <span>클래스코드: {{ classes.classCode }}</span><br>
      </span>
    </v-card-text>

    <v-card-actions >
      <v-btn
       text
       color="orange" 
       @click="enterClass(classes.classCode)"
      >
        입장
      </v-btn>
      <v-btn
       text color="green" 
       @click="deleteClassList(classes.classCode)"
       v-if="this.$session.get('Identity')===1"
      >
        삭제
      </v-btn>
      <v-btn text color="green"
       @click="deleteClass(classes.classCode)"
       v-if="this.$session.get('Identity')===2"
      >
        삭제
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {Prof, Stud} from "../../api";

export default {
  data(){
    return{
      classCode: '',
      classList: []
    }
  },
  props: {
    classes: {
      type: Object
    }
  },
  methods:{
    // 클래스 입장
    enterClass: function(classCode){
      this.classList = JSON.parse(localStorage.getItem('access_classList'));
      //const idx = this.classList.findIndex(function(item) {return item.classCode === classCode})
      var classTempData = this.classList.find(function(item) {return item.classCode === classCode})

      this.$store.commit("setClassCode", classCode);
      this.$store.commit("setClassName", classTempData.className);
      this.$store.commit("setProfName", classTempData.profName);
      this.$router.push({path: `class/${classCode}/home`});
    },
    // 클래스 리스트에서 삭제(학생)
    deleteClassList: function(classCode){
      Stud.classDelete(classCode)
      .then(res => {
        if(res.data == true)
          this.classList = JSON.parse(localStorage.getItem('access_classList'));

        const idx = this.classList.findIndex(function(item) {return item.classCode === classCode})
        if (idx > -1) this.classList.splice(idx, 1);
        localStorage.removeItem('access_classList');
        localStorage.setItem('access_classList', JSON.stringify(this.classList));
        alert('클래스 코드번호' + '(' + classCode + ')' + '가 삭제 되었습니다.');
      });
    },
    // 클래스 삭제(교수)
    deleteClass: function(classCode){
      Prof.classDelete(classCode)
      .then(res => {
        if(res.data == true)
          this.classList = JSON.parse(localStorage.getItem('access_classList'));

        const idx = this.classList.findIndex(function(item) {return item.classCode === classCode})
        if (idx > -1) this.classList.splice(idx, 1);
        localStorage.removeItem('access_classList');
        localStorage.setItem('access_classList', JSON.stringify(this.classList));
        alert('클래스 코드번호' + '(' + classCode + ')' + '가 삭제 되었습니다.');
      });
    }
  }
}
</script>
