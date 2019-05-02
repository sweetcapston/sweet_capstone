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
      <v-card-title class="align-start fill-height" :classList="classList">{{classList.className}}</v-card-title>
    </v-img>

    <v-card-text :classList="classList">
      <span class="text--primary">
        <span>교수명: {{classList.profName}}</span><br>
        <span>클래스코드: {{classList.classCode}}</span><br>
      </span>
    </v-card-text>

    <v-card-actions >
      <v-btn
        text 
        color="orange"
        @click="enterClass(classList.classCode)"
      >
        입장
      </v-btn>
      <v-btn
        text 
        color="green"
        :classList="classList"
        @click="deleteClass(classList.classCode)"
        v-if="this.$session.get('Identity')===2"
      >
        삭제
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Prof from "../../api/Prof";

export default {
  data(){
    return{
      classCode: ''
    }
  },
  props: {
    classList: {
      type: Object
    }
  },
  methods:{
    enterClass: function(classCode){
      this.$router.push({name: 'class', params: { classCode: classCode }}) // 해당 클래스 페이지로 이동
    },
    deleteClass: function(classCode){
      alert(classCode);
      Prof.classDelete(classCode)
      .then(res=>{
        alert(classCode);
        const idx = this.classList.findIndex(function(item) {return item.classCode === classCode})
        if (idx > -1) this.classList.splice(idx, 1);
        localStorage.removeItem('access_classList');
        localStorage.setItem('access_classList', JSON.stringify(this.classList));
        alert(res);
      });
    }
  }
}
</script>
