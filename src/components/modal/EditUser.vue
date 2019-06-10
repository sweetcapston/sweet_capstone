<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">회원 ㅈ어보 수정</span>
        </v-card-title>
        <v-divider/>
        <v-card-text>
          <v-layout wrap>
            <div style="width: 100%;">
              <template>
                <v-list-tile avatar>
                  <v-list-tile-avatar color="gradient white--text" large fill-dot>
                    <img src="https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-4.3b7e38ed.jpg">
                  </v-list-tile-avatar>

                  <v-text-field
                    hide-details
                    placeholder="Ask a question..."
                    solo
                    @keydown.enter="editUser()"
                  />&nbsp;&nbsp;&nbsp;
                  <input value="false" type="checkbox" >
                  <label style="width:36px">익명</label>
                </v-list-tile>
              </template>
            </div>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="editUser()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
  export default {
    data() {
      return {
        dialog:false,
        userID:"",
        userName:"",
        password:"",
        newPassword:"",
        newPassword2:"",        
      }
    },
    created() {
        this.$EventBus.$on("editUser", () => {
            this.dialog = true;
            // this.user = this.$store.state.
        });
    },
    methods: {
      editUser(){
        
        // this.$EventBus.$emit("editUser", this.question);
      }
    },
  }
</script>
<style>
.v-dialog{
  border-radius: 10px;
}
</style>
