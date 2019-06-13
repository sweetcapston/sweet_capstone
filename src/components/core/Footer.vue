<template>
  <v-footer
    id="core-footer"
    absolute
    height="60"
  >
    <div class="footer-items">
      <span
        v-for="link in links"
        :key="link.name"
        style="margin-left: 50px"
      >
        <a
          @click="goTop()"
          class="tertiary--text footer-links">{{ link.name }}</a>
      </span>
    </div>
    <v-spacer/>
    <span class="font-weight-light copyright" style="margin-right: 50px">
      &copy;
      {{ (new Date()).getFullYear() }}
      <a
        href="https://github.com/sweetcapston"
        target="_blank">Sweet Team</a>, made with
      <v-icon
        color="tertiary"
        size="17">mdi-heart</v-icon>
      for a better lecture
    </span>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    links: [
      { name: 'Home', Link: '/' }
    ]
  }),
  methods: {
    goTop(){
      document.querySelector("body").scrollTop=0
    }
  },
}
</script>

<style>
#core-footer {
  z-index: 0;
}
</style>
