<template>
  <v-container
    fluid
    grid-list-xl
    fill-height>
    <v-layout
      justify-center
      align-center
    >
      <v-flex xs12>  

        <v-layout
          row
          wrap>              
          <v-flex
            md6
            sm12>
            <material-card class="v-card-profile">
              <v-avatar
                slot="offset"
                class="mx-auto d-block"
                size="80"
                color="red"
              >
                <v-icon 
                  class="white--text"
                  size="30"
                >mdi-information-outline</v-icon>
              </v-avatar>
              <v-card-text class="text-xs-center">
                <p
                  class="category font-weight-light">
                  클래스 이름 : {{this.$store.state.currentClass.className}}
                </p>
                <p
                  class="category font-weight-light">
                  클래스 코드 : {{this.$store.state.currentClass.classCode}}
                </p>
                <p
                  class="category font-weight-light">
                  교수 이름 : {{this.$store.state.currentClass.profName}}
                </p>
                <div class="text-xs-right">
                  <v-btn
                    color="primary"
                    round
                    class="font-weight-light"
                    @click="addClass()"
                    v-if="this.$store.getters.getIdentity == 1 && (this.$store.state.checkApply == -1)"
                  >수강하기</v-btn>
                </div>                    
              </v-card-text>
            </material-card>

            <material-notification
              class="mb-3"
              color="info"
              dismissible
            >
              <strong>INFO</strong> - This is a regular notification made with `color="info"`
            </material-notification>

            <material-notification
              class="mb-3"
              color="success"
              dismissible
            >
              <strong>SUCCESS</strong> - This is a regular notification made with `color="success"`
            </material-notification>

            <material-notification
              class="mb-3"
              color="warning"
              dismissible
            >
              <strong>WARNING</strong> - This is a regular notification made with `color="warning"`
            </material-notification>

            <material-notification
              class="mb-3"
              color="error"
              dismissible
            >
              <strong>DANGER</strong> - This is a regular notification made with `color="error"`
            </material-notification>
<!--
            <material-notification
              class="mb-3"
              color="purple"
              dismissible
            >
              <strong>PRIMARY</strong> - This is a regular notification made with `color="purple"`
            </material-notification>
-->
          </v-flex>

          <v-flex
            md6
            sm12>
            <vue-cal 
              weight="530"
              height="600"
              :time="false" 
              class="vuecal--blue-theme"
              default-view='month'
              :disable-views="['day', 'week']"/>
          </v-flex>
        </v-layout>            
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {Stud} from "@/api";
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'

export default {
  components: { VueCal },
  data() {
    return {
      color: null,
      colors: [
        'purple',
        'info',
        'success',
        'warning',
        'error'
      ],
      top: true,
      bottom: false,
      left: false,
      right: false,
      snackbar: false,
    }
  },
  methods: {
    addClass() {
      Stud.classAdd(this.$store.state.currentClass.classCode).then(res => {
        if(res.data === 'false') alert('클래스 수강 실패');
        else{
          // currentClass객체로 하면 오류남.
          this.$store.commit("addClassList", {
            className: this.$store.state.currentClass.className,
            classCode: this.$store.state.currentClass.classCode,
            profName: this.$store.state.currentClass.profName
          });
          this.$store.commit('setCheckApply', 1);
        } 
      })
    },
    outClass(){
      this.$store.commit("removeCurrentClass");
      this.$router.push({name: 'main'});
    },
    snack (...args) {
      this.top = false
      this.bottom = false
      this.left = false
      this.right = false

      for (const loc of args) {
        this[loc] = true
      }

      this.color = this.colors[Math.floor(Math.random() * this.colors.length)]

      this.snackbar = true
    }
  }
}
</script>
