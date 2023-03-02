<template>
  <div class="d-flex align-center justify-end">
    <v-btn class="mr-4" @click="fnReset">
      Reset
    </v-btn>
    <v-btn @click="fnSearch" color="primary">
      Search
    </v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    fnReset() {
      this.$emit("resetBtn");
    },
    fnSearch() {
      this.$emit("searchBtn");
    }
  }
};
</script>

<style></style>
