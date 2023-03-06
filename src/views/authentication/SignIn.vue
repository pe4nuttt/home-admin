<template>
  <v-container class="fill-height">
    <v-row justify="center">
      <v-col cols="auto">
        <v-img
          class="mx-auto mb-6"
          width="120"
          :src="require('@/assets/logo.png')"
        />
        <v-card width="460">
          <v-card-text class="text-center px-12 py-16">
            <validation-observer ref="observer" v-slot="{ invalid }">
              <v-form ref="form" @submit.prevent="signIn">
                <div class="text-h4 font-weight-black mb-10">
                  Login
                </div>
                <validation-provider
                  v-slot="{ errors }"
                  name="User name"
                  :rules="{
                    required: true
                  }"
                >
                  <v-text-field
                    v-model="username"
                    label="Username"
                    clearable
                    prepend-icon="mdi-email"
                    :error-messages="errors"
                  />
                </validation-provider>
                <validation-provider
                  v-slot="{ errors }"
                  name="Password"
                  :rules="{
                    required: true
                  }"
                >
                  <v-text-field
                    v-model="password"
                    type="password"
                    label="Password"
                    clearable
                    prepend-icon="mdi-lock-outline"
                    :error-messages="errors"
                  />
                </validation-provider>
                <v-btn
                  class="mt-6"
                  type="submit"
                  block
                  x-large
                  rounded
                  color="primary"
                  :disabled="invalid"
                >
                  Login
                </v-btn>
                <div class="mt-5">
                  Don't have an account yet?
                  <router-link
                    class="text-decoration-none"
                    to="/authentication/sign-up"
                  >
                    Register
                  </router-link>
                </div>
              </v-form>
            </validation-observer>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { login, register } from "@/api/authApi";

export default {
  name: "SignIn",
  data: () => ({
    username: "admin",
    password: "admin"
  }),
  methods: {
    async signIn() {
      const result = await this.$refs.observer.validate();
      if (result) {
        const bodyData = {
          userName: this.username,
          password: this.password
        };

        this.$store.commit("app/SET_LOADING", true);

        const res = await login(bodyData);
        if (res.data.success) {
          await this.$store
            .dispatch("auth/login", res.data.data)
            .finally(() => {
              this.$store.commit("app/SET_LOADING", false);
            });
          this.$router.push({ path: "/" });
        }
        this.$store.commit("app/SET_LOADING", false);
      }
    }
  }
};
</script>
<style lang=""></style>
