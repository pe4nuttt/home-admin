<template>
  <v-app-bar app color="primary" dark class="app-bar-container">
    <v-app-bar-nav-icon @click="drawer = !drawer" />
    <v-toolbar-title>{{ $route.name }}</v-toolbar-title>
    <v-spacer />
    <v-menu bottom min-width="200px" rounded offset-y>
      <template v-slot:activator="{ on }">
        <v-btn icon x-large v-on="on">
          <v-avatar color="brown" size="32">
            <span class="white--text text-subtitle-1">{{ user.initials }}</span>
          </v-avatar>
        </v-btn>
      </template>
      <v-card>
        <v-list>
          <v-list-item-group>
            <v-list-item>
              <v-avatar color="brown" size="42" class="mr-4">
                <span class="white--text text-subtitle-1">{{
                  user.initials
                }}</span>
              </v-avatar>
              <v-list-item-content>
                <h4>{{ user.fullName }}</h4>
                <span class="text-subtitle-1">{{ user.role }}</span>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-icon class="mr-4">
                <v-icon>mdi-account-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Account</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon class="mr-4">
                <v-icon>mdi-cog-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Setting</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-icon class="mr-4">
                <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title @click="fnLogout">Log out</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>
<script>
export default {
  name: "DefaultBar",
  data() {
    return {
      user: {
        initials: "TA",
        fullName: "Tien Anh",
        email: "tienanh@ta.com",
        role: "Admin"
      }
    };
  },
  computed: {
    drawer: {
      get() {
        return this.$store.getters["app/getDrawer"];
      },
      set(value) {
        return this.$store.commit("app/setDrawer", value);
      }
    }
  },
  methods: {
    async fnLogout() {
      this.$store.commit("app/SET_LOADING", true);

      await this.$store
        .dispatch("auth/logout")
        .then(res => {
          this.$router.push({ name: "SignIn" });
        })
        .finally(() => {
          this.$store.commit("app/SET_LOADING", false);
        });
    }
  }
};
</script>
<style lang=""></style>
