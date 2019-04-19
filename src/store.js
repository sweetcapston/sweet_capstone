import Vue from 'vue'
import Vuex from 'vuex'



Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    test: 0
  },
  getters: { // 반복사용되는 값을 재사용하기 위해 사용. computed와 같은 기능
   
  },
  mutations: { // state값을 변경하고자 할 때, commit을 이용해서 변경시킬 것임, State 관리
   
  },
  actions: { // mutations는 모든기능이 동기로 동작합니다. 비동기로 사용하기위해 이 actions을 사용.
 
  }
})
