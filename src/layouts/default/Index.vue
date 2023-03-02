<template>
  <v-app>
    <default-bar />

    <default-drawer />

    <default-view />
  </v-app>
</template>
<script>
import DefaultBar from "./AppBar";
import DefaultDrawer from "./Drawer";
import DefaultView from "./View";
import { getApartments } from "@/api/apartmentApi.js";
export default {
  name: "DefaultLayout",
  components: {
    DefaultBar,
    DefaultDrawer,
    DefaultView
  },
  async mounted() {
    await getApartments().then(res => {
      console.log(res);
    });
  }
};
</script>
<style lang=""></style>
