<template>
  <div v-if="isActiveLoading" class="app-loader">
    <div class="loading-overlay"></div>
    <v-progress-circular
      class="loader"
      indeterminate
      :size="64"
      :width="5"
    ></v-progress-circular>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      isActiveLoading: state => state.app.isActiveLoading
    })
  }
};
</script>

<style></style>
