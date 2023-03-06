<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Edit Indoor Device</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <validation-observer ref="observer">
              <v-form ref="form" @submit.prevent="submit">
                <v-row>
                  <v-col cols="12" md="6">
                    <validation-provider
                      v-slot="{ errors }"
                      name="Device Name"
                      :rules="{
                        required: true
                      }"
                    >
                      <v-text-field
                        v-model="inputData.name"
                        label="Device Name *"
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
                      name="Apartment"
                      :rules="{
                        required: true
                      }"
                    >
                      <v-autocomplete
                        v-model="inputData.apartmentCode"
                        label="Apartment *"
                        :items="apartmentOptions"
                        item-text="apartmentCode"
                        item-value="apartmentCode"
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
import { CreateIndoorDevice } from "@/api/deviceApi.js";
import { getApartments } from "@/api/apartmentApi.js";
export default {
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
        name: null,
        apartmentCode: null
      },
      apartmentOptions: []
    };
  },
  watch: {
    isModal() {
      this.dialog = this.isModal;
    },
    detailData() {
      this.inputData = this.detailData;
    }
  },
  mounted() {
    this.dialog = this.isModal;
    this.getApartOptions();
  },
  methods: {
    async getApartOptions() {
      await getApartments()
        .then(res => {
          this.apartmentOptions = res.data.data;
        })
        .catch(err => {});
    },
    async fnSave() {
      this.$refs.observer.validate().then(async res => {
        if (res) {
          let bodyData = { ...this.inputData };
          await CreateIndoorDevice(bodyData)
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
