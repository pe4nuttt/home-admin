<template>
  <v-navigation-drawer
    v-model="drawer"
    v-bind="$attrs"
    dark
    :src="require('@/assets/sidebar.jpg')"
    app
  >
    <template #img="props">
      <v-img :gradient="gradient" v-bind="props" />
    </template>

    <default-drawer-header />

    <v-divider />

    <default-list :items="items" />

    <template #append>
      <div class="pa-4 text-center">
        <v-btn
          block
          class="font-weight-black"
          color="red"
          rounded
          large
          target="_blank"
          href="https://www.facebook.com/tanhng1512/"
        >
          Download App
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>
<script>
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
  name: "DefaultDrawer",
  components: {
    DefaultDrawerHeader: () =>
      import(
        /* webpackChunkName: "default-drawer-header" */
        "./DrawerHeader"
      ),
    DefaultList: () =>
      import(
        /* webpackChunkName: "default-list" */
        "./List"
      )
  },
  computed: {
    ...mapState("app", {
      gradient: "gradient",
      items: "items"
    }),
    drawer: {
      get() {
        return this.$store.getters["app/getDrawer"];
      },
      set(value) {
        return this.$store.commit("app/setDrawer", value);
      }
    }
  }
};
</script>
<style lang=""></style>
