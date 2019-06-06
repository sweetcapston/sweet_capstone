<template>
  <v-navigation-drawer
    id="app-drawer"
    v-model="drawer"
    app
    dark
    floating
    persistent
    mobile-break-point="960"
    width="260"
  >
    <v-img :src="image" height="100%">
      <v-layout class="fill-height" tag="v-list" column>
        <v-list-tile avatar>
          <v-list-tile-avatar color="white" @click="moveToMain()">
            <v-img :src="require('@/assets/mini.png')" height="34" contain/>
          </v-list-tile-avatar>
          <v-list-tile-title
            class="title"
          >{{this.$store.state.currentClass.className + ' ' + this.$store.state.currentClass.profName}}</v-list-tile-title>
        </v-list-tile>

        <v-list-tile>{{`클래스코드 : ${this.$store.state.currentClass.classCode}`}}</v-list-tile>
        <v-divider/>

        <v-list>
          <v-list-tile
            v-for="(link, i) in links"
            :key="i"
            :to="link.to"
            :active-class="color"
            avatar
            class="v-list-item"
          >
            <v-list-tile-action>
              <v-icon medium>{{link.icon}}</v-icon>
            </v-list-tile-action>
            <v-list-tile-title v-text="link.text"></v-list-tile-title>
          </v-list-tile>
          <v-list-tile
            :to="'/main'"
            :active-class="color"
            avatar
            class="v-list-item"
            @click="outClass"
          >
            <v-list-tile-action>
              <v-icon medium>{{"mdi-exit-to-app"}}</v-icon>
            </v-list-tile-action>
            <v-list-tile-title v-text="'클래스 나가기'"></v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-layout>
    </v-img>
  </v-navigation-drawer>
</template>

<script>
// Utilities
import { mapMutations } from "vuex";

export default {
  name: "drawer",
  data() { 
    return {
    image:
      "https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-4.3b7e38ed.jpg",
    color: "cyan",
    links: [
      // 메인페이지 관련
      {
        to: '/class/'+this.$store.state.currentClass.classCode+'/home',
        icon: "mdi-home",
        text: "홈"
      },
      {
        to: '/class/'+this.$store.state.currentClass.classCode+'/question',
        icon: "mdi-comment-question-outline",
        text: "질문 클래스"
      },
      {
        to: '/class/'+this.$store.state.currentClass.classCode+'/survey',
        icon: 'mdi-clipboard-text-outline',
        text: '설문 클래스' 
      },
      {
        to: '/class/'+this.$store.state.currentClass.classCode+'/quiz',
        icon: 'mdi-quora',
        text: '퀴즈 클래스' 
      },
      {
        to: '/class/'+this.$store.state.currentClass.classCode+'/chart',
        icon: 'mdi-chart-bar',
        text: '통계'
      }
    ],
    responsive: false
  }
  },
    created() {
      this.classCode = this.$store.state.currentClass.classCode;
  },
  computed: {
    drawer: {
      get() {
        return this.$store.state.drawer;
      },
      set(val) {
        this.setDrawer(val);
      }
    }
  },
  methods: {
    ...mapMutations(["setDrawer"]),
    moveToPage: function(link) {
      this.$router.push(
        link.to + this.$store.state.currentClass.classCode + link.to2
      );
    },
    moveToMain: function() {
      this.$router.push({ name: "main" });
    },
    outClass(){
      this.$store.commit("removeCurrentClass");
      this.$router.push({name: 'main'});
    }
  }
};
</script>


<style lang="scss">
#app-drawer {
  .v-list__tile {
    border-radius: 4px;
    margin-top: 10px;
  }
  .v-image__image--contain {
    top: 9px;
    height: 60%;
  }
  .search-input {
    margin-bottom: 30px !important;
    padding-left: 15px;
    padding-right: 15px;
  }
  .fill-height > .v-list {
    background: 0;
  }
  div.v-responsive.v-image > div.v-responsive__content {
    overflow-y: auto;
  }
  .v-navigation-drawer .v-list .v-list-item .v-list__tile.v-list__tile--active{
    -webkit-box-shadow:0 !important;
    box-shadow:0 !important;
  }
  .cyan.v-list__tile--active.v-list__tile.v-list__tile--link.v-list__tile--avatar.theme--dark{
    box-shadow: none !important; 
  }
  .v-list__tile__avatar{
    cursor: pointer;
  }
}
</style>