import Vue from "vue";
import Router from "vue-router";
import Home from "./views/HomeClass.vue";
import Chart from "./views/ChartClass.vue";
import Question from "./views/QuestionClass.vue";
import Survey from "./views/SurveyClass.vue";
import Login from "./views/Login.vue";
import Main from "./views/Main.vue";
import Class from "./components/core/Class.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "login",
      component: Login
    },
    {
      path: "/main",
      name: "main",
      component: Main
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
          path: 'survey',
          component : Survey
        },
        {
          path: 'chart',
          component : Chart
        }
      ]
    }
  ]
});
