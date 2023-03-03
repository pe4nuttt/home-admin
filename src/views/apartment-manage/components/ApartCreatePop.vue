<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Create Apartment</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="inputData.apartmentName"
                  label="Apartment Name *"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="inputData.apartmentCode"
                  label="Apartment Code *"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="inputData.address"
                  label="Address *"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
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
      console.log(this.inputData);
      let params = { ...this.inputData, creationTime: new Date() };
      await createOrUpdateApartment(params)
        .then(res => {
          alert("Successfully");
        })
        .catch(err => {});
      this.handleClose();
      this.$emit("save");
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
    }
  }
};
</script>

<style></style>
