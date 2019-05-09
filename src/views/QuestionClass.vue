<template>
  <v-container style="max-width: 80%;">
    <sui-button @click="test">Test</sui-button>
    <v-timeline dense clipped>
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
        class="mb-4"
        hide-dot
      >
        <span>TODAY</span>
      </v-timeline-item>

      <v-timeline-item
        class="mb-5"
        large
      >
        <template v-slot:icon>
          <v-avatar>
            <img src="http://i.pravatar.cc/60">
          </v-avatar>
        </template>
        <v-layout justify-space-between>
          <v-flex xs7>This order was archived.</v-flex>
          <v-flex xs5 text-xs-right>15:26</v-flex>
        </v-layout>
      </v-timeline-item>

      <v-timeline-item
        class="mb-5"
        large
      >
        <template v-slot:icon>
          <v-avatar>
            <img src="http://i.pravatar.cc/61">
          </v-avatar>
        </template>
        <v-layout justify-space-between>
          <v-flex xs7>
            <v-chip
              class="white--text ml-0"
              color="purple"
              label
              small
            >
              APP
            </v-chip>
            Digital Downloads fulfilled 1 item.
          </v-flex>
          <v-flex xs5 text-xs-right>15:25</v-flex>
        </v-layout>
      </v-timeline-item>

      <v-timeline-item
        class="mb-5"
        large
      >
        <template v-slot:icon>
          <v-avatar>
            <img src="http://i.pravatar.cc/62">
          </v-avatar>
        </template>
        <v-layout justify-space-between>
          <v-flex xs7>
            Order confirmation email was sent to John Leider (john@vuetifyjs.com).
          </v-flex>
          <v-flex xs5 text-xs-right>15:25</v-flex>
        </v-layout>
      </v-timeline-item>

      <v-timeline-item
        class="mb-3"
        hide-dot
      >
        <v-btn
          class="mx-0"
          color="white"
        >
          Resend Email
        </v-btn>
      </v-timeline-item>

      <v-timeline-item
        class="mb-5"
        large
      >
        <template v-slot:icon>
          <v-avatar>
            <img src="http://i.pravatar.cc/63">
          </v-avatar>
        </template>
        <v-layout justify-space-between>
          <v-flex xs7>
            A $15.00 USD payment was processed on PayPal Express Checkout
          </v-flex>
          <v-flex xs5 text-xs-right>15:25</v-flex>
        </v-layout>
      </v-timeline-item>

      <v-timeline-item
        class="mb-5"
        large
      >
        <template v-slot:icon>
          <v-avatar>
            <img src="http://i.pravatar.cc/64">
          </v-avatar>
        </template>
        <v-layout justify-space-between>
          <v-flex xs7>
            John Leider placed this order on Online Store.
          </v-flex>
          <v-flex xs5 text-xs-right>15:25</v-flex>
        </v-layout>
      </v-timeline-item>
      
      <v-timeline-item
        fill-dot
        class="white--text mb-5"
        color="orange"
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
              @click="comment"
            >
              Post
            </v-btn>
          </template>
        </v-text-field>
      </v-timeline-item>
    </v-timeline>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      events: [],
      input: null,
      nonce: 0
    }),

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
      this.$socket.emit('chat', {
        classCode:this.$store.state.currentClass.classCode,
        userID:this.$store.state.userID,
        userName:this.$store.state.userName,
        _question:"messsssssage",
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

        this.input = null
      }
    }
  }
</script>
