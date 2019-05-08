<template>
  <v-layout>
    <h1> 질문 페이지 </h1>
    <h1> 클래스 코드 : {{this.$store.state.currentClass.classCode}} </h1>

    <v-list two-line>
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
        >
        </v-divider>

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
            <v-list-tile-title v-html="item.title"></v-list-tile-title>
            <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          {
            header: 'Today'
          },
          { divider: true },
          {
            avatar: 'https://picsum.photos/250/300?image=660',
            title: 'Meeting @ Noon',
            subtitle:
              "<span class='text--primary'>Spike Lee</span> &mdash; I'll be in your neighborhood"
          },
          {
            avatar: 'https://picsum.photos/250/300?image=821',
            title: 'Summer BBQ <span class="grey--text text--lighten-1"></span>',
            subtitle:
              "<span class='text--primary'>to Operations support</span> &mdash; Wish I could come."
          },
          {
            avatar: 'https://picsum.photos/250/300?image=783',
            title: 'Yes yes',
            subtitle:
              "<span class='text--primary'>Bella</span> &mdash; Do you have Paris recommendations"
          },
          {
            header: 'Yesterday'
          },
          { divider: true },
          {
            avatar: 'https://picsum.photos/250/300?image=1006',
            title: 'Dinner tonight?',
            subtitle:
              "<span class='text--primary'>LaToya</span> &mdash; Do you want to hang out?"
          },
          {
            avatar: 'https://picsum.photos/250/300?image=146',
            title: 'So long',
            subtitle:
              "<span class='text--primary'>Nancy</span> &mdash; Do you see what time it is?"
          },
          {
            header: 'Last Week'
          },
          { divider: true },
          {
            avatar: 'https://picsum.photos/250/300?image=1008',
            title: 'Breakfast?',
            subtitle:
              "<span class='text--primary'>LaToya</span> &mdash; Do you want to hang out?"
          },
          {
            avatar: 'https://picsum.photos/250/300?image=839',
            title:
              'Winter Porridge <span class="grey--text text--lighten-1"></span>',
            subtitle:
              "<span class='text--primary'>cc: Daniel</span> &mdash; Tell me more..."
          },
          {
            avatar: 'https://picsum.photos/250/300?image=145',
            title: 'Oui oui',
            subtitle:
              "<span class='text--primary'>Nancy</span> &mdash; Do you see what time it is?"
          }
        ]
      }
    }
  }
</script>

<style>
.avatar {
  size: "60";
}
</style>
