<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">회원 탈퇴</span>
        </v-card-title>
        <v-divider/>
        <v-card-text>
          <v-layout wrap>
            <div style="width: 100%;">
              <template>
                <v-layout column>
                  <v-flex>
                    <p>
                      비밀번호 확인
                      &nbsp;&nbsp;&nbsp;
                    </p>
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
                </v-layout>
              </template>
            </div>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="checkPassword()">확인</v-btn>
          <v-btn color="blue darken-1" flat @click="dialog = false">닫기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>


<script>
import { Auth } from "@/api";
export default {
  data() {
    return {
      dialog: false,
      password: "",
      userID: this.$store.state.userID
    };
  },
  created() {
    this.$EventBus.$on("withdrawUser", () => {
      this.dialog = true;
    });
  },
  methods: {
    withdrawUser() {},
    checkPassword() {
      Auth.passwordCheck({
        userID: this.userID,
        password: this.password
      }).then(res => {
        if (res.data) {
          Auth.withdraw({ userID: this.userID }).then(res => {
            alert('회원탈퇴 되었습니다. 그동안 이용해주셔서 감사합니다!')
            this.$router.push('/');
            });
        } else {
          alert("비밀번호가 올바르지 않습니다.");
        }
      });
    }
  }
};
</script>
