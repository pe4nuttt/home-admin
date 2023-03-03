<template>
  <v-app>
    <!-- <v-fade-transition mode="out-in"> -->
    <router-view />
    <!-- </v-fade-transition> -->
    <Loading />
  </v-app>
</template>

<script>
import "@/styles/overrides.scss";
import "@/styles/styles.scss";
import Loading from "@/components/app/Loading.vue";
export default {
  name: "App",
  components: {
    Loading
  }
};
</script>
