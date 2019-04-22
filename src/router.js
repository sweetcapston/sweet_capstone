import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/core/Home.vue'
import chartClass from './components/core/chartClass.vue'
import questionClass from './components/core/questionClass.vue'
import surveyClass from './components/core/surveyClass.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/chartclass',
      name: 'chartclass',
      component: chartClass
    },
    {
      path: '/questionclass',
      name: 'questionclass',
      component: questionClass
    },
    {
      path: '/surveyclass',
      name: 'surveyclass',
      component: surveyClass
    }
  ]
})