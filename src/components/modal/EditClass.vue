<template>
  <div>
    <v-speed-dial
      v-model="fab"
      absolute
      small
      :direction="'left'"
      :open-on-hover="false"
      :transition="'slide-x-reverse-transition'"
      @click.stop
    >
      <template v-slot:activator>
        <v-btn class="fab surveyFab" v-model="fab" color="transparent" fab @click.stop="floating()">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-btn v-model="fab" fab dark small class="surveyFab" color="info" @click.stop="editClass()">
        <v-icon>edit</v-icon>
      </v-btn>
    </v-speed-dial>
    <sui-modal v-model="open" size="mini">
      <sui-modal-header>클래스 정보수정</sui-modal-header>

      <sui-modal-content>
        <label>클래스 이름</label>
        <sui-input placeholder="클래스이름을 입력해주세요" v-model="className" style="margin-bottom:10px"/>
      </sui-modal-content>
      <sui-modal-actions>
        <sui-button primary @click.native="edit(getClassCode())">수정하기</sui-button>
      </sui-modal-actions>
    </sui-modal>
  </div>
</template>

<script>
import { Prof } from "@/api";
export default {
  data() {
    return {
      open: false,
      className: this.$store.state.currentClass.className,
      fab: false,
      classCode : this.$store.state.currentClass.classCode,
      classList : [],
    };
  },
  methods: {
    getClassCode(){
      return this.$store.state.currentClass.classCode
    },
    editClass() {
      this.open = !this.open;
    },
    floating: function() {
      this.fab = !this.fab;
    },
    toggle() {
      this.open = !this.open;
    },
    edit(classCode) {
      this.toggle();
      this.$store.commit("setCurrentClass", {
        className: this.className,
        classCode: this.$store.state.currentClass.classCode,
        profName: this.$store.state.currentClass.profName,
      });

      this.classList = this.$store.state.classList;

      const idx =  this.classList.findIndex(function(item) {
              return item.classCode === classCode
            });
      
      this.classList[idx].className =  this.className;
      //this.$store.commit("editClassList", this.classList);

      Prof.classEdit(
        this.$store.state.currentClass.classCode,
        this.className,
      ).then(res => {
        if (res.data === "false") alert("클래스 수정 실패");
        else {
          alert("클래스 수정 성공");
        }
      });
    }
  }
};
</script>