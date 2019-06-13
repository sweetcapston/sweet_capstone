<template>
  <v-layout wrap>
    <v-flex xs12 sm12 md7 style="margin: 15px; 15px; 15px; 15px;">
      <material-card color="coralblack" title="차단 요청 목록" text="Black Request List">
        <v-expansion-panel>
          <v-expansion-panel-content v-for="(item,idx) in this.blackReqList" :key="idx">
            <template v-slot:header>
              <v-list-tile :key="idx" avatar ripple>
                <v-list-tile-content>
                  <v-divider/>
                  <v-list-tile-title>교수아이디: {{ item.profID }}</v-list-tile-title>
                  <v-list-tile-sub-title class="text--primary">유저아이디: {{ item.userID }}</v-list-tile-sub-title>
                  <v-list-tile-sub-title>신고내용: {{ item.comment }}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
            <v-layout justify-end style="padding-right: 10px;">
              <v-btn dark @click="acceptReq(idx)">승인</v-btn>
              <v-btn dark @click="denyReq(idx)">거절</v-btn>
            </v-layout>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </material-card>
    </v-flex>

    <v-flex xs12 sm12 md4 style="margin: 15px; 15px; 15px; 15px;">
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
              <v-list-tile-title v-text="item.title"></v-list-tile-title>
              <v-list-tile-sub-title v-text="item.className"></v-list-tile-sub-title>
            </v-list-tile-content>
            <v-btn icon @click="cancleBlack(index)">
              <v-icon color="red" flat>mdi-close</v-icon>
            </v-btn>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Vue from "vue";
import { Admin } from "@/api";
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
            this.blackReqList.push({
              profID: this.blackRequestList[j].BlackList[i].profID,
              userID: this.blackRequestList[j].BlackList[i].userID,
              comment: this.blackRequestList[j].BlackList[i].reason,
              classCode: this.blackRequestList[j].classCode
            });
            if (this.blackRequestList[j].BlackList[i].state == true)
              this.blackList.push(this.blackRequestList[j].BlackList[i]);
          }
        console.log(this.blackReqList);
        // for(let i=0; i<this.blackList.length; i++){
        //   if(this.blackRequestList[i].state==true) this.blackList.push(this.blackRequestList[i]);
        // }
      }
    });
  },
  methods: {
    acceptReq(idx) {
      Admin.acceptBlack(this.blackReqList[idx].userID).then(res => {
        if(res.data==false)  alert('error!');
        else  alert("블랙리스트에 추가합니다.");
      })
      var black = {
        icon: true,
        title:this.blackReqList[idx].userID,
        className: this.blackReqList[idx].profID,
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
      Admin.denyBlack(this.blackReqList[idx].userID, this.blackReqList[idx].classCode).then(res => {
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
        // {
        //   icon: true,
        //   title: "임승배",
        //   className: "캡스톤디자인",
        //   avatar: "https://i.imgur.com/H0vSSvx.png"
        // }
      blackReqList: [],
      blackRequestList: []
      // {
      //   profName: "윤대균교수",
      //   userName: "임승배학생",
      //   comment: "이 친구가 자꾸 쓰레기같은 질문만 올려요."
      // },
      // {
      //   profName: "한경식교수",
      //   userName: "이동진학생",
      //   comment: "이 친구가 자꾸 쓰레기같은 질문만 올려요."
      // }
    };
  }
};
</script>