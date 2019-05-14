<template>
  <v-layout>
    <v-flex xs12 sm12 md12 lg9 xl9>
        <v-list class="v-list1" two-line>
      
        <template v-for="(ques) in questionList">
              <v-list-tile :key="ques.title" avatar ripple >
            <v-list-tile-avatar>
              <img :src="image">
            </v-list-tile-avatar>
          <!-- <v-subheader v-if="ques.header" :key="ques.header" inset>{{ ques.header }}</v-subheader>
          <v-divider v-else-if="ques.divider" :key="index" inset></v-divider>

          <v-list-tile v-else :key="ques.title" avatar ripple>
            <v-list-tile-avatar>
              <img :src="ques.avatar">
            </v-list-tile-avatar> -->

            <v-card class="mx-auto grow" color="#FEEA3D">
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
        
</v-list>
  <v-list-tile avatar >
          <v-list-tile-avatar color="gradient white--text" large fill-dot>
            <span>SA</span>
          </v-list-tile-avatar>
          <v-text-field
            v-model="input"
            hide-details
            min-width="50px"
            placeholder="Ask a question..."
            solo
            @keydown.enter="enrollQuestion"
          />
          <v-btn class="mx-0" dark @click="enrollQuestion">질문등록</v-btn>
        </v-list-tile>
      
    </v-flex>

    <v-flex md3 lg3 xl3 class="hidden-md-and-down">
      <div id="search-container">
        <span class="headline text-uppercase">참여자</span>
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
        this.questionList = res.data.questionList
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

    Stud.loadQuestion(this.$store.state.currentClass.classCode).then(res => {
      if (res.data === "false") alert("질문 가져오기 실패");
      else {
        this.questionList = res.data.questionList;
      }
    });

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

      let getTime = Date.now().toString();


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
      event.preventDefault();
      let time = new Date();
      let T = time.getFullYear().toString()+'-'+(time.getMonth()+1).toString()
      +'-'+time.getDate().toString()+" "+time.getHours().toString()+":"+time.getMinutes().toString();

      this.$socket.emit("chat", {
        classCode: this.$store.state.currentClass.classCode,
        userID: this.$store.state.userID,
        userName: this.$store.state.userName,
        _question: this.input,
        anonymous: false,
        date: T
        //   date: time.replace(/:\d{2}\s/, (match, contents, offset) => {
        //   return ` ${contents
        //     .split(" ")
        //     .map(v => v.charAt(0))
        //     .join("")}`;
        // })
      });
      this.input = null;
    },
  }
}
</script>

<style>
.gradient {
  background: linear-gradient(100deg, #9198e5, #26c6da);
}
.v-list1 {
  max-height: 650px;
  overflow-y: scroll;
  
}
</style>
