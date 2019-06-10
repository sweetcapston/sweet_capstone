<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">질문 신고</span>
        </v-card-title>
        <v-divider/>
        <v-card-text>
          <v-layout wrap>
            <div style="width: 100%;">
              <template>
                <v-list-tile avatar>
                  <v-text-field
                    v-model="reason"
                    hide-details
                    placeholder="신고 사유를 작성해주세요."
                    solo
                    @keydown.enter="newBlackList()"
                  />&nbsp;&nbsp;&nbsp;
                </v-list-tile>
              </template>
            </div>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="newBlackList()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
let colorList = ["blue", "purple", "brown", "pink", "navy", "teal", "orange", "indigo", "lime", "deep-purple lighten-3"];
  export default {
    data() {
      return {
        avatarColor: this.$store.state.Identity!=2 ? colorList[parseInt(this.$store.state.studentID[this.$store.state.studentID.length-1])] : "gradient",
        dialog:false,
        question:{},
        reason:""
      }
    },
    created() {
      this.$EventBus.$on("blackList", (question) => {
        this.dialog = true;
        this.question = {
            classCode: this.$store.state.currentClass.classCode,
            BlackList: {
                profID:this.userID,
                contents:question.question,
                userID: question.userID,
                userName: question.userName
            },
            QesID:question.QesID
        }
      });
    },
    methods: {
      newBlackList(){
        this.question.BlackList["reason"]=this.reason
        this.$EventBus.$emit("sendBlack", this.question)
        this.dialog = false;
      }
    },
  }
</script>
<style>
.v-dialog{
  border-radius: 10px;
}
</style>
