<template>
  <v-layout fill-height>
    <v-flex md6 sm12 style="padding-right:15px">
      <material-card class="v-card-profile">
        <v-avatar slot="offset" class="mx-auto d-block" size="80" color="green">
          <v-icon class="white--text" size="30">mdi-information-outline</v-icon>
        </v-avatar>
        <v-card-text class="text-xs-center">
          <modal-create-class-form/>
          <p class="category font-weight-light">클래스이름 :{{this.$store.state.currentClass.className}}</p>
          <p class="category font-weight-light">클래스코드 :{{this.$store.state.currentClass.classCode}}</p>
          <p class="category font-weight-light">교수이름 :{{this.$store.state.currentClass.profName}}</p>
          <p>수강인원 수: {{this.studentNum}}</p>
          <p>
            <strong>질문합계:</strong>
            {{this.questionNum}}&nbsp;
            <strong>설문합계:</strong>
            {{this.surveyNum}}&nbsp;
            <strong>퀴즈합계:</strong>
            {{this.quizNum}}
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
        v-for="(i,index) in this.newQuestion.length"
        :key="`ques${index}`"
        class="mb-3"
        color="info"
<<<<<<< HEAD
=======
        @click="movePage('question')"
>>>>>>> 984def26d5cbe132f0e865ef53e23786515f8369
      >
        <div style="width:100%;" @click="movePage('question')">
          <strong>새로운 질문</strong>
          <span>  {{newQuestion[index]}}</span>
        </div>
      </material-notification>

      <div v-if="this.$store.state.Identity ==1">
        <material-notification
          class="mb-3"
          color="warning"
          v-for="(i,index) in this.newSurvey.length"
          :key="`survey${index}`"
        >
          <div style="width:100%;" @click="movePage('survey')">
            <strong>새로운 설문</strong>
            <span>  {{newSurvey[index].Name}}</span>
          </div>
        </material-notification>

        <material-notification
          class="mb-3"
          color="purple"
          v-for="(i,index) in this.newQuiz.length"
          :key="`quiz${index}`"
        >
          <div style="width:100%;" @click="movePage('quiz')">
            <strong>새로운 퀴즈</strong>
            <span>  {{newQuiz[index].Name}}</span>
          </div>
        </material-notification>
      </div>
    </v-flex>

    <v-flex md6 sm12 style="padding-left:15px; padding-top:27px; padding-bottom:18px;">
      <vue-cal
        height="100%"
        :time="false"
        class="vuecal--blue-theme"
        default-view="month"
        :disable-views="['day', 'week']"
      />
    </v-flex>
  </v-layout>
</template>

<script>
import { Stud, Prof } from "@/api";
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";

export default {
  created() {
    Stud.classHome(
      this.$store.state.currentClass.classCode,
      this.$store.state.userID
    ).then(res => {
      if (res.data === "false") {return false}
      else {
            this.studentNum = res.data.student;
            this.questionNum = res.data.question
            this.surveyNum = res.data.survey
            this.quizNum = res.data.quiz
      }
    });
    if (this.$store.state.Identity == 1) {
      Stud.classHome(
        this.$store.state.currentClass.classCode,
        this.$store.state.userID
      ).then(res => {
        if (res.data === "false") {return false}
        else {
            this.newQuestion = res.data.newQuestion;
            this.newSurvey = res.data.newSurvey;
            this.newQuiz = res.data.newQuiz;
            this.studentNum = res.data.student;
            this.questionNum = res.data.question
            this.surveyNum = res.data.survey
            this.quizNum = res.data.quiz
        }
      });
    } else if (this.$store.state.Identity == 2) {
      Prof.classHome(
        this.$store.state.currentClass.classCode,
        this.$store.state.userID
      ).then(res => {
        if (res.data === "false") {return false}
        else {
          this.newQuestion = res.data;
        }
      });
    }
  },
  components: { VueCal },
  name: "classAdd",
  data() {
    return {
      guide: [
        {
          target: ".Add",
          content: `수강하기 버튼을 눌러 클래스 목록에 추가 할 수 있습니다.`,
          params: {
            placement: "bottom",
            enableScrolling: false
          }
        }
      ],
      color: null,
      colors: ["purple", "info", "success", "warning", "error"],
      newQuestion: [],
      newSurvey: [],
      newQuiz: [],
      fab: false,
      studentNum: 0,
      questionNum: 0,
      surveyNum: 0,
      quizNum: 0
    };
  },
  computed: {
    // convert the list of events into a map of lists keyed by date
    eventsMap() {
      const map = {};
      this.events.forEach(e => (map[e.date] = map[e.date] || []).push(e));
      return map;
    }
  },
  methods: {
    editClass() {
      alert("haha");
    },
    floating: function() {
      this.fab = !this.fab;
    },
    movePage(page) {
      this.$router.push(
        `/class/` + this.$store.state.currentClass.classCode + `/${page}`
      );
    },
    open(event) {
      alert(event.title);
    },
    addClass() {
      Stud.classAdd(this.$store.state.currentClass.classCode).then(res => {
        if (res.data === "false") alert("클래스 수강 실패");
        else {
          // currentClass객체로 하면 오류남.
          this.$store.commit("addClassList", {
            className: this.$store.state.currentClass.className,
            classCode: this.$store.state.currentClass.classCode,
            profName: this.$store.state.currentClass.profName
          });
          this.$store.commit("setCheckApply", 1);
        }
      });
    },
    outClass() {
      this.$store.commit("removeCurrentClass");
      this.$router.push({ name: "main" });
    },
    snack(...args) {
      this.top = false;
      this.bottom = false;
      this.left = false;
      this.right = false;

      for (const loc of args) {
        this[loc] = true;
      }

      this.color = this.colors[Math.floor(Math.random() * this.colors.length)];

      this.snackbar = true;
    }
  },
    mounted: function () {
    //   if(this.$store.state.Identity==1 && this.$store.state.classList.length == 0)
    //     this.$tours['classAdd'].start()
    }
}
</script>

<style lang="stylus" scoped>
.my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #1867c0;
  color: #ffffff;
  border: 1px solid #1867c0;
  width: 100%;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
}
</style>
