<template>
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x
    >
      <template v-slot:activator="{ on }">
        <v-icon class="hidden-md-and-down" color="tertiary" margin="2px" v-on="on">mdi-account-circle</v-icon>
      </template>

      <v-card>
        <v-list>
          <v-list-tile avatar>
            <v-list-tile-avatar :color="`${avatarColor} white--text`">
              <span>{{this.$store.state.userName[0]}}</span>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{this.$store.state.userName}}</v-list-tile-title>
              <v-list-tile-sub-title>{{userID}}</v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn
                :class="fav ? 'red--text' : ''"
                icon
                @click="fav = !fav"
              >
                <v-icon>favorite</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>

        <v-divider></v-divider>

        <v-list v-if="Identity==1">
          <v-list-tile>
            <v-list-tile-title>
                <p>학번</p>
            </v-list-tile-title>
            <v-list-tile-title><p>{{this.$store.state.studentID}}</p></v-list-tile-title>
          </v-list-tile>

        </v-list>

        <v-card-actions>
          <v-btn color="red" flat @click="withdrawUser">회원탈퇴</v-btn>
          <v-btn flat @click="menu = false">취소</v-btn>
          <v-btn color="primary" flat @click="editUser">수정</v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
</template>

<script>
let colorList = ["blue", "purple", "brown", "pink", "navy", "teal", "orange", "indigo", "lime", "deep-purple lighten-3"];
  export default {
    data(){
        return{
            avatarColor: this.$store.state.Identity!=2 ? colorList[parseInt(this.$store.state.studentID[this.$store.state.studentID.length-1])] : "gradient",
            userID:this.$store.state.userID,
            Identity:this.$store.state.Identity,
            fav: true,
            menu: false
        }
    },
    created() {
    },
    methods: {
        editUser(){
          this.menu = false;
          this.$EventBus.$emit("editUser");
        },
        withdrawUser(){
          this.menu = false;
          this.$EventBus.$emit("withdrawUser");
        }
    }
  }
</script>
<style>

.mdi-account-circle{
  margin-left:20%;
}
</style>
