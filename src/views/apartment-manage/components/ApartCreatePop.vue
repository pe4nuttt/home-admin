<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Create Apartment</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <validation-observer ref="observer">
              <v-form ref="form" @submit.prevent="submit">
                <v-row>
                  <v-col cols="12" md="6">
                    <validation-provider
                      v-slot="{ errors }"
                      name="Apartment Name"
                      :rules="{
                        required: true
                      }"
                    >
                      <v-text-field
                        v-model="inputData.apartmentName"
                        label="Apartment Name *"
                        outlined
                        required
                        hide-details="auto"
                        :error-messages="errors"
                      />
                    </validation-provider>
                  </v-col>
                  <v-col cols="12" md="6">
                    <validation-provider
                      v-slot="{ errors }"
                      name="Apartment Code"
                      :rules="{
                        required: true
                      }"
                    >
                      <v-text-field
                        v-model="inputData.apartmentCode"
                        label="Apartment Code *"
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
                      name="Address"
                      :rules="{
                        required: true
                      }"
                    >
                      <v-text-field
                        v-model="inputData.address"
                        label="Address *"
                        outlined
                        required
                        hide-details="auto"
                        :error-messages="errors"
                      />
                    </validation-provider>
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
import { createOrUpdateApartment } from "@/api/apartmentApi.js";
export default {
  props: ["isModal"],
  data() {
    return {
      dialog: false,
      inputData: {
        id: 0,
        apartmentName: null,
        apartmentCode: null,
        address: null,
        creationTime: null
      }
    };
  },
  watch: {
    isModal() {
      this.dialog = this.isModal;
    }
  },
  mounted() {
    this.dialog = this.isModal;
  },
  methods: {
    async fnSave() {
      this.$refs.observer.validate().then(async res => {
        if (res) {
          console.log(this.inputData);
          let params = { ...this.inputData, creationTime: new Date() };
          await createOrUpdateApartment(params)
            .then(res => {
              this.$toast.success("Successfully");
            })
            .catch(err => {});
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
      this.inputData = {
        id: 0,
        apartmentName: null,
        apartmentCode: null,
        address: null,
        creationTime: null
      };
      this.$refs.observer.reset();
    }
  }
};
</script>

<style></style>
