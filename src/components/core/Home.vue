<template>
  <v-app>
         <h1>클래스 코드 : {{this.$route.params.classCode}}</h1>
            <span><v-btn dark @click="checkAuth">TEST!</v-btn></span>
            <span><v-btn dark @click="showAuth">Show!</v-btn></span>
            <span><v-btn dark @click="removeAuth">SESSION REMOVE!</v-btn></span>
  </v-app>
</template>

<script>

export default {
  mounted(){
    if(!this.$session.get('token'))
    {
       alert('로그인후 사용하세요');
       this.$router.push({path: '/'})
    }
  },
  methods:{
    checkAuth()
    {
      if(!this.$session.get('token'))
      alert('안돼!');
      else alert('돼!');
    },
    removeAuth()
    {
      this.$session.remove('token');
      alert('제거 되었습니다.');
    },
    showAuth()
    {
      alert(this.$session.id('token'));
    }
  }
};
</script>