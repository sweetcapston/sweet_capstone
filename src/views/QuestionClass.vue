<template>
  <v-layout row wrap fill-height>
    <v-flex xs12 sm12 md12 lg9 xl9>
      <div id="chat-container">
        <div id="chat-title">
          <span>질문 클래스</span>
        </div>

        <div id="chat-message-list" v-if="questionList.length!=0">
          <template v-for="(ques,index) in questionList">
            <v-flex  id="message" :key="ques.index">
              <v-subheader v-if="ques.header" :key="ques.header" inset>{{ ques.header }}</v-subheader>
              <v-divider/>
              <v-list-tile id="auto_height" :key="ques.title">
                <v-speed-dial
                v-if="ques.userID == userID || $store.state.Identity == 2"
                v-model="fab[index]"
                absolute
                small
                :direction="'left'"
                :open-on-hover="false"
                :transition="'slide-x-reverse-transition'"
                @click="floating(index)"
                >
                  <template v-slot:activator>
                    <v-btn
                      class="fab questionFab"
                      v-model="fab[index]"
                      color="transparent"
                      fab
                    >
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>
                  <v-btn
                    v-model="fab[index]"
                    fab
                    dark
                    small
                    color = "red"
                    class="questionFab"
                    @click="deleteQuestion(ques.QesID)"
                  >
                    <v-icon>delete</v-icon>
                  </v-btn>
                  <v-btn
                    v-show="ques.userID == userID"
                    v-model="fab[index]"
                    fab
                    dark
                    small
                    class="questionFab"
                    color="green"
                    @click="editQuestion(ques)"
                  >
                    <v-icon>edit</v-icon>
                  </v-btn>
                </v-speed-dial>
                <v-layout id ="textDiv">
                  <v-list-tile-avatar>
                    <img :src="image">
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                    <v-layout id="full-width">
                      <v-flex xs6 sm4 md5 lg5 xl5>
                        <v-card v-if="!ques.anonymous" flat>{{ques.userName}}</v-card>
                        <v-card v-else flat>익명</v-card>
                      </v-flex>

                      <v-flex xs12 sm8 md7 lg7 xl7 style="text-align: end">
                        <v-card flat>{{ques.date}}</v-card>
                      </v-flex>
                    </v-layout>
                    <v-layout id="full-width">
                      <v-flex xs11 sm11 md11 lg11 xl11>
                        <span>{{ques.question}}</span>
                      </v-flex>
                      <v-flex xs1 sm1 md1 lg1 xl1 style="text-align: end">
                        <v-icon @click="unlike(ques.QesID)" class="red--text" small v-if="ques.likeList.indexOf(userID)!=-1">mdi-heart</v-icon>
                        <v-icon @click="like(ques.QesID)" small v-else>mdi-heart</v-icon>
                        <span v-if="ques.likeList.length == 0">    </span>
                        <span v-else>{{` ${padding(ques.likeList.length)}`}}</span>
                      </v-flex>
                    </v-layout>
                  </v-list-tile-content>
                </v-layout>
              </v-list-tile>
            </v-flex>
          </template>
        </div>
        <div id="chat-message-list" v-else>
          <v-img :src="require('@/assets/openClass.png')" height="100"><div><h1>이곳에다가 질문을 하세요.</h1></div></v-img>
        </div>
        <div id="chat-form">
          <template>
            <v-list-tile avatar>
              <v-list-tile-avatar color="gradient white--text" large fill-dot>
                <img :src="image">
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
              <v-btn
                class="hidden-sm-and-down cyan lighten-1 white--text"
                depressed
                @click="enrollQuestion"
                style="margin-left: 10px"
              >질문등록</v-btn>
            </v-list-tile>
          </template>
        </div>
      </div>
    </v-flex>
    <modal-edit-question v-bind:dialog="dialog" v-bind:ques="question"/>
    <v-flex xs6 sm6 md6 lg3 xl3 id="list-container" class="hidden-md-and-down">
      <div id="search-container">
        <span>클래스 접속자</span>
      </div>
      <div class="scroll" id="conversation-list">
        <div class="conversation" v-for="(user, i) in userList" :key="i">
          <img :src="require(`@/assets/${user.image}.png`)" height="100%">
          <div class="user-name">{{user.userName}}</div>
          <div class="user-identity">{{user.value}}</div>
        </div>
      </div>
      <div id="new-message-container"></div>
    </v-flex>
  </v-layout>
</template>

<script>
/* eslint-disable */
import { continueStatement } from "@babel/types";
import { Stud,Prof } from "@/api";
import Vue from "vue";
import store from "@/store.js";
import { URL } from "@/plugins/api.config.js";
import io from "socket.io-client";

export default {
  beforeCreate() {
    Stud.loadQuestion(this.$store.state.currentClass.classCode).then(res => {
      if (res.data === "false") alert("질문 가져오기 실패");
      else {
        this.questionList = res.data.questionList;
        this.fab = new Array(this.questionList.length).fill(false)
        this.socket.emit("channelJoin", {
          classCode: this.$store.state.currentClass.classCode,
          Identity: this.$store.state.Identity,
          userID: this.userID,
          userName: this.$store.state.userName
        });
      }
    });
  },
  data() {
    return {
      events: [],
      first:false,
      image:
        "https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-4.3b7e38ed.jpg",
      userList: [],
      dialog:false,
      nonce: 0,
      oldList:[],
      questionList: [],
      content: null,
      socket: io(`${URL}:3000/question`),
      anonymous: false,
      userID:this.$store.state.userID, 
      question:{},
      fab:[]
    };
  },
  created() {
    this.$EventBus.$on("edited", question => {
      this.edited(question);
    })
    if ("serviceWorker" in navigator && "PushManager" in window) {
      navigator.serviceWorker
        .register("../../service-worker.js")
        .then(function(swReg) {
          console.log("Service Worker is registered", swReg);
        })
        .catch(function(error) {
          console.error("Service Worker Error", error);
        });
    }
    this.socket.on("connect", () => {
      console.log("socket connected");
    });
    this.socket.on("like", (data) => {
      const { QesID, userID } = data
      this.questionList.forEach(question => {
        if(question.QesID == QesID){
          question.likeList.push(userID);
        }
      })
    });
    this.socket.on("unlike", (data) => {
      const { QesID, userID } = data
      this.questionList.forEach(question => {
        if(question.QesID == QesID){
          question.likeList.splice(question.likeList.indexOf(userID), 1)
        }
      })
    });
    this.socket.on("joinSuccess", data => {
      const { Identity, userName, userID } = data;
      if (Identity == 1)
        this.userList.push({
          userName: userName,
          value: "학생",
          ID: userID,
          image: "student"
        });
      else
        this.userList.unshift({
          userName: userName,
          value: "교수",
          ID: userID,
          image: "professor"
        });
    });
    this.socket.on("getUsers", data => {
      const users = data;
      for (var i = 0; i < users.length - 1; i++) {
        const user = users[i];
        if (user.Identity == 1) {
          this.userList.push({
            userName: user.userName,
            value: "학생",
            ID: user.userID,
            image: "student"
          });
        } else {
          this.userList.unshift({
            userName: user.userName,
            value: "교수",
            ID: user.userID,
            image: "professor"
          });
        }
      }
    });
    this.socket.on("MESSAGE", data => {
      const{anonymous, userID, userName, studentID, QesID, classCode, question, date} = data
      this.questionList.push({
        anonymous: anonymous,
        userID: userID,
        userName: userName,
        studentID: studentID,
        likeList:[],
        QesID:QesID,
        classCode: classCode,
        question: question,
        date: date
      });
      this.notification(data);
    });
    this.socket.on("delete", data => {
      const {QesID} = data;
      this.questionList.forEach(question => {
        if(question.QesID == QesID){
          this.questionList.splice(this.questionList.indexOf(question), 1);
        }
      })
    })
    this.socket.on("edit", data => {
      this.questionList.forEach(question => {
        if(question.QesID == data.QesID){
          question.question = data.question;
          question.anonymous = data.anonymous;
        }
      })
    })
  },
  updated() {
    if(this.oldList != this.questionList || !this.first){
      document.querySelector(
        "#chat-message-list"
      ).scrollTop = document.querySelector("#chat-message-list").scrollHeight;
      this.oldList = this.questionList;
      this.first = true;
    }
  },

  beforeRouteLeave(to, from, next) {
    this.socket.emit("diconnect");
    this.socket.disconnect();
    next();
  },
  mounted() {
    window.setTimeout(() => {
      this.socket.emit("getUsers", {
        socketID: this.socket.id,
        classCode: this.$store.state.currentClass.classCode
      });
    }, 1500);
    this.socket.on("disconnect", data => {
      const { Identity, userName, userID } = data;
      let user;
      for (let idx in this.userList) {
        if (this.userList[idx].ID == userID) {
          this.userList.splice(idx, 1);
          break;
        }
      }
    });
  },
  methods: {
    floating: function(index){
      this.$set(this.fab, index, !this.fab[index]);
    },
    padding: function(number){
      return (number < 10 ? ' ' : '') + number;
    },
    like(QesID) {
      this.socket.emit("like", {
        userID: this.userID,
        QesID: QesID
      })
    },
    unlike(QesID) {
      this.socket.emit("unlike", {
        userID: this.userID,
        QesID: QesID
      })
    },
    blackListAdd(QesID,contents){
      const blackList={
        QesID:QesID,
        contents:contents,
        profID: this.$store.state.userID}
      Prof.blackListAdd(this.$store.state.currentClass.classCode,blackList)
              .then(res=>{

      })
    },
    alarmActive() {
      Prof.alarm(this.$store.state.currentClass.classCode,this.class.alarm)
              .then(res => {
        //this.class.active = res.data;
      });
    },
    notification(data) {
      const cursor = this;
      let getTime = new Date();
      if (
        Notification &&
        Notification.permission === "granted" &&
        data &&
        this.$store.state.Identity == 2
        //&& this.class.alarm
      ) {
        navigator.serviceWorker.getRegistration().then(function(reg) {
          const title = "OPEN CLASS❤️";
          var options = {
            body: `${data.question}`,
            //1px = 0.02645833333333 cm
            image: "/images/notify.jpg", //720px (width) by 240px (height)
            icon: "/images/logo.png", //android는 192px   512 512
            badge: "/images/logo-128x128.png", //72px
            tag: getTime,
            actions: [
              {
                action: "off-action",
                title: "알림끄기 추가할 예정",
                icon: "/images/logo.png"
              },
              {
                action: "new-action",
                title: "새 창에서 열기",
                icon: "/images/logo.png"
              }
            ],
            vibrate: [100, 50, 100], //movile에서만 가능
            data: {
              classCode: cursor.$store.state.currentClass.classCode
            }
          };
          reg.showNotification(title, options)
            .then(() => reg.getNotifications())
            .then(notifications => {
              setTimeout(
                () =>
                  notifications.forEach(notification => {
                    if (notification.tag == getTime) notification.close();
                  }),
                3000
              );
            });
        });
      }
    },
    deleteQuestion(QesID){
      this.socket.emit("delete", QesID)
    },
    editQuestion(question){
      this.$EventBus.$emit("editQuestion", question);
    },
    edited(question){
      this.socket.emit("edit", question)
    },
    enrollQuestion(event) {
      // alert("yes");
      event.preventDefault();
      let moment = require("moment");
      moment.locale("ko");
      if(this.content == null) {
        return 
      }
      this.socket.emit("chat", {
        classCode: this.$store.state.currentClass.classCode,
        userID: this.$store.state.userID,
        userName: this.$store.state.userName,
        studentID: this.$store.state.studentID,
        question: this.content,
        anonymous: this.anonymous,
        date: moment().format("LLL")
      });
      this.content = null;
    }
  }
};
</script>


<style>
#message {
  flex: 0 0;
}
#full-width {
  width: 100%;
}

#auto_height {
  height: auto;
  padding-top: 12px;
  padding-bottom: 12px;
  padding-right:0px;
  padding-left:0px;
}
#textDiv{
  padding-right:20px;
  padding-left:16px;
}
.user-identity {
  color: #ddd;
  font-size: 1rem;
  margin-top: 10px;
}
.gradient {
  background: linear-gradient(100deg, #9198e5, #26c6da);
}
.user-name {
  font-weight: bold;
  color: #eee;
  padding-left: 5px;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
  margin-top: 10px;
}

#chat-container {
  display: grid;
  grid:
    "chat-title search-container" 8%
    "chat-message-list conversation-list" 1fr
    "chat-form new-message-container" 8%
    / 1fr 2px;
  width: 100%;
  height: 90vh;
  max-height: 100vh;
  background: #fff;
  border-radius: 10px 0 0 10px;
  border: 0.5px solid rgb(192, 189, 189);
}
#chat-title {
  display: grid;
  grid: 36px /1fr 36px;
  align-content: center;
  align-items: center;
  grid-area: chat-title;
  color: #0048aa(34, 63, 63);
  font-weight: bold;
  font-size: 1.6rem;
  border-radius: 10px 0px 0px 0px;
  box-shadow: 1px 1px 3px -1px black;
  padding: 0 30px;
}
#chat-message-list {
  grid-area: chat-message-list;
  display: flex;
  flex-direction: column;
  padding: 0 3px;
  margin-top: 3px;
  overflow-y: scroll;
}

#chat-form {
  display: grid;
  grid-area: chat-form;
  align-content: center;
  align-items: center;
  grid-gap: 15px;
  border-radius: 0 0 0 10px;
  border-top: 1px solid rgba(0, 0, 0, 0.25);
}
#search-container {
  display: grid;
  align-items: center;
  justify-content: center;
  background: rgb(5, 161, 161);
  padding: 0 20px;
  height: 8%;
  border-radius: 0 10px 0 0;
  box-shadow: 0 1px 3px -1px rgba(0, 0, 0, 0.75);
  z-index: 1;
  border-bottom: 1px solid #ddd;
}
#search-container span {
  color: #eee;
  font-weight: bold;
  border: 0;
  font-size: 1.25rem;
  background-position: 15px center;
  background-size: 20px 20px;
}
#conversation-list {
  height: 75vh;
  max-height: 100vh;
  background: rgb(23, 179, 179);
  overflow-y: scroll;
}
.conversation {
  display: grid;
  grid-template-columns: 40px 1fr max-content;
  color: #ddd;
  grid-gap: 10px;
  font-size: 1.3rem;
  border-bottom: 1px solid #ddd;
  padding: 10px 10px 12px 15px;
}
.conversation.active {
  background: #111;
}
.conversation:hover {
  cursor: pointer;
  background: #111;
}
.conversation > img {
  height: 40px;
  width: 40px;
  border-radius: 100%;
}

#new-message-container {
  display: grid;
  grid: 40px / 40px;
  align-content: center;
  grid-area: new-message-container;
  background: rgb(5, 161, 161);
  border-top: 1px solid #ddd;
  border-radius: 0 0 10px 0;
  height: 8.2%;
  padding: 0 15px;
}
#chat-message-list::-webkit-scrollbar {
  width: 5px;
}
#chat-message-list::-webkit-scrollbar-track {
  background: 0px;
}
#conversation-list::-webkit-scrollbar {
  width: 5px;
}
#conversation-list::-webkit-scrollbar-track {
  background: 0;
}
.v-text-field.v-text-field--solo .v-input__control {
  min-height: 36px;
}
.mdi-heart:hover{
  transform: scale(1.2)
}
.mdi-dots-vertical{
  font-size: 18px;
  position: relative;
  width:18px !important;
  top:-2px
}
.mdi-dots-vertical:hover{
  transform: scale(1.2)
}
.questionFab{
  border-radius: 50% !important;
}
.v-btn.v-btn--floating.v-btn--small{
  margin:8px;
  padding:3px !important;
  top:5px;
}
/* .v-btn.v-btn--active.v-btn--floating.v-btn--small.theme--dark.green > .v-btn__content{ */
  /* width:18px !important; */
/* } */
.fab > .v-btn__content{
  width:18px !important;
}
.fab{
  padding: 3px !important;
  width:20px !important;
  height:20px !important;
}
.v-speed-dial{
  top:0px ;
  right:0px;
}
.v-btn:not(.v-btn--depressed):not(.v-btn--flat){
  box-shadow: none;
  -webkit-box-shadow:none;
}
.v-btn--floating:not(.v-btn--depressed):not(.v-btn--flat){
  box-shadow: none;
  -webkit-box-shadow:none;
}
.v-btn:not(.v-btn--depressed):not(.v-btn--flat){
  box-shadow: none;
  -webkit-box-shadow:none;
}
.v-icon.material-icons.theme--dark{
  font-size: 18px !important;
}
</style>
