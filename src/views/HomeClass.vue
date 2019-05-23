<template>
  <v-app>
    <h1>클래스 이름 : {{this.$store.state.currentClass.className}}</h1>
    <h1>클래스 코드 : {{this.$store.state.currentClass.classCode}}</h1>
    <h1>교수 이름 : {{this.$store.state.currentClass.profName}}</h1>
    <span>
      <v-btn color="primary"
        @click="addClass()"
        v-if="this.$store.getters.getIdentity == 1 && (this.$store.state.checkApply == -1)" >수강하기</v-btn> <!-- 수강하지않고있는 학생에게만 보여지도록.. 학생의 수강리스트에서 -->
    </span>

    <v-layout>
      <v-card
        class="mx-auto"
        width="500"
        hegith="500"
      > 
        <v-card-title>
          <v-flex
            sm4
            xs12
            class="text-sm-left text-xs-center"
          >
            <v-btn @click="$refs.calendar.prev()">
              <v-icon
                dark
                left
              >
                keyboard_arrow_left
              </v-icon>
              Prev
            </v-btn>
          </v-flex>

          <v-flex
            sm4
            xs12
            class="text-xs-center"
          >
            <v-select
              v-model="type"
              :items="typeOptions"
              label="Type"
            ></v-select>
          </v-flex>

          <v-flex
            sm4
            xs12
            class="text-sm-right text-xs-center"
          >
            <v-btn @click="$refs.calendar.next()">
              Next
              <v-icon
                right
                dark
              >
                keyboard_arrow_right
              </v-icon>
            </v-btn>
          </v-flex>
        </v-card-title>
        
        <v-card-actions>
          <v-flex
            xs12
            class="mb-3"
          >
            <v-sheet 
              height="400"
            >
              <v-calendar
                ref="calendar"
                v-model="start"
                :type="type"
                :end="end"
                color="cyan lighten-1"
              > 
              </v-calendar>
            </v-sheet>
          </v-flex>  
        </v-card-actions>
      </v-card>
    </v-layout>
  </v-app> 
</template>

<script>
import {Stud} from "@/api";

export default {
  data(){
    return{
      type: 'month',
      start: '2019-01-01',
      end: '2019-01-06',
      typeOptions: [
        { text: 'Day', value: 'day' },
        { text: '4 Day', value: '4day' },
        { text: 'Week', value: 'week' },
        { text: 'Month', value: 'month' },
        { text: 'Custom Daily', value: 'custom-daily' },
        { text: 'Custom Weekly', value: 'custom-weekly' }
      ]
    }
  }, 
  methods: {
    addClass() {
      Stud.classAdd(this.$store.state.currentClass.classCode).then(res => {
        if(res.data === 'false') alert('클래스 수강 실패');
        else{
          // currentClass객체로 하면 오류남.
          this.$store.commit("addClassList", {
            className: this.$store.state.currentClass.className,
            classCode: this.$store.state.currentClass.classCode,
            profName: this.$store.state.currentClass.profName
          });
          this.$store.commit('setCheckApply', 1);
        } 
      })
    },
    outClass(){
      this.$store.commit("removeCurrentClass");
      this.$router.push({name: 'main'});
    }
  }
};
</script>