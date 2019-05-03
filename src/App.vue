<template>
  <v-app>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import Vue from "vue";
import VeeValidate from "vee-validate";
import ko from "vee-validate/dist/locale/ko.js";
import Auth from "./api/Auth";
import VueSession from "vue-session";
import ClassList from "./components/core/Class.vue";

const config = {
  locale: "ko",
  dictionary: {
    ko
  }
};

Vue.use(VeeValidate, config);
Vue.use(VueSession);
Vue.use(ClassList);

/* eslint-disable */

export default {
  created() {
    Auth.auth(this.$session.get("token")).then(res => {
      console.log(res);
    });
  },
  data() {
    return {};
  },
  methods: {}
};

</script>

<style lang="scss">
@import '@/styles/index.scss';

/* Remove in 1.2 */
.v-datatable thead th.column.sortable i {
  vertical-align: unset;
}
</style>
