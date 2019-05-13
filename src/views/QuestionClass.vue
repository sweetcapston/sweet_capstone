<template>
  <v-layout justify-center>
    <sui-button @click="test">Test</sui-button>
    <v-container style="max-width: 80%">
      <v-flex>
        <v-list two-line> 
          <v-timeline dense clipped>      
            <v-timeline-item
              class="mb-5"
              hide-dot
            >
              <template v-for="(item, index) in items">
                <v-subheader
                  v-if="item.header"
                  :key="item.header"
                  inset
                >
                  {{ item.header }}
                </v-subheader>

                <v-divider
                  v-else-if="item.divider"
                  :key="index"
                  inset
                ></v-divider>

                <v-list-tile
                  v-else
                  :key="item.title"
                  avatar
                  ripple
                > 
                  <v-list-tile-avatar>
                    <img :src="item.avatar">
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                    <v-list-tile-title v-html="item.name"></v-list-tile-title>  
                    <v-layout justify-space-between>
                      <v-list-tile-sub-title v-html="item.text"></v-list-tile-sub-title>
                      <v-flex xs5 text-xs-right v-html="item.time"></v-flex>
                    </v-layout>
                  </v-list-tile-content>
                </v-list-tile>
              </template>
            </v-timeline-item>
          
            <v-slide-x-transition
              group
            >
              <v-timeline-item
                v-for="event in timeline"
                :key="event.id"
                class="mb-3"
                color="pink"
                small
              >
                <v-layout justify-space-between>
                  <v-flex xs7 v-text="event.text"></v-flex>
                  <v-flex xs5 text-xs-right v-text="event.time"></v-flex>
                </v-layout>
              </v-timeline-item>
            </v-slide-x-transition>

            <v-timeline-item
              fill-dot
              class="white--text mb-5"
              color="cyan lighten-1"
              large
            >
              <template v-slot:icon>
                <span>SA</span>
              </template>
              <v-text-field
                v-model="input"
                hide-details
                flat
                label="Ask a question..."
                solo
                @keydown.enter="comment"
              >
                <template v-slot:append>
                  <v-btn
                    class="mx-0"
                    depressed
                    @click="test"
                  >
                    Post
                  </v-btn>
                </template>
              </v-text-field>
            </v-timeline-item>
          </v-timeline>
        </v-list>
      </v-flex>
    </v-container>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        events: [],
        input: null,
        nonce: 0,
        items:[
          {
            header: 'Today'
          },
          { divider: true },
          {
            avatar: 'https://picsum.photos/250/300?image=660',
            name: 'Spike Lee',
            text:
              "I'll be in your neighborhood",
            time: '15:25'

          },
          {
            avatar: 'https://picsum.photos/250/300?image=821',
            name: 'Summer',
            text: "Wish I could come.",
            time: '15:25'
          },
          {
            avatar: 'https://picsum.photos/250/300?image=783',
            name: 'Bella',
            text: "Do you have Paris recommendations",
            time: '15:26'
          },
          {
            header: 'Yesterday'
          },
          { divider: true },
          {
            avatar: 'https://picsum.photos/250/300?image=1006',
            name: 'LaToya',
            text: "Do you want to hang out?",
            time: '15:26'
          },
          {
            avatar: 'https://picsum.photos/250/300?image=146',
            name: 'Nancy',
            text: "Do you see what time it is?",
            time: '15:26'
          },
          {
            header: 'Last Week'
          },
          { divider: true },
          {
            avatar: 'https://picsum.photos/250/300?image=1008',
            name: 'LaToya',
            text: "Do you want to hang out?",
            time: '15:27'
          },
          {
            avatar: 'https://picsum.photos/250/300?image=839',
            name: 'Winter Porridge',
            text: "Tell me more...",
            time: '15:27'
          },
          {
            avatar: 'https://picsum.photos/250/300?image=145',
            name: 'Oui oui',
            text: "Do you see what time it is?",
            time: '15:27'
          }
        ]
      }
    },
    computed: {
      timeline () {
        return this.events.slice().reverse()
      }
    },
    sockets:{
      MESSAGE: function(data){
        if (Notification && Notification.permission === "granted" && data && this.$store.state.Identity==2) 
        {
          const options = {
            body: `${data._question}`,
            icon: '@/assets/logo.png',
            badge: '@/assets/logo.png',
            image: '@/assets/logo.png',
            tag: 'example-notification'
          };
          var notify = new Notification("오픈클래스", options);
        }
      }
    },
    methods: {
      test(e){
      e.preventDefault();
      alert(this.input);
      this.$socket.emit('chat', {
        classCode:this.$store.state.currentClass.classCode,
        userID:this.$store.state.userID,
        userName:this.$store.state.userName,
        _question:this.input,
        anonymous:false
      })
    },
    comment () {
      const time = (new Date()).toTimeString()
      this.events.push({
        id: this.nonce++,
        text: this.input,
        time: time.replace(/:\d{2}\s/, (match, contents, offset) => {
          return ` ${contents.split(' ').map(v => v.charAt(0)).join('')}`
        })
      })
    }
  }
}
</script>