<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>OpenClass</span>
        <span class="font-weight-light"> username </span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="https://github.com/sweetcapston"
        target="_blank"
      >
        <span class="mr-2">logout</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <span>
        <input v-model="classCode" placeholder="클래스코드">
        <v-btn dark @click="test">입장하기</v-btn>
        <v-if >
          <v-btn dark @click="createClass">클래스 생성하기</v-btn>
        </v-if>
      </span>

      <v-sheet
        class="d-flex"
      >
        <ClassList id='Class1'></ClassList>
        <ClassList id='Class2'></ClassList>
        <ClassList id='Class3'></ClassList>
        <ClassList id='Class4'></ClassList>
      </v-sheet>
    </v-content>
  </v-app>
</template>

<script>
export default {
  updated() {
    this.$store.commit('setClassCode', this.classCode)
  },
  data(){
    return {
      classCode:''
    }
  },
  methods: {
    test() {
      alert(this.classCode);
      this.$router.push({name: 'class', params: { classCode: this.classCode }})
    },
    createClass(){
    }
  }
};
</script>
