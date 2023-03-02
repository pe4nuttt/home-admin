<template>
  <v-fade-transition mode="out-in">
    <router-view />
  </v-fade-transition>
</template>

<script>
import "@/styles/overrides.scss";
import "@/styles/styles.scss";
export default {
  name: "App"
};
</script>
