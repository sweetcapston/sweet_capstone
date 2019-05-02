<template>
  <v-footer
    id="core-footer"
    absolute
    height="82"
  >
    <div class="footer-items">
      <span
        v-for="link in links"
        :key="link.name"
      >
        <a
          :href="link.Link"
          class="tertiary--text footer-links">{{ link.name }}</a>
      </span>
    </div>
    <v-spacer/>
    <span class="font-weight-light copyright">
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
      { name: 'Home', Link: '/' },
      { name: 'Sweet Team', Link: 'https://github.com/sweetcapston' }
    ]
  })
}
</script>

<style>
#core-footer {
  z-index: 0;
}
</style>
