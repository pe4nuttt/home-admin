<template>
  <transition name="fade-view">
    <v-snackbar :timeout="3000"
      >{{ message }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="handleClose">
          X
        </v-btn>
      </template>
    </v-snackbar>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      type: "info",
      message: null
    };
  },
  computed: {
    color() {
      return this.type;
    }
  },
  methods: {
    handleClose() {}
  }
};
</script>

<style></style>
