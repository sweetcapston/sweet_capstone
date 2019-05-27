<template>
  <div class="page">
    <v-btn 
      @click.native="selectFiles"
    >
      Upload a image
      <v-icon 
        right
        aria-hidden="true"
      >
        add_a_photo
      </v-icon>
    </v-btn>
    <input 
    id="files"
    type="file"
    name="file"
    ref="uploadInput"
    accept="image/*"
    :multiple="false"
    @change="uploadFiles($event)" />
    <v-progress-circular
      v-if="uploading && !uploadEnd"
      :size="100"
      :width="15"
      :rotate="360"
      :value="progressUpload"
      color="primary">
      {{ progressUpload }}%
    </v-progress-circular>
    <!-- https://github.com/kirillmurashov/vue-drag-resize -->
    <div style="align-text:center; width:550px;height:550px;">
    
      <vue-drag-resize  :w="200" :h="200" @dragstop="resize" :parentLimitation="true" >
        <img src="https://firebasestorage.googleapis.com/v0/b/openclass-e8b92.appspot.com/o/images%2F512x512bb.jpg?alt=media&amp;token=8ea95608-1f14-4c2c-b900-87d9ff47294a" class="resize-image" style="
      width: inherit;height: inherit;"/>
      </vue-drag-resize>
    </div>
  </div>
</template>

<script>
/*eslint-disable */
import Vue from 'vue'
import VueDragResize from 'vue-drag-resize'
import {imageStorage} from '@/utils/imageStorage';

Vue.component('vue-drag-resize', VueDragResize)

export default {
  data() {
    return {
      progressUpload: 0,
      fileName: '',
      uploadTask: '',
      uploading: false,
      uploadEnd: false,
      downloadURL: '',
      width: 0,
      height: 0,
      top: 0,
      left: 0
    }
  },
  methods:{
    selectFiles () {
      this.$refs.uploadInput.click()
    },
    uploadFiles (e) {
      let files = e.target.files || e.dataTransfer.files
      Array.from(Array(files.length).keys()).map(x => {
        this.upload(files[x])
      })
    },
    upload (file) {
      this.fileName = file.name
      this.uploading = true
      this.uploadTask = imageStorage.child(`${this.fileName}`).put(file)
    },
    resize(newRect) {
      this.width = newRect.width;
      this.height = newRect.height;
      this.top = newRect.top;
      this.left = newRect.left;
    }
  },
   watch: {
    uploadTask: function () {
      this.uploadTask.on('state_changed', sp => {
        this.progressUpload = Math.floor(sp.bytesTransferred / sp.totalBytes * 100)
      },
      null,
      () => {
        this.uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          this.uploadEnd = true
          this.downloadURL = downloadURL
          let imgHtml = document.createElement('img');
          imgHtml.src = downloadURL;
          imgHtml.classList.add("resize-image")
          document.querySelector('.page').appendChild(imgHtml)
        })
      })
      
    }
  }
}
</script>

<style>
.progress-bar {
  margin: 10px 0;
}
input[type="file"] {
  position: absolute;
  clip: rect(0,0,0,0);
}
.resize-container {
    position: relative;
    display: inline-block;
    cursor: move;
    margin: 0 auto;
}

.resize-container img {
    display: block
}

.resize-container:hover img,
.resize-container:active img {
    outline: 2px dashed rgba(222,60,80,.9);
}
</style>