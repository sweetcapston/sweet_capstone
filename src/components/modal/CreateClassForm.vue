<template>
  <div id="ModalExample">
    <sui-button @click.native="toggle">방 생성하기</sui-button>
    <sui-modal v-model="open">
      <sui-modal-header>클래스 생성하기</sui-modal-header>
      <sui-modal-content image>
        <sui-image wrapped size="medium" src="../../assets/logo.png"/>
         <label>클래스 이름</label>
              <sui-input
                placeholder="클래스이름을 입력해주세요"
                v-model="name"
                v-validate="'required'"
                data-vv-as="이름"
                @input="validate"
              />
      </sui-modal-content>

      <sui-modal-actions>
        <sui-button positive @click.native="toggle">
          생성하기
        </sui-button>
      </sui-modal-actions>
    </sui-modal>
  </div>
</template>

<script>
export default {
  name: 'ModalExample',
  data() {
    return { open: false, check:'' };
  },
  methods: {
    toggle() {
      this.open = !this.open;
    },
  },
};
</script>