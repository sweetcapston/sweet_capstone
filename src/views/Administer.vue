<template>
 <v-app>  
    <v-container>
      <v-toolbar
        class="gradient white--text"
        height="50px"
        app 
        flat   
      >
        <v-toolbar-title class="headline text-uppercase">
          <img class="logo" :src="require('@/assets/logo_white.png')" height="40" />
          <span class="hidden-md-and-down username"> {{this.$store.state.userName}} </span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <modal-profile/>
        <v-btn
          flat
          @click="logout"
        >
          <span class="mr-2 white--text" >logout</span>
        </v-btn>
      </v-toolbar>     
      <br>
      <br>
      <v-layout justify-center>
        <img :src="logo" height="150" />
      </v-layout>
      <br/>
      
  <v-layout wrap>
    <v-flex xs12 sm12 md7 lg7 xl7 style="margin: 15px; 15px; 15px; 15px;">
      <material-card color="coralblack" title="차단 요청 목록" text="Black Request List">
        <v-expansion-panel>
          <v-expansion-panel-content v-for="(item,idx) in this.blackReqList" class="adminList" :key="idx">
            <template v-slot:header>
              <v-list-tile :key="idx" class="adminList2" avatar ripple style="height:100%">
                <v-list-tile-content style="height:100%">
                  <v-divider/>
                  <v-list-tile-title style="height:100%">교수아이디: {{ item.profID }}</v-list-tile-title>
                  <v-list-tile-sub-title style="height:100%" class="text--primary">유저아이디: {{ item.userID }}</v-list-tile-sub-title>
                  <v-list-tile-sub-title style="height:100%">신고사유: {{ item.comment }}</v-list-tile-sub-title>
                  <v-list-tile-sub-title style="height:100%">신고내용: {{ item.contents }}</v-list-tile-sub-title>
                  
                </v-list-tile-content>
                <v-btn icon @click="cancleBlack(index)">
                  <v-icon color="red" flat>mdi-close</v-icon>
                </v-btn>
              </v-list-tile>
            </template>
            <v-layout justify-end style="padding-right: 10px;">
              <v-btn dark @click="acceptReq(idx)">승인</v-btn>
              <v-btn dark @click="cancleBlack(index)">거절</v-btn>
            </v-layout>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </material-card>
    </v-flex>

    <v-flex xs12 sm12 md4 lg4 xl4 style="margin: 15px; 15px; 15px; 15px;">
      <v-card style="margin-top: 24px;">
        <v-toolbar dark>
          <v-toolbar-title>차단 목록</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-list>
          <v-list-tile v-for="(item, index) in blackList" :key="item.title" avatar>
            <v-list-tile-action>
              <v-icon v-if="item.icon" color="silver">block</v-icon>
            </v-list-tile-action>
            <v-list-tile-avatar>
              <img :src="item.avatar">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-text="item.userID"></v-list-tile-title>
              <v-list-tile-sub-title v-text="item.classCode"></v-list-tile-sub-title>
            </v-list-tile-content>
            <v-btn icon @click="cancleBlack(index)">
              <v-icon color="red" flat>mdi-close</v-icon>
            </v-btn>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
  </v-container>
  </v-app>
</template>

<script>
import Vue from "vue";
import { Admin, Auth } from "@/api";
import { URL } from "@/plugins/api.config.js";
/*eslint-disable */

export default {
  created() {
    Admin.loadBlackList().then(res => {
      if (res.data == false) {
        alert("블랙리스트 데이터 get 실패");
      } else {
        // TODO: 블랙리스트 데이터 받기.
        this.blackRequestList = res.data.blackList;

        console.log(this.blackRequestList[0].BlackList);

        for (let j = 0; j < this.blackRequestList.length; j++)
          for (let i = 0; i < this.blackRequestList[j].BlackList.length; i++) {
            if(this.blackRequestList[j].BlackList[i].state == false)
            this.blackReqList.push({
              profID: this.blackRequestList[j].BlackList[i].profID,
              userID: this.blackRequestList[j].BlackList[i].userID,
              comment: this.blackRequestList[j].BlackList[i].reason,
              contents: this.blackRequestList[j].BlackList[i].contents,
              classCode: this.blackRequestList[j].classCode
            });
            else if (this.blackRequestList[j].BlackList[i].state == true)
              this.blackList.push({
                profID: this.blackRequestList[j].BlackList[i].profID,
                userID: this.blackRequestList[j].BlackList[i].userID,
                comment: this.blackRequestList[j].BlackList[i].reason,
                classCode: this.blackRequestList[j].classCode,
                avatar: "https://i.imgur.com/H0vSSvx.png",
                icon: true,
                });
          }
        console.log(this.blackList);
        // for(let i=0; i<this.blackList.length; i++){
        //   if(this.blackRequestList[i].state==true) this.blackList.push(this.blackRequestList[i]);
        // }
      }
    });
  },
  methods: {
    logout(){
      this.$session.destroy();
      Auth.logout().then(res => {
        if(res.data == "logout"){
          this.$store.commit('removeLoginData');
          this.$router.push({name: 'login'});
        }
      })
    },
    acceptReq(idx) {
      Admin.acceptBlack(this.blackReqList[idx].userID, this.blackReqList[idx].classCode).then(res => {
        if(res.data==false)  alert('error!');
        else  alert("블랙리스트에 추가합니다.");
      })
      var black = {
        icon: true,
        userID:this.blackReqList[idx].userID,
        profID: this.blackReqList[idx].profID,
        classCode: this.blackReqList[idx].classCode,
        avatar: "https://i.imgur.com/H0vSSvx.png"
      };
      this.blackReqList.splice(idx, 1);
      this.blackList.push(black);
    },
    denyReq(idx) {
      Admin.denyBlack(this.blackReqList[idx].userID, this.blackReqList[idx].classCode).then(res => {
        if(res.data==false)  alert('error!');
        else  alert("블랙요청을 거절합니다.");
      })
      this.blackReqList.splice(idx, 1);
      // 블랙리스트에서 삭제 되도록 서버로 전송.
    },
    cancleBlack(idx) {
      Admin.deleteBlack(this.blackList[idx].userID, this.blackList[idx].classCode).then(res => {
        if(res.data==false)  alert('error!');
        else  alert("블랙리스트에서 삭제합니다.");
      })
      this.blackList.splice(idx, 1);
      // 블랙리스트에서 삭제 되도록 서버로 전송.
    }
  },
  data() {
    return {
      blackList: [],
      blackReqList: [],
      blackRequestList: []

    };
  },
  computed: {
    logo() {
      return require("@/assets/logo_black_animation.svg")
    }
  }
};
</script>
<style>
.adminList > .v-expansion-panel__header{
  height:100px;
}
.adminList2 > .v-list__tile.v-list__tile--avatar.theme--light{
  height: 100%;
}
</style>
