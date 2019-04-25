<template>
  <v-app>
    <span>
      <input v-model="classCode" placeholder="클래스코드">
      <v-btn dark @click="test">입장하기</v-btn>
    </span>
  </v-app>
</template>

<script>
export default {
  updated() {
      this.$store.commit('setClassCode',this.classCode)
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
