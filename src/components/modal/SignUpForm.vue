<template>
  <div>
    <sui-modal v-model="RegisterSign" id="modal" size="mini">
      <sui-modal-header class="undraggable unselectable">회원가입</sui-modal-header>
      <div class="grid-container sign">
        <sui-modal-content>
          <div class="sign_body">
            <div class="Name undraggable unselectable">
              <label>이름</label>
              <sui-input
                      placeholder="이름을 입력해주세요"
                      v-model="userName"
                      name="name"
                      v-validate="'required'"
                      data-vv-as="이름"
                      @input="validate"
              />
            </div>
            <p class="n-error" v-show="errors.has('name') && errsign">{{errors.first('name')}}</p>
            <div class="Email undraggable unselectable">
              <label>이메일</label>
              <sui-input
                      type="text"
                      placeholder="이메일을 입력해주세요"
                      v-model="userID"
                      name="email"
                      v-validate="'required|email'"
                      data-vv-as="이메일"
                      @input="validate"
              />
            </div>
            <div class="gridline">
              <sui-button class="duplicate btn-duplicate" @click="IDcheck">중복확인</sui-button>
            </div>
            <p
                    class="e-error"
                    v-show="errors.has('email') && (email || errsign)"
            >{{errors.first('email')}}</p>
            <div class="Password undraggable unselectable">
              <label>비밀번호</label>
              <sui-input
                      type="password"
                      placeholder="비밀번호를 입력해주세요"
                      name="password"
                      v-model="password"
                      v-validate="'required|min:6'"
                      data-vv-as="비밀번호"
                      @input="validate"
                      ref="password"
              />
            </div>
            <p
                    class="pw-error undraggable unselectable"
                    v-show="errors.has('password') && (password || errsign)"
            >{{errors.first('password')}}</p>
            <div class="Password2 undraggable unselectable">
              <label>비밀번호 확인</label>
              <sui-input
                      type="password"
                      placeholder="비밀번호를 확인해주세요"
                      v-model="password2"
                      name="password2"
                      v-validate="'required|confirmed:password'"
                      data-vv-as="비밀번호 확인"
                      @input="validate"
              />
            </div>
            <p
                    class="p-error"
                    v-show="errors.has('password2') && (password2 || errsign) "
            >{{errors.first('password2')}}</p>
          </div>
        </sui-modal-content>
        <div class="sign_IDcheck">
          <div class="StudentId undraggable unselectable">
            <label>학번</label>
            <sui-input
                    type="text"
                    class="ID"
                    placeholder="학번을 입력해주세요"
                    v-model="studentId"
                    name="studentId"
                    v-validate="'required_if:check,false'"
                    data-vv-as="학번"
                    @keypress="numCheck"
                    @input="validate"
            />
          </div>
          <div class="gridline2">
            <sui-checkbox class="IDcheck" v-model="checkbox" ref="check" label="교수" @click="validate"/>
          </div>
          <p
                  class="ID-error"
                  v-show="errors.has('studentId') && errsign"
          >{{errors.first('studentId')}}</p>
        </div>
        <div class="sign_end">
          <sui-button class="Create btn-Create cyan lighten-1" positive @keyup.enter="email_signup" @click="email_signup" id="Create">회원가입</sui-button>
          <p class="modalChange undraggable unselectable">
            이미 회원이세요?
            <a href="javascript:;" @click="modalChange">로그인</a>
          </p>
        </div>
      </div>
    </sui-modal>
  </div>
</template>

<script>
  /* eslint-disable */
  import ko from "vee-validate/dist/locale/ko.js";
  import {Auth} from "@/api";

  ko.messages.email = field => `올바른 ${field} 형식이어야 합니다.`;
  ko.messages.confirmed = field =>
          `${field.split(" ")[0]}값이 일치하지 않습니다.`;
  ko.messages.min = (field, n) => `${field}는 최소 ${n}자리 글자이어야 합니다.`;
  ko.messages.required = field => `${field} 항목은 필수 정보입니다.`;
  ko.messages.required_if = (field, n) => `${field} 항목은 필수 정보입니다.`;
  export default {
    data() {
      return {
        userID: "",
        password: "",
        password2: "",
        userName: "",
        studentId: "",
        duplicate: false,
        errsign: false,
        checkbox: false,
        RegisterSign: true
      };
    },
    watch: {
      checkbox: data => {
        document.getElementsByClassName("ID")[0].classList.toggle("disabled");
      },
      RegisterSign (val) {
        if(!val){
          this.$router.replace({name:'login'});
        }
      }
    },
    methods: {
      numCheck() {
        if (
                event.which &&
                !(event.which > 47 && event.which < 58) &&
                event.which != 8
        ) {
          event.preventDefault();
        }
      },
      ClearData() {
        this.userID = "";
        this.password = "";
        this.password2 = "";
        this.userName = "";
        this.studentId = "";
        this.errsign = false;
        this.checkbox = false;
        this.duplicate = false;
      },
      modalChange() {
        this.validate();
        this.ClearData();
        this.$router.replace('login')

      },
      email_signup() {
        if (this.errors.items.length != 0) {
          alert(this.errors);
          this.errsign = true;
          return false;
        }
        this.errsign = false;
        if (!this.duplicate) {
          alert("아이디 중복확인을 해주세요");
          return false;
        }
        if (this.checkbox == true) this.studentId = "9999";
        let form = {
          userName: this.userName,
          userID: this.userID,
          password: this.password,
          studentId: this.studentId
        };
        Auth.SignUp(form)
                .then(response => {
                  if(response.data == true){
                    this.ClearData();
                    alert("회원가입에 성공했습니다.")
                  }
                  else{
                    alert("회원가입에 실패했습니다.");
                  }
                })
                .catch(error => {
                  alert("error")
                });
        this.$router.push({name:'login'})
      },
      IDcheck: function() {
        this.validate()
        if (!this.errors.has('email')) {
          Auth.duplicate(this.userID)
                  .then(res => {
                    if (res.data == true) {
                      alert("중복된 아이디 입니다.");
                      this.duplicate=false;
                    } else {
                      alert("사용가능한 아이디 입니다.");
                      this.duplicate = true;
                    }
                  })
                  .catch(error => {
                    alert("오류");
                  });
        } else {
          alert("형식을 맞춰주세요")
          return false;
        }
      },
      validate: function() {
        this.$validator.validateAll();
      }
    }
  };
</script>

