import Vue from "vue";
import Router from "vue-router";
import Home from "./views/HomeClass.vue";
import Chart from "./views/ChartClass.vue";
import Question from "./views/QuestionClass.vue";
import Quiz from "./views/QuizClass.vue";
import Survey from "./views/SurveyClass.vue";
import Login from "./views/Login.vue";
import Main from "./views/Main.vue";
import Class from "./components/core/Class.vue";
import LoginForm from "./components/modal/LoginForm.vue";
import SignUpForm from "./components/modal/SignUpForm.vue";
import Admin from "./views/Admin.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
      children: [
        {
          path : 'login',
          component : LoginForm
        },
        {
          path : 'register',
          component : SignUpForm
        }
      ]
    },
    {
      path: "/main",
      name: "main",
      component: Main,
    },
    {
      path: "/admin",
      name: "admin",
      component: Admin,
    },
    {
      path: "/class/:classCode",
      name: "class",
      component : Class,
      children: [
        {
          path : 'home',
          component : Home
        },
        {
          path: 'question',
          component : Question
        },
        {
          path: 'quiz',
          component : Quiz
        },
        {
          path: 'survey',
          component : Survey,
        },
        {
          path: 'chart',
          component : Chart
        }
      ]
    }
  ]
});
