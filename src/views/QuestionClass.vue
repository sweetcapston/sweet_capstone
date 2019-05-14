<template>
  <v-layout>
    <v-flex xs6 sm2 md6 lg9 xl9>
      <v-list two-line>
        <template v-for="(ques) in questionList">
              <v-list-tile :key="ques.title" avatar ripple>
            <v-list-tile-avatar>
              <img :src="image">
            </v-list-tile-avatar>
          <!-- <v-subheader v-if="ques.header" :key="ques.header" inset>{{ ques.header }}</v-subheader>
          <v-divider v-else-if="ques.divider" :key="index" inset></v-divider>

          <v-list-tile v-else :key="ques.title" avatar ripple>
            <v-list-tile-avatar>
              <img :src="ques.avatar">
<<<<<<< Updated upstream
            </v-list-tile-avatar> -->


            <v-card class="mx-auto grow" color="#FEEA3D" max-width="500">
              <v-list-tile-content>
                <v-list-tile-title>{{ques.userName}}</v-list-tile-title>
                <v-list-tile-sub-title>{{ques.question}}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-layout align-center justify-end>
                <v-icon class="mr-1">mdi-heart</v-icon>
                <span class="subheading mr-2">0</span>
              </v-layout>
            </v-card>
            <v-layout align-center justify-end>
              <v-flex xs5 text-xs-right>{{ques.date}}</v-flex>
            </v-layout>
          </v-list-tile>
        </template>

        <v-list-tile avatar>
          <v-list-tile-avatar color="gradient white--text" large fill-dot>
            <span>SA</span>
          </v-list-tile-avatar>
          <v-text-field
            v-model="input"
            hide-details
            placeholder="Ask a question..."
            solo
            @keydown.enter="enrollQuestion"
          />
          <v-btn class="mx-0" dark @click="enrollQuestion">질문등록</v-btn>
        </v-list-tile>
      </v-list>
    </v-flex>

    <v-flex md3 lg3 xl3>
      <div id="search-container">
        <v-text-field type="text" label="클래스 접속자"/>
      </div>
      <div id="conversation-list">
        <div class="conversation" v-for="(user, i) in userList" :key="i">
          <img :src="require(`@/assets/${user.image}.png`)" height="100%">
          <div class="title-text">{{user.userName}}</div>
          <div class="created-date">{{user.value}}</div>
          <!-- <div class="conversation-message">
                        {{user.userName}}
          </div>-->
        </div>
        <div id="new-message-container">
          <a herf="#">+</a>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import { Stud } from "@/api";
/*eslint-disable */
export default {
  created() {
    Stud.loadQuestion(this.$store.state.currentClass.classCode).then(res => {

      if(res.data === 'false') alert('질문 가져오기 실패');
      else{
        this.questionList = res.data.questionList;
        console.log(res.data.questionList);
      }
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
    } else {
      console.warn("Push messaging is not supported");
      pushButton.textContent = "Push Not Supported";
    }

  },
  data() {
    return {
      events: [],
      image: 'https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-4.3b7e38ed.jpg',
      test: "https://picsum.photos/250/300?image=660",
      userList: [
        { userName: "윤대균", value: "교수", image: "professor" },
        { userName: "임총배", value: "학생", image: "student" },
        { userName: "박종환", value: "학생", image: "student" },
        { userName: "이동진", value: "학생", image: "student" },
        { userName: "이송아", value: "학생", image: "student" }
      ],
      input: null,
      nonce: 0,
      questionList: [],
      items: [
        {
          header: "Last Week"
        },
        { divider: true },
        {
          avatar: "https://picsum.photos/250/300?image=660",
          name: "Spike Lee",
          text: "I'll be in your neighborhood",
          time: "15:25"
        },
        {
          avatar: "https://picsum.photos/250/300?image=821",
          name: "Summer",
          text: "Wish I could come.",
          time: "15:25"
        },
        {
          avatar: "https://picsum.photos/250/300?image=783",
          name: "Bella",
          text: "Do you have Paris recommendations",
          time: "15:26"
        },
        {
          header: "Yesterday"
        },
        { divider: true },
        {
          avatar: "https://picsum.photos/250/300?image=1006",
          name: "LaToya",
          text: "Do you want to hang out?",
          time: "15:26"
        },
        {
          avatar: "https://picsum.photos/250/300?image=146",
          name: "Nancy",
          text: "Do you see what time it is?",
          time: "15:26"
        },
        {
          header: "Today"
        },
        { divider: true },
        {
          avatar: "https://picsum.photos/250/300?image=1008",
          name: "LaToya",
          text: "Do you want to hang out?",
          time: "15:27"
        },
        {
          avatar: "https://picsum.photos/250/300?image=839",
          name: "Winter Porridge",
          text: "Tell me more...",
          time: "15:27"
        },
        {
          avatar: "https://picsum.photos/250/300?image=145",
          name: "Oui oui",
          text: "Do you see what time it is?",
          time: "15:27"
        }
      ]
    };
  },
  sockets: {
    MESSAGE: function(data) {
      let cursor = this;
      let getTime = new Date();

      this.questionList.push({
        anonymous: data.anonymous,
        userID:data.userID,
        userName:data.userName,
        classCode:data.classCode,
        question: data._question,
        date: data.date
      });

      if (
        Notification &&
        Notification.permission === "granted" &&
        data &&
        this.$store.state.Identity == 2
      ) {
        if (Notification.permission == "granted") {
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
                  2500
                );
              });
          });
        }
      }
    }
  },
  methods: {
    enrollQuestion(event) {
      //alert("yes");
      event.preventDefault();
      const time = new Date();
      this.$socket.emit("chat", {
        classCode: this.$store.state.currentClass.classCode,
        userID: this.$store.state.userID,
        userName: this.$store.state.userName,
        _question: this.input,
        anonymous: false,
        date: time
        //   date: time.replace(/:\d{2}\s/, (match, contents, offset) => {
        //   return ` ${contents
        //     .split(" ")
        //     .map(v => v.charAt(0))
        //     .join("")}`;
        // })
      });
      this.input = null;
    }
  }
};
</script>

<style>
.gradient {
  background: linear-gradient(100deg, #9198e5, #26c6da);
}

#chat-container {
  display: grid;
  grid:
    "search-container chat-title" 71px
    "conversation-list chat-message-list" 1fr
    "new-message-container chat-form" 78px
    / 275px 1fr;
  min-width: 800px;

  max-height: 800px;
  height: 95vh;
  background: #fff;
  border-radius: 10px;
}
#search-container,
#conversation-list,
#new-message-container {
  background: darkcyan;
}

#search-container {
  display: grid;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  grid-area: search-container;
  border-radius: 10px 0 0 0;
  box-shadow: 0 1px 3px -1px rgba(0, 0, 0, 0.75);
  z-index: 1;
}

#search-container input {
  color: #eee;
  outline: none;
  font-weight: bold;
  border-radius: 2px;
  height: 30px;
  border: 0;
  padding-left: 48px;
  padding-right: 20px;
  font-size: 1.4rem;
  background-position: 15px center;
  background-size: 20px 20px;
}

#search-container input::placeholder {
  color: #ddd;
  font-weight: bold;
}

#conversation-list {
  grid-area: conversation-list;
  overflow-y: scroll;
}

.conversation {
  display: grid;
  grid-template-columns: 40px 1fr max-content;
  color: #ddd;
  grid-gap: 10px;
  font-size: 1.3rem;
  border-bottom: 1px solid #ddd;
  padding: 20px 20px 20px 15px;
}

.conversation.active,
.conversation:hover {
  background: #002c88;
}
.conversation:hover {
  cursor: pointer;
}

.conversation > img {
  grid-row: span 2;
  height: 40px;
  width: 40px;
  border-radius: 100%;
}

.title-text {
  font-weight: bold;
  color: #eee;
  padding-left: 5px;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
}

.created-date {
  color: #ddd;
  font-size: 1rem;
}

.conversation-message {
  grid-column: span 2;
  padding-left: 5px;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
}

#new-message-container {
  display: grid;
  grid: 40px / 40px;
  align-content: center;
  grid-area: new-message-container;
  border-top: 1px solid black;
  border-radius: 0 0 0 10px;
  padding: 0 15px;
}

#new-message-container a {
  display: grid;
  place-content: center center;
  background: #eee;
  border-radius: 100%;
  color: #002c88;
  text-decoration: none;
  font-size: 3.6rem;
}

#chat-title,
#chat-form {
  display: grid;
  grid: 51px /32px 1fr;
  grid-area: chat-form;
  align-content: center;
  align-items: center;
  grid-gap: 15px;
  border-radius: 0 0 10px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.25);
  padding-left: 42px;
  padding-right: 22px;
}

#chat-form input {
  outline: none;
  padding: 15px;
  border: 2px solid #ddd;
  color: #330;
  border-radius: 6px;
  font-size: 1.4rem;
}

#chat-title {
  display: grid;
  grid: 36px /1fr 36px;
  align-content: center;
  align-items: center;
  grid-area: chat-title;
  color: darkcyan;
  font-weight: bold;
  font-size: 2rem;
  border-radius: 0 10px 0 0;
  box-shadow: 0 1px 3px -1px black;
  padding: 0 20px;
}

#chat-title > img {
  cursor: pointer;
}

#chat-message-list {
  grid-area: chat-message-list;
  display: flex;
  flex-direction: column-reverse;
  padding: 0 20px;
  margin-top: 3px;
  overflow-y: scroll;
}

.message-row {
  display: grid;
  grid-template-columns: 70%;
  margin-bottom: 20px;
}

.message-content {
  display: grid;
}

.you-message {
  justify-content: end;
  justify-items: end;
}
.you-message .message-content {
  justify-items: end;
}

.other-message {
  justify-items: start;
}

.other-message .message-content {
  grid-template-columns: 48px 1fr;
  grid-column-gap: 15px;
}

.message-row img {
  border-radius: 100%;
  grid-row: span 2;
}

.message-text {
  padding: 9px 14px;
  font-size: 1.6rem;
  margin-bottom: 5px;
}

.message-time {
  font-size: 1.3rem;
  color: #777;
}

.you-message .message-text {
  background: #0048aa;
  color: #eee;
  border: 1px solid #0048aa;
  border-radius: 14px 14px 0 14px;
}

.other-message .message-text {
  background: #eee;
  color: #111;
  border: 1px solid #ddd;
}

#chat-from {
  display: grid;
  grid: 51px / 32px 1fr;
  align-content: center;
  align-items: center;
  grid-gap: 15px;
  grid-area: chat-form;
  border-radius: 0 0 10px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.25);
  padding-left: 42px;
  padding-right: 22px;
}

#chat-form input {
  outline: none;
  padding: 15px;
  border: 2px solid #ddd;
  color: #330;
  border-radius: 6px;
  font-size: 1.4rem;
}

::-webkit-scrollbar {
  display: none;
}
</style>
