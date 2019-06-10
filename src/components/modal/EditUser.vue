<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">회원 정보 수정</span>
          <!-- <p v-if="!checked">비밀번호를 입력해주세요</p> -->
        </v-card-title>
        <v-divider/>
        <v-card-text>
          <v-layout wrap>
            <div style="width: 100%;">
              <template>
                <v-layout column>
                    <v-flex>
                        <p>비밀번호 확인
                        &nbsp;&nbsp;&nbsp;</p>
                        <v-text-field
                            class="password"
                            hide-details
                            type="password"
                            placeholder="비밀번호를 입력해주세요."
                            solo
                            v-model="password"
                            @keydown.enter="checkPassword()"
                        />&nbsp;&nbsp;&nbsp;
                    </v-flex>
                    <v-flex v-show="checked">
                        <p>이름
                        &nbsp;&nbsp;&nbsp;</p>
                        <v-text-field
                            class="password"
                            hide-details
                            placeholder="비밀번호를 입력해주세요."
                            solo
                            v-model="userName"
                        />&nbsp;&nbsp;&nbsp;
                    </v-flex>
                    <v-flex v-show="checked && Identity==1">
                        <p>학번
                        &nbsp;&nbsp;&nbsp;</p>
                        <v-text-field
                            class="password"
                            hide-details
                            placeholder="비밀번호를 입력해주세요."
                            solo
                            v-model="studentID"
                        />&nbsp;&nbsp;&nbsp;
                    </v-flex>
                    <v-flex v-show="checked">
                        <v-checkbox v-model="newPW" label="비밀번호 변경"></v-checkbox>
                    </v-flex>
                    <v-flex v-show="checked && newPW">
                        <p>새 비밀번호
                        &nbsp;&nbsp;&nbsp;</p>
                        <v-text-field
                            :disabled="newPW == false"
                            class="newPassword"
                            hide-details
                            type="password"
                            placeholder="비밀번호를 입력해주세요."
                            solo
                            name="password"
                            data-vv-as="비밀번호"
                            v-validate="'required|min:6'"
                            @input="validate"
                            ref="password"
                            v-model="newPassword"
                        />&nbsp;&nbsp;&nbsp;
                        <p
                            class="pw-error undraggable unselectable"
                            v-show="errors.has('password') && (newPassword)"
                        >{{errors.first('password')}}</p>
                    </v-flex>
                    <v-flex v-show="checked && newPW">
                        <p>새 비밀번호 확인
                        &nbsp;&nbsp;&nbsp;</p>
                        <v-text-field
                            :disabled="newPW == false"
                            class="newPassword2"
                            hide-details
                            type="password"
                            placeholder="비밀번호를 입력해주세요."
                            solo
                            name="password2"
                            v-validate="'required|confirmed:password'"
                            data-vv-as="비밀번호 확인"
                            @input="validate"
                            v-model="newPassword2"
                        />&nbsp;&nbsp;&nbsp;
                        <p class="p-error"
                        v-show="errors.has('password2') && (newPassword2) "
                        >{{errors.first('password2')}}</p>
                    </v-flex>
                </v-layout>
              </template>
            </div>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">닫기</v-btn>
          <v-btn v-if="!checked" color="blue darken-1" flat @click="checkPassword()">확인</v-btn>
          <v-btn v-else color="blue darken-1" flat @click="editUser">수정</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import {Auth} from "@/api"
import ko from "vee-validate/dist/locale/ko.js";
ko.messages.confirmed = field =>
          `${field.split(" ")[0]}값이 일치하지 않습니다.`;
ko.messages.min = (field, n) => `${field}는 최소 ${n}자리 글자이어야 합니다.`;

let colorList = ["blue", "purple", "brown", "pink", "navy", "teal", "orange", "indigo", "lime", "deep-purple lighten-3"];
  export default {
    data() {
      return {
        dialog:false,
        checked:false,
        avatarColor: this.$store.state.Identity!=2 ? colorList[parseInt(this.$store.state.studentID[this.$store.state.studentID.length-1])] : "gradient",
        userID:this.$store.state.userID,
        userName:this.$store.state.userName,
        studentID:this.$store.state.studentID,
        Identity:this.$store.state.Identity,
        newPW:false,
        password:"",
        newPassword:"",
        newPassword2:"",        
      }
    },
    created() {
        this.$EventBus.$on("editUser", () => {
            this.checked = false;
            this.dialog = true;
            this.password = "";
            this.newPassword = "";
            this.newPassword2 = "";
            this.userID = this.$store.state.userID;
            this.userName = this.$store.state.userName;
            this.newPW = false;
            document.querySelector(".password").classList.remove("v-input--is-disabled")
            document.querySelector(".password .v-input__control .v-input__slot .v-text-field__slot input").disabled = false;
        });
    },

    methods: {
        
        checkPassword(){
            Auth.passwordCheck({
                userID: this.userID,
                password:this.password
            }).then(res => {
                if(res.data){
                    this.checked= true;
                    document.querySelector(".password").classList.add("v-input--is-disabled")
                    document.querySelector(".password .v-input__control .v-input__slot .v-text-field__slot input").disabled = true;
                } else {
                    alert("비밀번호가 올바르지 않습니다.")
                }
            })
        },
        editUser(){
            if(this.newPW && this.errors.items.length!=0 ){
                return;
            }

            if(this.newPassword==this.password){
                alert("기존과 다른 비밀번호를 사용해주세요.")
                return;
            }
            if(this.Identity==1 && this.studentID=="9999"){
                alert("사용할 수 없는 학번입니다.")
                return;
            }
            Auth.editInfo({
                userID:this.userID,
                userName:this.userName,
                studentID:this.studentID,
                password:this.newPassword
            }).then(res => {
                this.$store.commit("setEditData", {
                    userName:res.data.userName,
                    studentID:res.data.studentID
                })
                this.checked = false;
                this.dialog = true;
                this.password = "";
                this.newPassword = "";
                this.newPassword2 = "";
                this.userID = this.$store.state.userID;
                this.userName = this.$store.state.userName;
                this.newPW = false;
                this.dialog = false;
            })
        },
        validate: function() {
            this.$validator.validateAll();
        }
    },
  }
</script>
<style>
.v-dialog{
  border-radius: 10px;
}
.flex p{
  font-size:15px;  
}
</style>
