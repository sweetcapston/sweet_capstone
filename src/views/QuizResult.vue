<template>
  <v-data-table style="height:100%;" :headers="headers" :items="quizResult" class="elevation-1">
    <template v-slot:items="pp">
      <td>{{ pp.item._id }}</td>
      <td>{{ pp.item.count }}</td>
    </template>
  </v-data-table>
</template>

<script>
export default {
  props: {
    quizResult: Array
  },
  data() {
    return {
      headers: [
        {
          text: "학번",
          align: "left",
          sortable: false,
        },
        {
          text: "점수",
          align: "left",
          sortable: false,
        }
      ]
    };
  }
};
</script>