<template>
  
  <v-container fluid grid-list-md>
    <div class="page">
      <div contentEditable="true"> type here
        <img src="https://firebasestorage.googleapis.com/v0/b/openclass-e8b92.appspot.com/o/images%2F512x512bb.jpg?alt=media&amp;token=8ea95608-1f14-4c2c-b900-87d9ff47294a" />
      </div>

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
    <div class="testDiv" style="align-text:center; width:550px;height:550px;">
    
      <vue-drag-resize  :w="200" :h="200" @dragstop="resize" :parentLimitation="true" >
        
        <img src="https://firebasestorage.googleapis.com/v0/b/openclass-e8b92.appspot.com/o/images%2F512x512bb.jpg?alt=media&amp;token=8ea95608-1f14-4c2c-b900-87d9ff47294a" 
        class="resize-image" style="width: inherit;height: inherit;"/>
      </vue-drag-resize>
    </div>
  </div>
    <v-layout row wrap>
      <v-flex d-flex xs12 sm6 md4 style="border:1px solid" align-center justify-center>
        <apexchart width="330" type="donut" :options="option1" :series="list1"/>
      </v-flex>
      <v-flex d-flex xs12 sm6 md3 style="border:1px solid">
        <apexchart type="radar" height="350" :options="chartOptions" :series="series"/>
      </v-flex>
      <v-flex d-flex xs12 sm6 md5 child-flex style="border:1px solid">
        <apexchart type="bar" height="350" :options="chartOptions2" :series="series2"/>
      </v-flex>
    </v-layout>
  </v-container>
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
      right: 0,

      //////////chart
      lorem: "Lorem ipsum dolor sit amet, mel at cu",
      option1: { labels: ["SWEET", "임승배", "치킨집"] },
      list1: [60, 10, 20],
      series: [
        {
          name: "Series 1",
          data: [80, 50, 30, 40, 100, 20]
        }
      ],
      chartOptions: {
        labels: ["January", "February", "March", "April", "May", "June"],
        title: {
          text: "Basic Radar Chart"
        }
      },
      series2: [
        {
          data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
        }
      ],
      chartOptions2: {
        plotOptions: {
          bar: {
            horizontal: true
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: [
            "South Korea",
            "Canada",
            "United Kingdom",
            "Netherlands",
            "Italy",
            "France",
            "Japan",
            "United States",
            "China",
            "Germany"
          ]
        }
      }
    };
    // series: [{
    //   name: 'series-1',
    //   data: [30, 40, 35, 50, 49, 60, 70, 91]
    // }]
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
      this.right = newRect.right;
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
