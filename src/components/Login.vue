<template>
  <div>
    <div v-if="!profile" is="sui-button-group" id="loginbtn">
      <sui-button @click="Logintoggle">Login</sui-button>
      <sui-button-or id="or"/>
      <sui-button positive @click.native="Signtoggle" id="signbtn">Sign Up</sui-button>
    </div>
    <div v-else>profile</div>
    <sui-modal v-model="login" id="modal" size="mini">
      <sui-modal-header>Login to OpenClass</sui-modal-header>
      <div class="grid-container login">
        <sui-modal-content>
          <div class="login_body">
            <div class="Email">
              <sui-input type="email" placeholder="Email" v-model="email" name="email"/>
            </div>
            <div class="Password">
              <sui-input type="password" placeholder="Password" name="password" v-model="password"/>
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
              <sui-input
                placeholder="Name"
                v-model="name"
                name="name"
                v-validate="'required'"
                data-vv-as="Name"
                @input="validate"
              />
            </div>
            <p class="n-error" v-show="errors.has('name') && errsign">{{errors.first('name')}}</p>
            <div class="Email">
              <sui-input
                type="text"
                placeholder="Email"
                v-model="email"
                name="email"
                v-validate="'required|email'"
                data-vv-as="Email"
                @input="validate"
              />
            </div>
            <p
              class="e-error"
              v-show="errors.has('email') && (email || errsign)"
            >{{errors.first('email')}}</p>
            <div class="Password">
              <sui-input
                type="password"
                placeholder="Password"
                name="password"
                v-model="password"
                v-validate="'required|min:6'"
                data-vv-as="Password"
                @input="validate"
                ref="password"
              />
            </div>
            <p
              class="pw-error"
              v-show="errors.has('password') && (password || errsign)"
            >{{errors.first('password')}}</p>
            <div class="Password2">
              <sui-input
                type="password"
                placeholder="Confirm Password"
                v-model="password2"
                name="password2"
                v-validate="'required|confirmed:password'"
                data-vv-as="Confirm Password"
                @input="validate"
              />
            </div>
            <p
              class="p-error"
              v-show="errors.has('password2') && (password2 || errsign) "
            >{{errors.first('password2')}}</p>
          </div>
        </sui-modal-content>
        <div class="sign_end">
          <div class="btn-Create">
            <sui-button class="Create" positive @click="email_signup" id="Create">Create Account</sui-button>
          </div>
          <div class="btn-GCreate">
            <sui-button
              class="Create"
              icon="google"
              basic
              content="Sign up with Google"
              @click.native="gmail_signup"
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
const baseURI = "https://localhost:3000";

export default {
  data() {
    return {
      email: "",
      password: "",
      password2: "",
      name: "",
      errsign: false,
      sign: false,
      login: false,
      profile: false
    };
  },
  methods: {
    ClearData() {
      this.email = "";
      this.password = "";
      this.password2 = "";
      this.name = "";
      this.errsign = false;
    },
    Logintoggle() {
      this.login = !this.login;
      this.validate();
      this.ClearData();
    },
    Signtoggle() {
      this.sign = !this.sign;
      this.validate();
      this.ClearData();
    },
    modalChange() {
      this.login = !this.login;
      this.sign = !this.sign;
      this.ClearData();
    },
    async LogIn() {
      let form = new FormData();
      form.append("email", this.email);
      form.append("password", this.password);
      await this.$http
        .post(`${baseURI}/login`, form)
        .then(response => {
          console.log("response", JSON.stringify(response));
          this.ClearData();
          this.profile = true;
          this.login = false;
        })
        .catch(error => {
          console.log("failed", error);
          alert("로그인 실패")
        });
    },
    async handleClickGetAuth() {
      this.login = !this.login;
      await this.$http
        .get(`${baseURI}/login`)
        .then(response => {
          console.log("response", JSON.stringify(response));
          this.ClearData();
          this.profile = true;
          this.login = false;
        })
        .catch(error => {
          console.log("failed", error);
          alert("로그인 실패")
        });
    },
    async email_signup() {
      if (this.errors.items.length != 0) {
        this.errsign = true;
        return false;
      }
      console.log(this.errors);
      this.errsign = false;
      let form = new FormData();
      form.append("name", this.name);
      form.append("email", this.email);
      form.append("password", this.password);
      await this.$http
        .post(`${baseURI}/signup`, form)
        .then(response => {
          console.log("response", JSON.stringify(response));
          this.ClearData();
          this.sign = false;
        })
        .catch(error => {
          console.log("failed", error);
          alert("회원가입 실패")
        });
    },
    async gmail_signup() {
      this.sign = !this.sign;
      this.ClearData();
      await this.$http
        .get(`${baseURI}/signup`)
        .then(response => {
          console.log("response", JSON.stringify(response));
        })
        .catch(error => {
          console.log("failed", error);
          alert("회원가입 실패")
        });
    },
    validate: function() {
      this.$validator.validateAll();
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
  grid-template-areas: ". . . " ". Email ." ". . ." ". Password ." ". . .";
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
  grid-template-areas: ". . . " ". Name ." ". n-error . " ". Email ." ". e-error ." ". Password ." ". pw-error ." ". Password2 ." ". p-error .";
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
.n-error {
  grid-area: n-error;
  padding-left: 3px;
  color: rgba(247, 64, 64, 0.816);
  font-size: 80%;
  user-select: none;
}
.e-error {
  grid-area: e-error;
  padding-left: 3px;
  color: rgba(247, 64, 64, 0.816);
  font-size: 80%;
  user-select: none;
}
.pw-error {
  grid-area: pw-error;
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
.has-error {
  background: #843534;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
}
</style>