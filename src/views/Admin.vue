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
          <img class="logo" src="@/assets/logo_white.png" height="40">
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
        <img :src="logo" height="150">
      </v-layout>
      <br/>


      <v-layout wrap>
        <v-flex xs12 sm12 md7 style="margin: 15px; 15px; 15px; 15px;">
          <material-card color="metal" title="차단 요청 리스트" text="Survey Data">
            <v-expansion-panel>
              <v-expansion-panel-content v-for="(item,idx) in blackRequest" :key="idx">
                <template v-slot:header>
                  <v-list-tile :key="item.title" avatar ripple>
                    <v-list-tile-content>
                      <v-divider/>
                      <v-list-tile-title> {{ item.title }} </v-list-tile-title>
                      <v-list-tile-sub-title class="text--primary"> {{ item.headline }} </v-list-tile-sub-title>
                      <v-list-tile-sub-title> {{ item.subtitle }} </v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </template>
                <v-layout justify-end style="padding-right: 10px;">
                  <v-btn dark>승인{{ idx }}</v-btn>
                  <v-btn dark>거절</v-btn>
                </v-layout>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </material-card>
        </v-flex>

        <v-flex xs12 sm12 md4 style="margin: 15px; 15px; 15px; 15px;">
          <v-card style="margin-top: 24px;">
            <v-toolbar color="metal" dark>
              <v-toolbar-side-icon></v-toolbar-side-icon>

              <v-toolbar-title>차단 리스트</v-toolbar-title>

              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>search</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>more_vert</v-icon>
              </v-btn>
            </v-toolbar>
            <v-list>
              <v-list-tile v-for="item in blackList" :key="item.title" avatar>
                <v-list-tile-action>
                  <v-icon v-if="item.icon" color="pink">star</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                  <v-list-tile-title v-text="item.title"></v-list-tile-title>
                </v-list-tile-content>

                <v-list-tile-avatar>
                  <img :src="item.avatar">
                </v-list-tile-avatar>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import {Auth, Class, Prof, Stud} from "@/api"

export default {
  data() {
    return {
      blackList: [
        {
          icon: true,
          title: "Jason Oner",
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg"
        },
        {
          title: "Travis Howard",
          avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg"
        },
        {
          title: "Ali Connors",
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg"
        },
        {
          title: "Cindy Baker",
          avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg"
        }
      ],
      blackRequest: [
        {
          action: "15 min",
          headline: "윤대균교수",
          title: "임승배학생",
          subtitle: "이 친구가 자꾸 쓰레기같은 질문만 올려요."
        },
        {
          action: "15 min",
          headline: "윤대균교수",
          title: "임승배학생",
          subtitle: "이 친구가 자꾸 쓰레기같은 질문만 올려요."
        }
      ],
      selected: [2],
      items: [
        {
          icon: true,
          title: "Jason Oner",
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg"
        },
        {
          title: "Travis Howard",
          avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg"
        },
        {
          title: "Ali Connors",
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg"
        },
        {
          title: "Cindy Baker",
          avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg"
        }
      ]
    };
  },
  created() {
    Auth.auth().then(res => {
      if(!res.data){
        this.$router.push({name: 'login'})
      }
    });
  },
  methods: {
    blackReq() {
      this.$EventBus.$on("clickBlack");
    },
    logout(){
      this.$session.destroy();
      Auth.logout().then(res => {
        if(res.data == "logout"){
          this.$store.commit('removeLoginData');
          this.$router.push({name: 'login'});
        }
      })
    }
  },
  computed: {
    logo() {
      return require("@/assets/logo_black_animation.svg")
    }
  }
};
</script>