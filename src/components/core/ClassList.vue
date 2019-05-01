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
      <v-card-title class="align-start fill-height" :profs="prof">{{profs.classname}}</v-card-title>
    </v-img>

    <v-card-text :professorname="professorname" :profs="prof">
      <span class="text--primary">
        <span>{{profs.profname}}</span><br>
        <span>{{profs.classtime}}</span><br>
      </span>
    </v-card-text>

    <v-card-actions>
      <v-btn
        text 
        color="orange"
        @click="enterClass(profs.classcode)"
      >
        입장
      </v-btn>
      <v-btn
        text 
        color="green"
        @click="deleteClass(profs.classcode)"
        v-if="this.$session.get('Identity')===2"
      >
        삭제
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
// import axios from "axios";
// const BaseUrl = "http://localhost:5000";

export default {
  data(){
    return{
      classCode: ''
    }
  },
  props: {
    classcode: {
      type: String
    },
    classname: {
      type: String
    },
    professorname: {
      type: String
    },
    classtime: {
      type: String
    },
    profs: {
      type: Object
    }
  },
  methods:{
    enterClass: function(classcode){
      this.$router.push({name: 'class', params: { classCode: classcode }}) // 해당 클래스 페이지로 이동
    },
    deleteClass: function(classcode){
      // axios.post(`${BaseUrl}/prof/deletecreate`, {
      //   classcode : classcode // 클래스코드 서버로 전송
      // })
      // .then(res=>{
      //   if (res.data) alert(res.data);
      //   alert(this.className + " 클래스 제거가 완료 되었습니다.");
      // });

      // 클래스 제거 로컬 테스트(서버 연동후 삭제)
      const idx = this.profs.findIndex(function(item) {return item.classcode === classcode})
      if (idx > -1) this.profs.splice(idx, 1)
    }
  }
}
</script>
