<template>
  <v-stepper-content :step="n+1">
    <v-card class="mb-5" color="grey lighten-3">
      <v-btn absolute dark fab top right class="crimson" @click="deleteStep">
        <v-icon>remove</v-icon>
      </v-btn>
      <v-container>
        <v-layout style="align-items:center">
          <div
            :class="`quizQuestion_${n+1}`"
            contenteditable="true"
            style="font-size: 1.5rem; background:beige; width:750px; "
          >퀴즈문제를 작성하세요.</div>
          <div class="page">
            <v-btn @click.native="selectFiles()">
              Upload a image
              <v-icon right aria-hidden="true">add_a_photo</v-icon>
            </v-btn>
            <input
              :id="`files${n}`"
              type="file"
              name="file"
              accept="image/*"
              :multiple="false"
              @change="uploadFiles($event, n)"
            >
            <v-progress-circular
              v-if="uploading && !uploadEnd"
              :size="100"
              :width="15"
              :rotate="360"
              :value="progressUpload"
              color="primary"
            >{{ progressUpload }}%</v-progress-circular>
          </div>
        </v-layout>

        <div v-if="type === '1'">
          <div v-for="(type1, index) in samplestype1" :key="type1.id">
            <v-layout>
              <v-text-field
                :class="'type1_'+`${n+1}`"
                prepend-icon="mdi-checkbox-blank-circle-outline"
                label="보기를 입력하세요"
                single-line
                color="rgb(111, 111, 111)"
              />
              <v-spacer/>
              <v-icon @click="deleteType1(index)">mdi-close</v-icon>
            </v-layout>
          </div>
          <v-layout v-if="type === '1'">
            <v-icon @click="addType1()">mdi-plus</v-icon>
            <v-input @click="addType1()" label="보기 추가" class="addSample"/>
          </v-layout>
        </div>

        <div v-if="type === '2'">
          <div :class="'type2_'+`${n+1}`" v-for="(type2, index) in samplestype2" :key="type2.id">
            <v-layout>
              <v-text-field
                prepend-icon="mdi-checkbox-blank-outline"
                label="보기를 입력하세요"
                single-line
                color="rgb(111, 111, 111)"
              />
              <v-spacer/>
              <v-icon @click="deleteType2(index)">mdi-close</v-icon>
            </v-layout>
          </div>

          <v-layout v-if="type=== '2'">
            <v-icon @click="addType2()">mdi-plus</v-icon>
            <v-input label="보기 추가" class="addSample" @click="addType2()"/>
          </v-layout>
        </div>
        <v-layout v-if="type === '3'">
          <v-textarea solo flat outline color="cyan lighten-1"/>
        </v-layout>
        <v-divider/>
        <v-layout>
          <v-radio-group v-model="type" :mandatory="false" class="quizType" row>
            <v-radio label="객관식" value="1" color="cyan ligten-1" select/>
            <v-radio label="객관식(복수 응답 가능)" value="2" color="cyan ligten-1"/>
            <v-radio label="주관식(단답형)" value="3" color="cyan ligten-1"/>
          </v-radio-group>
          <v-flex md3 style="padding:2px">
            <v-text-field :id="'correct'+ `${n}`" color="cyan ligten-1" label="정답"/>
          </v-flex>
          <v-flex md3 style="padding:2px">
            <v-text-field :id="'point'+ `${n}`" color="cyan ligten-1" label="배점"/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>

    <v-layout justify-space-between>
      <v-btn class="cyan lighten-1 white--text" @click="preStep">Pre</v-btn>

      <v-btn
        v-if="n+1 !== steps"
        :key="n"
        class="cyan lighten-1 white--text"
        @click="nextStep(n)"
      >Next</v-btn>
      <v-btn
        v-if="n+1 === steps"
        :key="n"
        class="cyan lighten-1 white--text"
        @click="complete"
      >Complete</v-btn>
    </v-layout>
  </v-stepper-content>
</template>
<script>
import { imageStorage } from "@/utils/imageStorage";

export default {
  data() {
    return {
      progressUpload: 0,
      fileName: "",
      uploadTask: "",
      uploading: false,
      uploadEnd: false,
      downloadURL: "",
      type: this.card_data.type,
      samplestype1: this.card_data.samplestype1,
      samplestype2: this.card_data.samplestype1,
      newID1: 2,
      newID2: 1002,
      num: this.n
    };
  },
  props: {
    card_data: Object,
    n: Number,
    steps: Number,
    quiz: Object
  },
  methods: {
    getData() {
      return this.steps;
    },
    addType1() {
      this.samplestype1.push({
        id: this.newID1++
      });
    },
    addType2() {
      this.samplestype2.push({
        id: this.newID2++
      });
    },
    deleteType1(index) {
      this.samplestype1.splice(index, 1);
    },
    deleteType2(index) {
      this.samplestype2.splice(index, 1);
    },
    preStep() {
      this.$emit("preStep");
    },
    nextStep() {
      this.$emit("nextStep");
    },
    complete() {
      this.$emit("complete");
    },
    deleteStep() {
      this.$emit("remove");
    },
    selectFiles() {
      document.querySelector(`#files${this.n}`).click();
    },
    uploadFiles(e) {
      let files = e.target.files || e.dataTransfer.files;
      Array.from(Array(files.length).keys()).map(x => {
        this.upload(files[x]);
      });
    },
    upload(file) {
      this.fileName = file.name;
      this.uploading = true;
      this.uploadTask = imageStorage.child(`${this.fileName}`).put(file);
    },
    changeSize(url) {
      return new Promise(function(resolve, reject) {
        var img = new Image();
        var width, height;
        img.addEventListener("load", function() {
          if(this.naturalWidth > this.naturalHeight) {
            width = 100;
            height = this.naturalHeight * (100 / this.naturalWidth);
          }
          else {
            width = this.naturalWidth * (100 / this.naturalHeight);
            height = 100;
          }
          resolve([width, height]);
        });
        img.src = url;
      });
    }
  },
  watch: {
    uploadTask: function() {
      this.uploadTask.on(
        "state_changed",
        sp => {
          this.progressUpload = Math.floor(
            (sp.bytesTransferred / sp.totalBytes) * 100
          );
        },
        null,
        () => {
          this.uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            this.uploadEnd = true;
            var idx = this.n + 1;
            this.downloadURL = downloadURL;
            this.changeSize(downloadURL).then(function(size) {
              let imgHtml = document.createElement("img");
              imgHtml.src = downloadURL;
              imgHtml.style.width = `${size[0]}%`;
              imgHtml.style.height = `${size[1]}%`;
              document
                .querySelector(`.quizQuestion_${idx}`)
                .appendChild(imgHtml);
            });
          });
        }
      );
    }
  }
};
</script>

<style>
.progress-bar {
  margin: 10px 0;
}
input[type="file"] {
  position: absolute;
  clip: rect(0, 0, 0, 0);
}
</style>