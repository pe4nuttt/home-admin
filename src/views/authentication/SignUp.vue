<template>
  <v-container class="fill-height">
    <v-row justify="center">
      <v-col cols="auto">
        <!-- <router-link to="/"> -->
          <v-img
            class="mx-auto mb-6"
            width="120"
            :src="require('@/assets/logo.png')"
          />
        <!-- </router-link> -->
        <v-card width="460">
          <v-card-text class="text-center px-12 py-16">
            <validation-observer ref="observer" v-slot="{ invalid }">
              <v-form ref="form" @submit.prevent="signUp">
                <div class="text-h4 font-weight-black mb-10">
                  Register
                </div>
                <validation-provider
                  v-slot="{ errors }"
                  name="Username"
                  :rules="{
                    required: true
                  }"
                >
                  <v-text-field
                    v-model="inputData.userName"
                    label="Username"
                    clearable
                    prepend-icon="mdi-email"
                    :error-messages="errors"
                  />
                </validation-provider>
                <validation-provider
                  v-slot="{ errors }"
                  name="Fullname"
                  :rules="{
                    required: true
                  }"
                >
                  <v-text-field
                    v-model="inputData.fullName"
                    label="Fullname"
                    clearable
                    prepend-icon="mdi-camera-account"
                    :error-messages="errors"
                  />
                </validation-provider>
                <validation-provider
                  v-slot="{ errors }"
                  name="Citizen Indentification"
                  :rules="{
                    required: true
                  }"
                >
                  <v-text-field
                    v-model="inputData.cccd"
                    label="Citizen Indentification"
                    clearable
                    prepend-icon="mdi-card-account-details"
                    :error-messages="errors"
                  />
                </validation-provider>
                <validation-provider
                  v-slot="{ errors }"
                  name="Pasword"
                  :rules="{
                    required: true
                  }"
                >
                  <v-text-field
                    v-model="inputData.password"
                    label="Pasword"
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
                  Register
                </v-btn>
                <div class="mt-5">
                  Have an account yet?
                  <router-link
                    class="text-decoration-none"
                    to="/authentication/sign-in"
                  >
                    Login
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
export default {
  name: "SignUp",
  data: () => ({
    inputData: {
      userName: null,
      password: null,
      fullName: null,
      cccd: null
    }
  }),
  methods: {
    async signUp() {
      const result = await this.$refs.observer.validate();
      if (result) {
        console.log(this.inputData);
      }
    }
  }
};
</script>
<style lang=""></style>
