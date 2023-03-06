<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Edit User Details</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <validation-observer ref="observer">
              <v-form ref="form" @submit.prevent="submit">
                <v-row>
                  <v-col cols="12">
                    <validation-provider
                      v-slot="{ errors }"
                      name="Full Name"
                      :rules="{
                        required: true
                      }"
                    >
                      <v-text-field
                        v-model="inputData.fullName"
                        label="Full Name *"
                        outlined
                        required
                        hide-details="auto"
                        :error-messages="errors"
                      />
                    </validation-provider>
                  </v-col>
                  <v-col cols="12">
                    <validation-provider
                      v-slot="{ errors }"
                      name="Citizen Indentify Code"
                      :rules="{
                        required: true
                      }"
                    >
                      <v-text-field
                        v-model="inputData.cccd"
                        label="Citizen Indentify *"
                        outlined
                        required
                        hide-details="auto"
                        :error-messages="errors"
                      />
                    </validation-provider>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="inputData.creationTime"
                      label="Modified At"
                      outlined
                      hide-details="auto"
                      readonly
                    />
                  </v-col>
                </v-row>
              </v-form>
            </validation-observer>
          </v-container>
        </v-card-text>
        <v-card-actions class="pb-6">
          <v-spacer></v-spacer>
          <v-btn class="mr-2" @click="fnClose">
            Close
          </v-btn>
          <v-btn color="primary" @click="fnSave">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { updateUser } from "@/api/userApi.js";
export default {
  //   props: ["isModal", "detailData"],
  props: {
    isModal: Boolean,
    detailData: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      dialog: false,
      inputData: {
        id: 0,
        fullName: null,
        cccd: null,
        accountId: null,
        creationTime: null
      }
    };
  },
  watch: {
    isModal() {
      this.dialog = this.isModal;
      this.inputData = Object.assign({}, this.detailData);
      console.log(this.detailData);
    }
  },
  mounted() {
    this.dialog = this.isModal;
    this.inputData = this.detailData;
    console.log(this.detailData);
  },
  methods: {
    async fnSave() {
      this.$refs.observer.validate().then(async res => {
        if (res) {
          console.log(this.inputData);
          let bodyData = { ...this.inputData, creationTime: new Date() };
          this.$store.commit("app/SET_LOADING", true);
          await updateUser(bodyData)
            .then(res => {
              this.$toast.success("Successfully");
              this.$store.commit("app/SET_LOADING", false);
            })
            .catch(err => {
              this.$store.commit("app/SET_LOADING", false);
            });
          this.handleClose();
          this.$emit("save");
        } else {
          this.$toast.error("Form invalid");
        }
      });
    },
    fnClose() {
      this.handleClose();
      this.$emit("close");
    },
    handleClose() {
      this.$refs.observer.reset();
    }
  }
};
</script>

<style></style>
