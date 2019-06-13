<template>
  <v-data-table :headers="headers" :items="questionList" class="elevation-1">
    <template v-slot:items="pp">
      <td>{{ pp.item._id }}</td>
      <td>{{ pp.item.count }}</td>
    </template>
  </v-data-table>
</template>

<script>
export default {
  props: {
    questionList: Array
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
          text: "질문횟수",
          align: "left",
          sortable: false,
        }
      ]
    };
  }
};
</script>