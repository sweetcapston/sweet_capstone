<template>
  <v-layout row fill-height>
    <v-flex xs12 sm12 md12 lg9 xl9>
      <div id="chat-container">
        <div id="chat-title">
          <span>질문 클래스</span>
        </div>

        <div id="chat-message-list">
          <template v-for="(ques) in questionList">
            <v-flex id="message" :key="ques.index" class="margin">
              <v-subheader v-if="ques.header" :key="ques.header" inset>{{ ques.header }}</v-subheader>

              <v-divider/>
              <v-list-tile id="auto_height" :key="ques.title">
                <v-list-tile-avatar>
                  <img :src="image">
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-layout  class="hidden-sm-and-down">
                    <v-flex row>{{ques.userName}}</v-flex> 
                    <div>{{ques.date}}</div> 
                  </v-layout>
                  <span>
                    {{ques.question}}
                  </span>
                  
                </v-list-tile-content>
            </v-list-tile>
            

            </v-flex>
          </template>
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
              <v-btn dark class="mx-0" depressed @click="enrollQuestion">질문등록</v-btn>
            </v-list-tile>
          </template>
        </div>
      </div>
    </v-flex>






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
import { Stud } from "@/api";
import { continueStatement } from "@babel/types";
/* eslint-disable */
export default {
  beforeCreate() {
    Stud.loadQuestion(this.$store.state.currentClass.classCode).then(res => {
      if (res.data === "false") alert("질문 가져오기 실패");
      else {
        this.questionList = res.data.questionList;

        console.log(res.data.questionList);
      }
    });
  },
  created() {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      navigator.serviceWorker
        .register("../../service-worker.js")
        .then(function(swReg) {
          console.log("Service Worker is registered", swReg);
        })
        .catch(function(error) {
          console.error("Service Worker Error", error);
        });
    } else {
      // console.warn("Push messaging is not supported");
      // pushButton.textContent = "Push Not Supported";
    }
  },
  updated() {
    document.querySelector("#chat-message-list").scrollTop = document.querySelector("#chat-message-list").scrollHeight
  },
  data() {
    return {
      events: [],
      image:
        "https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-4.3b7e38ed.jpg",
      userList: [
        { userName: "윤대균", value: "교수", image: "professor" },
        { userName: "임총배", value: "학생", image: "student" },
        { userName: "박종환", value: "학생", image: "student" },
        { userName: "이동진", value: "학생", image: "student" },
        { userName: "이송아", value: "학생", image: "student" },
        { userName: "박종환", value: "학생", image: "student" },
        { userName: "이동진", value: "학생", image: "student" },
        { userName: "박종환", value: "학생", image: "student" },
        { userName: "이동진", value: "학생", image: "student" },
        { userName: "박종환", value: "학생", image: "student" },
        { userName: "이동진", value: "학생", image: "student" }
      ],
      content: null,
      questionList: []
    };
  },
  sockets: {
    // USER: function(data) {
    //   this.userList.push({
    //     userID: data.userID,
    //     userName: data.userName,
    //     studentId: data.studentId
    //   });
    // },
    MESSAGE: function(data) {
      console.log(data)
      this.questionList.push({
        anonymous: data.anonymous,
        userID: data.userID,
        userName: data.userName,
        classCode: data.classCode,
        question: data._question,
        date: data.date
      });
      this.notification(data)
    }
  },
  methods: {
    notification(data){
      const cursor = this;
      let getTime = new Date();
      if (
        Notification &&
        Notification.permission === "granted" &&
        data &&
        this.$store.state.Identity == 2
      ) {
          navigator.serviceWorker.getRegistration().then(function(reg) {
            const title = "OPEN CLASS❤️";
            var options = {
              body: `${data._question}`,
              //1px = 0.02645833333333 cm
              image: "/images/24283C3858F778CA2E.jpg", //720px (width) by 240px (height)
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
            reg
              .showNotification(title, options)
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
    enrollQuestion(event) {
      // alert("yes");
      event.preventDefault();
      const time = new Date();
      let T = time.getFullYear().toString()+'-'+(time.getMonth()+1).toString()
            +'-'+time.getDate().toString()+" "+time.getHours().toString()+":"+time.getMinutes().toString();
      let moment = require('moment');
      moment.locale('ko');
      this.$socket.emit("chat", {
        classCode: this.$store.state.currentClass.classCode,
        userID: this.$store.state.userID,
        userName: this.$store.state.userName,
        _question: this.content,
        anonymous: false,
        date: moment().format('LLL')
      });
      this.content = null;
    }
  }
};
</script>


<style>
#auto_height{
  height: auto;
}

.user-identity {
  color: #ddd;
  font-size: 1rem;
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
}
.apply-size {
  min-width: 10px;
  height: 120px;
  background:lawngreen;
  white-space: normal;
}
#chat-container {
  display: grid;
  grid:
    "chat-title search-container" 2fr
    "chat-message-list conversation-list" 23fr
    "chat-form new-message-container" 2.62fr
    / 12fr 2px;
  width: 100%;
  height: 88.5%;
  background: #fff;
  border-radius: 10px 0 0px 10px;
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
  background: rgb(42, 139, 83);
  padding: 0 20px;
  height: 6.6%;
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
  height: 74.6%;
  background: rgb(44, 156, 91);
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
  grid-row: span 2;
  height: 40px;
  width: 40px;
  border-radius: 100%;
}

#new-message-container {
  display: grid;
  grid: 40px / 40px;
  align-content: center;
  grid-area: new-message-container;
  background: rgb(42, 139, 83);
  border-top: 1px solid #ddd;
  border-radius: 0 0 10px 0;
  height: 7.3%;
  padding: 0 15px;
}
</style>
