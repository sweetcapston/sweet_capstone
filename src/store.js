import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()], // vuex local에 저장
  state: {
    drawer: true, // 네비게이션 바
    Identity: 0, // 1: 학생, 2: 교수, 3: 관리자
    userName:'', // 사용자 이름
    userID:'',
    checkApply: '', // 수광중인 클래스여부
    currentClass: { // 현재 클래스 정보
      classCode: '', 
      className: '', 
      profName: '', 
    },
    classList: [], // 사용자의 클래스 리스트
  },
  getters: { // 반복사용되는 값을 재사용하기 위해 사용. computed와 같은 기능
    getIdentity: function(state){
      return state.Identity;
    },
  },
  mutations: { // state값을 변경하고자 할 때, commit을 이용해서 변경시킬 것임, State 관리
    // 네비게이션 바
    setDrawer: (state, payload) => (state.drawer = payload),
    toggleDrawer: state => (state.drawer = !state.drawer), // 상태 토글

    setLoginData:(state, payload) => {
      state.userName = payload.userName;
      state.userID = payload.userID;
      state.classList = payload.classList;
      state.Identity = payload.Identity;
    },
    removeLoginData:(state) => {
      state.userName = '';
      state.userID = '';
      state.classList = '';
      state.Identity = '';
    },

    addClassList:(state, payload) => (state.classList.push(payload)),

    // 현재 클래스 정보
    setCurrentClass:(state, payload) => 
    (
      state.currentClass.classCode = payload.classCode,
      state.currentClass.className = payload.className,
      state.currentClass.profName = payload.profName
    ),
    removeCurrentClass:(state) => 
    (
      state.currentClass.classCode = '',
      state.currentClass.className = '',
      state.currentClass.profName = ''
    ),

    setCheckApply:(state, payload) => 
    (
      state.checkApply = payload
    ),

  },
  actions:{

  }
})

