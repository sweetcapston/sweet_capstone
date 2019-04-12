<template>
  <div>
    <sui-button @click="OpenLoginModal">로그인</sui-button>
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
      errsign: false
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

    async LogIn() {
      if (this.errors.items.length != 0) {
        this.errsign = true;
        return false;
      }
      this.errsign = false;
      let form = {
        email: this.email,
        password: this.password
      };
      await Auth.login(form)
        .then(res => {
          console.log(res);
          this.ClearData();
          this.Openlogin = false;
        })
        .catch(error => {
          console.log("failed", error);
          alert("로그인 실패");
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

<style>
.header {
  text-align: center;
}
.grid-container {
  display: grid;
}
.grid-container.login {
  grid-template-areas: "login_body" "login_end";
}
.login_body {
  display: grid;
  grid-template-columns: 0.3fr 3.5fr 0.3fr;
  grid-template-rows: 0.4fr 1.1fr 0.6fr 1.1fr 0.4fr;
  grid-template-areas: ". . . " ". Email ." ". e-error ." ". Password ." ". pw-error .";
  grid-area: login_body;
}
.login_end {
  display: grid;
  grid-template-columns: 0.3fr 3.5fr 0.3fr;
  grid-template-rows: 0.2fr 1fr 0.4fr 1fr;
  grid-template-areas: ". . ." ". btn-Login ." ". . ." ". modalChange .";
  grid-area: login_end;
}
.Email {
  grid-area: Email;
}
.Password {
  grid-area: Password;
}

.modalChange {
  grid-area: modalChange;
  text-align: center;
  padding-top: 5px;
}

.btn-Login {
  grid-area: btn-Login;
}
button.Login {
  width: 100%;
  font-size: 80%;
}
.ui.input {
  margin-top: 1%;
}
.input {
  width: 100%;
}
</style>