<template>
  <div>
    <sui-modal id="modal" v-model="LoginSign" size="mini">
      <sui-modal-header class="undraggable unselectable">로그인</sui-modal-header>
      <div class="grid-container login">
        <sui-modal-content>
          <div class="login_body">
            <div class="Email undraggable unselectable">
              <label>이메일</label>
              <sui-input
                type="email"
                placeholder="이메일을 입력해주세요"
                v-model="userID"
                name="email"
                v-validate="'required'"
                data-vv-as="이메일"
                @input="validate"
                v-on:keyup.enter="LogIn"
              />
            </div>
            <p class="e-error" v-show="errors.has('email') && errsign">{{errors.first('email')}}</p>
            <div class="Password undraggable unselectable">
              <label>비밀번호</label>
              <sui-input
                type="password"
                placeholder="비밀번호를 입력해주세요"
                name="password"
                v-model="password"
                v-validate="'required'"
                data-vv-as="비밀번호"
                @input="validate"
                v-on:keyup.enter="LogIn"
              />
            </div>
            <p
              class="pw-error"
              v-show="errors.has('password') && errsign"
            >{{errors.first('password')}}</p>
          </div>
        </sui-modal-content>
        <div class="login_end">
          <sui-button class="Login btn-Login cyan lighten-1" positive @click="LogIn" id="Login">로그인</sui-button>
          <p class="modalChange undraggable unselectable">
            아직 회원이 아니세요?
            <a href="javascript:;" @click="modalChange">회원가입</a>
          </p>
        </div>
      </div>
    </sui-modal>
  </div>
</template>

<script>
import {Auth} from "@/api";

/* eslint-disable */
export default {
  data() {
    return {
      userID: "",
      password: "",
      errsign: false,
      LoginSign:true
    };
  },
  watch: {
    LoginSign (val) {
      if(!val){
        this.$router.replace({name:'login'});
      }
    }
  },
  methods: {
    ClearData() {
      this.userID = "";
      this.password = "";
    },
    test1() {
      alert('11');
    },
    LogIn() {
      if (this.errors.items.length != 0) {
        this.errsign = true;
        alert(this.errors)
        return false;
      }
      this.errsign = false;
      Auth.login({
        userID: this.userID,
        password: this.password
      })
      .then(res => {
        const {data} = res;
        if(data){
          this.ClearData();
          this.$store.commit("setLoginData", data);
          this.routeChange(data.Identity);
        } else{
          alert("로그인 실패")
        }
      })
      .catch(error => {
        alert("아이디 비밀번호를 확인해주세요");
      });
    },
    routeChange(Identity){
      switch(Identity){
        case 1: //학생
          this.$router.push({name: 'main'}) // 로그인 성공후 메인페이지로 이동
          break;  
        case 2: //교수
          this.$router.push({name: 'main'}) // 로그인 성공후 메인페이지로 이동
          break;
        case 3: //관리자
          this.$router.push({name: 'admin'}) // 로그인 성공후 관리자페이지로 이동
          break;
      }
    },
    modalChange() {
      this.validate();
      this.ClearData();
      this.$router.replace("register");
    },
    validate: function() {
      this.$validator.validateAll();
    }
  }
};
</script>
