<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">질문 수정</span>
        </v-card-title>
        <v-divider/>
        <v-card-text>
          <v-layout wrap>
            <div style="width: 100%;">
              <template>
                <v-list-tile avatar>
                  <v-list-tile-avatar :color="`${avatarColor} white--text`">
                    <span>{{$store.state.userName[0]}}</span>
                  </v-list-tile-avatar>

                  <v-text-field
                    v-model="content"
                    hide-details
                    placeholder="Ask a question..."
                    solo
                    @keydown.enter="enrollQuestion"
                  />&nbsp;&nbsp;&nbsp;
                  <input value="false" type="checkbox" v-model="anonymous">
                  <label style="width:36px">익명</label>
                </v-list-tile>
              </template>
            </div>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="editQuestion()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
let colorList = ["blue", "purple", "brown", "pink", "black", "teal", "orange", "indigo", "lime", "deep-purple lighten-3"];
  export default {
    data() {
      return {
        avatarColor: this.$store.state.Identity!=2 ? colorList[parseInt(this.$store.state.studentID[this.$store.state.studentID.length-1])] : "gradient",
        dialog:false,
        question:{},
        anonymous: false,
        content: ""
      }
    },
    created() {
      this.$EventBus.$on("editQuestion", (question) => {
        this.dialog = !this.dialog;
        this.question = question;
        this.content=question.question;
        this.anonymous=question.anonymous;
      });
    },
    methods: {
      editQuestion(){
        this.dialog = false;
        this.question.question = this.content;
        this.question.anonymous = this.anonymous;
        this.$EventBus.$emit("edited", this.question);
      }
    },
  }
</script>
<style>
.v-dialog{
  border-radius: 10px;
}
</style>
