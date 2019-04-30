<template>
  <v-app dark>
    <v-container>
      <v-layout>
          <input v-model="classCode" placeholder="클래스코드를 입력하세요." >
          <v-btn dark @click="test">입장하기</v-btn>
          <modal-create-class-form/>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
export default {
  updated() {
      this.$store.commit('setClassCode',this.classCode) // 클래스 코드 입력받기 
  },
  data(){
      return {classCode:''}
  },
  methods: {
    test() {
      alert(this.classCode);
      this.$router.push({name: 'class', params: { classCode: this.classCode }})
    }
  }
};
</script>
