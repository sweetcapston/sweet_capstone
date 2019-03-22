<template>
  <div>
    <div is="sui-button-group" id="loginbtn">
      <sui-button @click="Logintoggle">Login</sui-button>
      <sui-button-or id="or"/>
      <sui-button positive @click.native="Signtoggle" id="signbtn">Sign Up</sui-button>
    </div>
    <sui-modal v-model="login" id="modal" size="mini">
      <sui-modal-header>Login to OpenClass</sui-modal-header>
      <div class="grid-container login">
        <sui-modal-content>
          <div class="login_body">
            <div class="Email">
              <sui-input
                type="email"
                placeholder="Email"
                v-model="email"
                name="email"
                v-validate="'required|email'"
                data-vv-as="Email"
              />
            </div>
            <p class="e-error" v-show="errors.has('email') && email">{{errors.first('email')}}</p>
            <div class="Password">
              <sui-input type="password" placeholder="Password" v-model="password"/>
            </div>
          </div>
        </sui-modal-content>
        <div class="login_end">
          <div class="btn-Login">
            <sui-button class="Login" positive @click="LogIn" id="Login">Log In</sui-button>
          </div>
          <div class="btn-GLogin">
            <sui-button
              class="Login"
              icon="google"
              basic
              content="Login with Google"
              @click.native="handleClickGetAuth"
              id="GLogin"
            />
          </div>
          <p class="modalChange">
            Looking to
            <a href="javascript:;" @click="modalChange">create an account</a>
            ?
          </p>
        </div>
      </div>
    </sui-modal>

    <sui-modal v-model="sign" id="modal" size="mini">
      <sui-modal-header>Create an OpenClass Account</sui-modal-header>
      <div class="grid-container sign">
        <sui-modal-content>
          <div class="sign_body">
            <div class="Name">
              <sui-input placeholder="Name" v-model="name"/>
            </div>
            <div class="Email">
              <sui-input
                type="text"
                placeholder="Email"
                v-model="email"
                name="email"
                v-validate="'required|email'"
                data-vv-as="Email"
              />
            </div>
            <p class="e-error" v-show="errors.has('email') && email">{{errors.first('email')}}</p>
            <div class="Password">
              <sui-input type="password" placeholder="Password" v-model="password"/>
            </div>
            <div class="Password2">
              <sui-input
                type="password"
                placeholder="Confirm Password"
                v-model="password2"
                name="password2"
                v-validate="'required|confirmed:password'"
                data-vv-as="Password"
              />
            </div>
            <p
              class="p-error"
              v-show="errors.has('password2') && password != password2"
            >{{errors.first('password2')}}</p>
          </div>
        </sui-modal-content>
        <div class="sign_end">
          <div class="btn-Create">
            <sui-button class="Create" positive @click="email_singup" id="Create">Create Account</sui-button>
          </div>
          <div class="btn-GCreate">
            <sui-button
              class="Create"
              icon="google"
              basic
              content="Sign up with Google"
              @click.native="gmail_singup"
              id="GLogin"
            />
          </div>
          <p class="modalChange">
            Already have an account?
            <a href="javascript:;" @click="modalChange">Login</a>
          </p>
        </div>
      </div>
    </sui-modal>
  </div>
</template>
<script>
/* eslint-disable */
import { mapState } from "vuex";

export default {
  data() {
    return {
      email: "",
      password: "",
      password2: "",
      name: "",
      sign: false,
      login: false
    };
  },
  methods: {
    Logintoggle() {
      this.login = !this.login;
      this.email = "";
      this.password = "";
    },
    Signtoggle() {
      this.sign = !this.sign;
      this.email = "";
      this.password = "";
      this.name = "";
    },
    modalChange() {
      this.login = !this.login;
      this.sign = !this.sign;
      this.email = "";
      this.password = "";
      this.password2 = "";
      this.name = "";
    },
    LogIn() {
      this.login = !this.login;
      this.email = "";
      this.password = "";
    },
    handleClickGetAuth() {
      this.login = !this.login;
      this.email = "";
      this.password = "";
    },
    email_singup() {
      this.sign = !this.sign;
      this.email = "";
      this.password = "";
      this.name = "";
    },
    gmail_singup() {
      this.sign = !this.sign;
      this.email = "";
      this.password = "";
      this.name = "";
    }
  }
};
</script>

<style>
#loginbtn {
  margin-right: 2.5%;
}
#or {
  height: 1em;
  width: 1em;
  margin-top: 0.75em;
}
button.ui.positive.button {
  background: black;
}
button.ui.positive.button:active {
  background: black;
}
button.ui.positive.button:focus {
  background: rgb(63, 62, 62);
}
button.ui.positive.button:hover {
  background: rgb(63, 62, 62);
}
.grid-container {
  display: grid;
}
.grid-container.login {
  grid-template-areas: "login_body" "login_end";
}
.grid-container.sign {
  grid-template-areas: "sign_body" "sign_end";
}
.login_body {
  display: grid;
  grid-template-columns: 0.2fr 3.5fr 0.3fr;
  grid-template-rows: 0.8fr 0.8fr 0.8fr 0.8fr 0.8fr;
  grid-template-areas: ". . . " ". Email ." ". e-error ." ". Password ." ". . .";
  grid-area: login_body;
}
.login_end {
  display: grid;
  grid-template-columns: 0.2fr 3.5fr 0.3fr;
  grid-template-rows: 0.2fr 0.8fr 0.4fr 0.8fr 1fr;
  grid-template-areas: ". . ." ". btn-Login ." ". . ." ". btn-GLogin ." ". modalChange .";
  grid-area: login_end;
}
.sign_body {
  display: grid;
  grid-template-columns: 0.2fr 3.5fr 0.3fr;
  grid-template-rows: 0.8fr 0.8fr 0.8fr 0.8fr 0.8fr 0.8fr 0.8fr 0.8fr 0.8fr;
  grid-template-areas: ". . . " ". Name ." ". . . " ". Email ." ". e-error ." ". Password ." ". . ." ". Password2 ." ". p-error .";
  grid-area: sign_body;
}
.sign_end {
  display: grid;
  grid-template-columns: 0.2fr 3.5fr 0.3fr;
  grid-template-rows: 0.2fr 0.8fr 0.4fr 0.8fr 1fr;
  grid-template-areas: ". . ." ". btn-Create ." ". . ." ". btn-GCreate ." ". modalChange .";
  grid-area: sign_end;
}
.Name {
  grid-area: Name;
}
.Email {
  grid-area: Email;
}
.Password {
  grid-area: Password;
}
.Password2 {
  grid-area: Password2;
}
.e-error {
  grid-area: e-error;
  padding-left: 3px;
  color: rgba(247, 64, 64, 0.816);
  font-size: 80%;
  user-select: none;
}
.p-error {
  grid-area: p-error;
  padding-left: 3px;
  color: rgba(247, 64, 64, 0.816);
  font-size: 80%;
  user-select: none;
}
.modalChange {
  grid-area: modalChange;
  text-align: center;
  padding-top: 5px;
}

.btn-Login {
  grid-area: btn-Login;
}
.btn-GLogin {
  grid-area: btn-GLogin;
}
.btn-Create {
  grid-area: btn-Create;
}
.btn-GCreate {
  grid-area: btn-GCreate;
}
button.Login {
  width: 100%;
}
button.Create {
  width: 100%;
}
.input {
  width: 100%;
}
</style>