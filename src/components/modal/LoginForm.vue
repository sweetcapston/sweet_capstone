<template>
  <div>
    <sui-button @click="OpenLoginModal" v-show="!logined">로그인</sui-button>
    <sui-modal v-model="Openlogin" id="modal" size="mini">
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
          <sui-button class="Login btn-Login" positive @click="LogIn" id="Login">로그인</sui-button>
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
import Auth from "../../api/Auth";

/* eslint-disable */
export default {
  data() {
    return {
      email: "",
      password: "",
      Openlogin: false,
      errsign: false,
      logined: false
    };
  },
  created() {
    this.$EventBus.$on("toggleLogin", () => {
      this.Openlogin = !this.Openlogin;
    });
  },
  methods: {
    ClearData() {
      this.email = "";
      this.password = "";
    },
    OpenLoginModal() {
      this.Openlogin = !this.Openlogin;
      this.validate();
      this.ClearData();
    },
    LogIn() {
      
      if (this.errors.items.length != 0) {
        this.errsign = true;
        return false;
      }
      this.errsign = false;
      let form = {
        email: this.email,
        password: this.password
      };
      Auth.login(form)
        .then(res => {
          if(res.data){
            this.ClearData();
            this.Openlogin = false;
            alert("로그인 성공")
            console.log(1)
            this.$session.set('token', res.data.token)
            console.log(2)
            this.$store.commit("setIdentity", res.data.Identity);
            switch(res.data.Identity){
              
              case 1: //학생
                console.log(4)
                this.$router.push({name: 'main'}) // 로그인 성공후 메인페이지로 이동
                break;
              case 2: //교수
                break;
              case 3: //관리자
                break;
            }
            console.log(4)
            // this.logined = true;
          }else{
            alert("로그인 실패")
          }
        })
        .catch(error => {
          alert("error");
        });
    },
    modalChange() {
      this.Openlogin = !this.Openlogin;
      this.validate();
      this.ClearData();
      this.$EventBus.$emit("toggleSign");
    },
    change() {
      this.Openlogin = !this.Openlogin;
    },
    validate: function() {
      this.$validator.validateAll();
    }
  }
};
</script>
