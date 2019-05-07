<template>
  <div>
    <sui-modal v-model="LoginSign" id="modal" size="mini">
      <sui-modal-header class="undraggable unselectable">로그인</sui-modal-header>
      <div class="grid-container login">
        <sui-modal-content>
          <div class="login_body">
            <div class="Email undraggable unselectable">
              <label>이메일</label>
              <sui-input
                type="email"
                placeholder="이메일을 입력해주세요"
                v-model="email"
                name="email"
                v-validate="'required'"
                data-vv-as="이메일"
                @input="validate"
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
      email: "",
      password: "",
      LoginSign: false,
      errsign: false,
    };
  },
  created() {
    this.$EventBus.$on("toggleLogin", () => {
      this.LoginSign = !this.LoginSign;
    });
    this.$EventBus.$on("LoginSign", () => {
      this.LoginSign = !this.LoginSign;
      this.validate();
      this.ClearData();
    });
  },
  methods: {
    ClearData() {
      this.email = "";
      this.password = "";
    },
    LogIn() {     
      if (this.errors.items.length != 0) {
        this.errsign = true;
        alert(this.errors)
        return false;
      }
      this.errsign = false;
      let form = {
        email: this.email,
        password: this.password
      };
      Auth.login(form)
        .then(res => {
          var { data } = res;
          if(data){
            this.ClearData();
            this.Openlogin = false;
            this.$store.commit("setClassList", data.classList);
            this.$store.commit("setUserName", data.name);
            this.$store.commit("setIdentity", data.Identity); //page refresh 시 초기화됨
            switch(data.Identity){
              case 1: //학생
                this.$router.push({name: 'main'}) // 로그인 성공후 메인페이지로 이동
                break;  
              case 2: //교수
                this.$router.push({name: 'main'})  // 로그인 성공후 메인페이지로 이동
                break;
              case 3: //관리자
                // 로그인 성공후 관리자페이지로 이동
                break;
            }
          }else{
            alert("로그인 실패")
          }
        })
        .catch(error => {
          alert("error");
        });
    },
    modalChange() {
      this.LoginSign = !this.LoginSign;
      this.validate();
      this.ClearData();
      this.$EventBus.$emit("toggleSign");
    },
    validate: function() {
      this.$validator.validateAll();
    }
  }
};
</script>
