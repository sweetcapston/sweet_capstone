<template>
  <v-container
    fluid
    grid-list-xl
    fill-height>
    <v-layout
      justify-center
      align-center
    >
      <v-flex xs12>
        <v-layout
          row
          wrap>              
          <v-flex
            md6
            sm12>
            <material-card class="v-card-profile">
              <v-avatar
                slot="offset"
                class="mx-auto d-block"
                size="80"
                color="red"
              >
                <v-icon 
                  class="white--text"
                  size="30"
                >mdi-information-outline</v-icon>
              </v-avatar>
              <v-card-text class="text-xs-center">
                <p
                  class="category font-weight-light">
                  클래스 이름 : {{this.$store.state.currentClass.className}}
                </p>
                <p
                  class="category font-weight-light">
                  클래스 코드 : {{this.$store.state.currentClass.classCode}}
                </p>
                <p
                  class="category font-weight-light">
                  교수 이름 : {{this.$store.state.currentClass.profName}}
                </p>
                <div class="text-xs-right">
                  <v-btn
                    color="primary"
                    round
                    class="font-weight-light"
                    @click="addClass()"
                    v-if="this.$store.getters.getIdentity == 1 && (this.$store.state.checkApply == -1)"
                  >수강하기</v-btn>
                </div>                    
              </v-card-text>
            </material-card>

            <material-notification
              class="mb-3"
              color="info"
              dismissible
            >
              <strong>INFO</strong> - This is a regular notification made with `color="info"`
            </material-notification>

            <material-notification
              class="mb-3"
              color="success"
              dismissible
            >
              <strong>SUCCESS</strong> - This is a regular notification made with `color="success"`
            </material-notification>

            <material-notification
              class="mb-3"
              color="warning"
              dismissible
            >
              <strong>WARNING</strong> - This is a regular notification made with `color="warning"`
            </material-notification>

            <material-notification
              class="mb-3"
              color="error"
              dismissible
            >
              <strong>DANGER</strong> - This is a regular notification made with `color="error"`
            </material-notification>
<!--
            <material-notification
              class="mb-3"
              color="purple"
              dismissible
            >
              <strong>PRIMARY</strong> - This is a regular notification made with `color="purple"`
            </material-notification>
-->
          </v-flex>

          <v-flex
            md6
            sm12>
            <vue-cal 
              weight="530"
              height="600"
              :time="false" 
              class="vuecal--blue-theme"
              default-view='month'
              :disable-views="['day', 'week']"
            />

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
                      <template v-slot:day="{ date }">
                        <template v-for="event in eventsMap[date]">
                          <v-menu
                            :key="event.title"
                            v-model="event.open"
                            full-width
                            offset-x
                          >
                            <template v-slot:activator="{ on }">
                              <div
                                v-if="!event.time"
                                v-ripple
                                class="my-event"
                                v-on="on"
                                v-html="event.title"
                              ></div>
                            </template>
                            <v-card
                              color="grey lighten-4"
                              min-width="350px"
                              flat
                            >
                              <v-toolbar
                                color="primary"
                                dark
                              >
                                <v-btn icon>
                                  <v-icon>edit</v-icon>
                                </v-btn>
                                <v-toolbar-title v-html="event.title"></v-toolbar-title>
                                <v-spacer></v-spacer>
                                <v-btn icon>
                                  <v-icon>favorite</v-icon>
                                </v-btn>
                                <v-btn icon>
                                  <v-icon>more_vert</v-icon>
                                </v-btn>
                              </v-toolbar>
                              <v-card-title primary-title>
                                <span v-html="event.details"></span>
                              </v-card-title>
                              <v-card-actions>
                                <v-btn
                                  flat
                                  color="secondary"
                                >
                                  Cancel
                                </v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-menu>
                        </template>
                      </template>    
                    </v-calendar>
                  </v-sheet>
                </v-flex>  
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>            
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {Stud} from "@/api";
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'

export default {
  components: { VueCal },
  data() {
    return {
      color: null,
      colors: [
        'purple',
        'info',
        'success',
        'warning',
        'error'
      ],
      top: true,
      bottom: false,
      left: false,
      right: false,
      snackbar: false,
      type: 'month',
      start: '2019-05-01',
      end: '2019-05-06',
      typeOptions: [
        { text: 'Day', value: 'day' },
        { text: '4 Day', value: '4day' },
        { text: 'Week', value: 'week' },
        { text: 'Month', value: 'month' },
        { text: 'Custom Daily', value: 'custom-daily' },
        { text: 'Custom Weekly', value: 'custom-weekly' }
      ],
      events: [
        {
          title: 'Vacation',
          details: 'Going to the beach!',
          date: '2019-05-01',
          open: false
        },
        {
          title: 'Meeting',
          details: 'Spending time on how we do not have enough time',
          date: '2019-05-07',
          open: false
        },
        {
          title: '30th Birthday',
          details: 'Celebrate responsibly',
          date: '2019-05-03',
          open: false
        },
        {
          title: 'New Year',
          details: 'Eat chocolate until you pass out',
          date: '2019-05-01',
          open: false
        },
        {
          title: 'Conference',
          details: 'Mute myself the whole time and wonder why I am on this call',
          date: '2019-05-21',
          open: false
        },
        {
          title: 'Hackathon',
          details: 'Code like there is no tommorrow',
          date: '2019-06-01',
          open: false
        }
      ]
    }
  },
  computed: {
    // convert the list of events into a map of lists keyed by date
    eventsMap () {
      const map = {}
      this.events.forEach(e => (map[e.date] = map[e.date] || []).push(e))
      return map
    }
  },
  methods: {
    open (event) {
      alert(event.title)
    },
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
    },
    snack (...args) {
      this.top = false
      this.bottom = false
      this.left = false
      this.right = false

      for (const loc of args) {
        this[loc] = true
      }

      this.color = this.colors[Math.floor(Math.random() * this.colors.length)]

      this.snackbar = true
    }
  }
}
</script>

<style lang="stylus" scoped>
.my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #1867c0;
  color: #ffffff;
  border: 1px solid #1867c0;
  width: 100%;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
}
</style>