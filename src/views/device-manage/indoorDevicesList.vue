<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        User Apartment
      </v-card-title>
      <v-card-text>
        <v-form ref="form" @submit.prevent="handleSearch">
          <v-row>
            <v-col cols="12">
              <label>
                Apartment Code
                <v-text-field
                  v-model="searchValues.apartmentCode"
                  class="mt-1"
                  dense
                  outlined
                  placeholder="Type apartment code"
                  hide-details
                />
              </label>
            </v-col>
            <!-- <v-col cols="12">
              <label>
                Apartment Code
                <v-autocomplete
                  v-model="searchValues.apartmentCode"
                  :items="[]"
                  class="mt-1"
                  outlined
                  dense
                />
              </label>
            </v-col> -->
          </v-row>
          <btn-reset-search @searchBtn="handleSearch" @resetBtn="handleReset" />
        </v-form>
      </v-card-text>
    </v-card>
    <v-card class="mt-5">
      <v-card-text class="pa-0">
        <v-data-table
          :headers="tableHeaders"
          :items="dataList"
          :items-per-page="searchValues.pageSize"
          hide-default-footer
          class="elevation-1"
        >
          <template v-slot:item.state="{ item }">
            <v-chip v-if="item.state == 0" class="ma-2" color="success">
              Good
            </v-chip>
            <v-chip v-else-if="item.state == 1" class="ma-2" color="warning">
              Bad
            </v-chip>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon
              size="24"
              color="blue"
              class="mr-2"
              @click="showEditPop(item)"
            >
              mdi-pencil-outline
            </v-icon>
            <v-icon size="24" color="red" @click="handleDeleteDevice(item.id)">
              mdi-delete-outline
            </v-icon>
          </template>

          <template v-slot:top>
            <v-toolbar flat>
              <page-count
                :page-size="searchValues.pageSize"
                @selected="handleSetPageSize"
              />
              <v-spacer></v-spacer>
              <v-btn @click="isModal1 = true" color="secondary" dark>
                Create Indoor Device
              </v-btn>
            </v-toolbar>
          </template>
          <template v-slot:footer>
            <div class="text-center mt-2 pb-4">
              <v-pagination
                @input="handleChangePageNum"
                v-model="searchValues.pageNum"
                :length="total"
              />
            </div>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    <in-device-create-pop
      :is-modal="isModal1"
      @save="onCreateUpdateInDevice"
      @close="isModal1 = false"
    />
    <in-device-update-pop
      :is-modal="isModal2"
      :detail-data="selectedRow"
      @save="onCreateUpdateInDevice"
      @close="isModal2 = false"
    />
    <!-- <apart-create-pop
      :is-modal="isModal"
      @save="onCreateUpdateInDevice"
      @close="isModal = false"
    /> -->
  </v-container>
</template>

<script>
import AppTextField from "@/components/app/TextField";
import BtnResetSearch from "@/components/app/BtnResetSearch";
import PageCount from "@/components/app/PageCount";
import InDeviceCreatePop from "./components/InDeviceCreatePop";
import InDeviceUpdatePop from "./components/InDeviceUpdatePop";
import { GetIndoorDevices, DeleteIndoorDevice } from "@/api/deviceApi.js";
import { createListNo, formatDate } from "@/utils/format";
export default {
  components: {
    AppTextField,
    BtnResetSearch,
    PageCount,
    InDeviceCreatePop,
    InDeviceUpdatePop
    // ApartCreatePop
  },
  data() {
    return {
      formatDate,
      tableHeaders: [
        {
          text: "No",
          align: "start",
          value: "no",
          sortable: false
        },
        {
          text: "Device Name",
          value: "name"
        },
        {
          text: "Apartment Code",
          value: "apartmentCode"
        },
        {
          text: "Condition",
          value: "state"
        },
        {
          text: "Actions",
          value: "actions",
          sortable: false
        }
      ],
      searchValues: {
        id: null,
        apartmentCode: null,
        pageSize: 10,
        pageNum: 1
      },
      total: 1,
      records: 0,
      dataList: [],
      isModal1: false,
      isModal2: false,
      selectedRow: {}
    };
  },
  mounted() {
    this.getList();
  },

  methods: {
    handleSearch() {
      this.getList();
    },
    handleReset() {
      this.searchValues = {
        id: null,
        apartmentCode: null,
        pageSize: 10,
        pageNum: 1
      };
      this.getList();
    },
    handleChangePageNum() {
      console.log(this.searchValues.pageNum);
      this.getList();
    },
    handleSetPageSize(value) {
      this.searchValues.pageSize = value;
      this.getList();
    },
    async getList() {
      let params = {
        Id: this.searchValues.id,
        MaxResultCount: this.searchValues.pageSize,
        SkipCount: (this.searchValues.pageNum - 1) * this.searchValues.pageSize,
        ApartmentCode: this.searchValues.apartmentCode
      };
      this.$store.commit("app/SET_LOADING", true);

      await GetIndoorDevices(params)
        .then(res => {
          this.dataList = createListNo(
            res.data.data,
            this.searchValues.pageSize,
            this.searchValues.pageNum
          );
          this.dataList.creationTime = formatDate(this.dataList.creationTime);
          this.total = Math.ceil(
            res.data.totalRecords / this.searchValues.pageSize
          );
        })
        .finally(() => {
          this.$store.commit("app/SET_LOADING", false);
        });
    },
    async handleDeleteDevice(id) {
      this.$store.commit("app/SET_LOADING", true);

      await DeleteIndoorDevice({ id })
        .then(() => {
          this.$toast.success("Successfully");
          this.$store.commit("app/SET_LOADING", false);
          this.getList();
        })
        .catch(err => {
          this.$store.commit("app/SET_LOADING", false);
        });
    },
    onCreateUpdateInDevice(value) {
      if (value === 1) {
        this.isModal1 = false;
      } else if (value === 2) {
        this.isModal2 = false;
      }
      this.getList();
    },
    showEditPop(data) {
      console.log(data);
      this.selectedRow = Object.assign({}, data);
      this.isModal2 = true;
    }
  }
};
</script>

<style></style>
