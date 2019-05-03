<template>
  <div>
    <v-btn dark @click.native="toggle">방 생성하기</v-btn>
    <sui-modal v-model="open" size="mini">
      <sui-modal-header>클래스 생성하기</sui-modal-header>
      <sui-modal-content image>
        <img height="80px" width="80px" src="@/assets/logo.svg">
        <sui-modal-content>
          <label>클래스 이름</label>
          <sui-input placeholder="클래스이름을 입력해주세요" v-model="className"/>
          <sui-checkbox v-model="alrarm" label="질문알람"/>
        </sui-modal-content>
      </sui-modal-content>
      <sui-modal-actions>
        <sui-button positive @click.native="createClass">생성하기</sui-button>
      </sui-modal-actions>
    </sui-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      open: false,
      alrarm: false, // 서버로 전송
      className: "" // 서버로 전송
    };
  },
  methods: {
    toggle() {
      this.open = !this.open;
    },
    setAlarm() {
      this.alrarm = true;
    },
    createClass() {
      alert(this.className + " 클래스 생성이 완료 되었습니다.");
      alert("알람여부: " + this.alrarm);
      alert("생성된 클래스코드: " + this.$store.state.classCode);
      this.toggle();
    }
  }
};
</script>