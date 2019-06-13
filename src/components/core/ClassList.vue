<template>
  <v-layout column align-center justify-center class="xs12 sm5 md3 cardLayout">
    <v-btn id="CardButton" @click="enterClass(currentClass.classCode)" flat>
      <v-card class="mx-auto classCard" width="200">
        <v-img
          id="image"
          class="white--text"
          height="150px"
          :src="require('@/assets/openClass.png')"
        >
          <v-icon
            id="delete"
            color="white"
            flat
            @click.stop="deleteClassList(currentClass.classCode)"
            v-if="this.$store.getters.getIdentity === 1"
          >mdi-close</v-icon>

          <v-icon
            id="delete"
            color="white"
            flat
            @click.stop="deleteClass(currentClass.classCode)"
            v-if="this.$store.getters.getIdentity === 2"
          >mdi-close</v-icon>
        </v-img>
        <v-card-title id="CardTitle" class="align-start">{{currentClass.className}}</v-card-title>
        <v-card-text id="CardPadding">
          <span class="text--primary">
            <span>교수명: {{ currentClass.profName }}</span>
            <br>
            <span>클래스코드: {{ currentClass.classCode }}</span>
            <br>
          </span>
        </v-card-text>
      </v-card>
    </v-btn>
  </v-layout>
</template>

<script>
import { Prof, Stud } from "@/api";
export default {
  data() {
    return {
      classCode: "",
      classList: []
    };
  },
  props: {
    currentClass: {
      type: Object
    }
  },
  methods: {
    // 클래스 입장
    enterClass: function(classCode) {
      if (this.$store.state.Identity == 1) {
        Stud.classEnter(classCode,this.$store.state.userID).then(res => {
          if(res.data=="black") {
            alert("해당 클래스에서 제재 되었습니다.");
            return;
          }
          else if (!res.data) {
            alert("삭제된 클래스 입니다!");
            return;
          } else {
            this.$store.commit("setCurrentClass", {
              classCode: classCode,
              className: this.currentClass.className,
              profName: this.currentClass.profName
            });
            const checkApply = this.$store.state.classList.findIndex(function(
              item
            ) {
              return item.classCode === classCode;
            });
            this.$store.commit("setCheckApply", checkApply);
            this.$router.push({ path: `class/${classCode}/home` });
          }
        });
      } else {
        this.$store.commit("setCurrentClass", {
          classCode: classCode,
          className: this.currentClass.className,
          profName: this.currentClass.profName
        });
        const checkApply = this.$store.state.classList.findIndex(function(item) {
          return item.classCode === classCode;
        });
        this.$store.commit("setCheckApply", checkApply);
        this.$router.push({ path: `class/${classCode}/home` });
      }
    },
    // 클래스 리스트에서 삭제(학생)
    deleteClassList: function(classCode) {
      if (window.confirm("삭제하시겠습니까?")) {
        Stud.classDelete(classCode).then(res => {
          if (res.data == false) alert("error!!");
          else {
            // 클래스리스트에서 클래스 삭제하고 새로운 클래스 리스트로 업데이트
            this.classList = this.$store.state.classList;
            const idx = this.classList.findIndex(function(item) {
              return item.classCode === classCode;
            });
            if (idx > -1) this.classList.splice(idx, 1);
            this.$store.commit("removeClassList", this.classList);
          }
        });
      }
    },
    // 클래스 삭제(교수)
    deleteClass: function(classCode) {
      if (window.confirm("삭제하시겠습니까?")) {
        Prof.classDelete(classCode).then(res => {
          if (res.data === false) alert("error!!");
          else {
            this.classList = this.$store.state.classList;
            const idx = this.classList.findIndex(function(item) {
              return item.classCode === classCode;
            });
            if (idx > -1) this.classList.splice(idx, 1);
            this.$store.commit("removeClassList", this.classList);
          }
        });
      }
    }
  }
};
</script>
<style>
.cardLayout {
  max-width: 300px;
}
#CardButton {
  text-transform: none !important;
  height: 100%;
  padding-left: 40px;
  padding-right: 40px;
}
#CardButton::before {
  background: transparent;
}
#CardButton:hover {
  background: #ededed;
}
#CardTitle {
  justify-content: center;
  font-size: 1.5rem;
  padding-bottom: 6px;
}

#CardPadding {
  padding: 6px;
}

.v-icon.mdi.mdi-close.theme--light.white--text:hover {
  background: #cfd8dc;
}
.v-icon.mdi.mdi-close.theme--light.white--text {
  position: absolute;
  z-index: 1;
  font-size: 18px;
  right: 0;
}
</style>
