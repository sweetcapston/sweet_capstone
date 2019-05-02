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
        text 
        color="green"
        @click="deleteClass(classes.classCode)"
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
    enterClass: function(classCode){
      this.$store.commit("setClassCode", classCode);
      this.$router.push({name: 'class', params: { classCode: classCode }}) // 해당 클래스 페이지로 이동
    },
    deleteClass: function(classCode){
      alert(classCode);
      Prof.classDelete(classCode)
      .then(res=>{
        if(res.data == true)
        alert(classCode);
        this.classList = JSON.parse(localStorage.getItem('access_classList'));
        const idx = this.classList.findIndex(function(item) {return item.classCode === classCode})
        if (idx > -1) this.classList.splice(idx, 1);
        localStorage.removeItem('access_classList');
        localStorage.setItem('access_classList', JSON.stringify(this.classList));
      });
    }
  }
}
</script>
