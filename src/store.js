import Vue from 'vue'
import Vuex from 'vuex'



Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    drawer: true,
    test: 0,
    links: [
      {
        to: '/home',
        icon: 'home',
        text: '홈'
      },
      {
        to: '/questionClass',
        icon: 'lightbulb',
        text: '질문 클래스'
      },
      {
        to: '/surveyClass',
        icon: 'call',
        text: '서베이 클래스' 
      },
      {
        to: '/chartClass',
        icon: 'dashboard',
        text: '통계'
      }
    ]
  },
  getters: { // 반복사용되는 값을 재사용하기 위해 사용. computed와 같은 기능
   
  },
  mutations: { // state값을 변경하고자 할 때, commit을 이용해서 변경시킬 것임, State 관리
    setDrawer: (state, payload) => (state.drawer = payload),
    toggleDrawer: state => (state.drawer = !state.drawer), // 상태 토글
    oneUP: (state) => (state.test = state.test + 1),
    twoUP: (state) => (state.test = state.test + 2)
  },
  actions: { // mutations는 모든기능이 동기로 동작합니다. 비동기로 사용하기위해 이 actions을 사용.
 
  }
})
