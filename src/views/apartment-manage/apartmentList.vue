<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        User Apartment
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <label>
            Search
            <v-text-field
              v-model="searchValues.search"
              class="mt-1"
              dense
              outlined
              placeholder="Type name or apartment id"
            />
          </label>
          <btn-reset-search @searchBtn="handleSearch" @resetBtn="handleReset" />
        </v-form>
      </v-card-text>
    </v-card>
    <v-card class="mt-5">
      <v-card-text class="pa-0">
        <v-data-table
          :headers="tableHeaders"
          :items="dataList"
          :items-per-page="10"
          hide-default-footer
          class="elevation-1"
        >
          <template v-slot:item.actions="{ item }">
            <v-icon
              size="24"
              color="blue"
              class="mr-2"
              @click="handleModifyUser"
            >
              mdi-pencil-outline
            </v-icon>
            <v-icon size="24" color="red" @click="handleDeleteUser">
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
              <v-btn @click="isModal = true" color="secondary" dark>
                Create Apartment
              </v-btn>
            </v-toolbar>
          </template>
          <template v-slot:footer>
            <div class="text-center mt-2 pb-4">
              <v-pagination v-model="searchValues.pageNum" :length="total" />
            </div>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    <apart-create-pop
      :is-modal="isModal"
      @save="onCreateApart"
      @close="isModal = false"
    />
  </v-container>
</template>

<script>
import AppTextField from "@/components/app/TextField";
import BtnResetSearch from "@/components/app/BtnResetSearch";
import PageCount from "@/components/app/PageCount";
import ApartCreatePop from "./components/ApartCreatePop";
import { getApartments } from "@/api/apartmentApi.js";
export default {
  components: {
    AppTextField,
    BtnResetSearch,
    PageCount,
    ApartCreatePop
  },
  data() {
    return {
      tableHeaders: [
        {
          text: "No",
          align: "start",
          value: "id",
          sortable: false
        },
        {
          text: "Apartment Name",
          value: "apartmentName"
        },
        {
          text: "Apartment Code",
          value: "apartmentCode"
        },
        {
          text: "Address",
          value: "address"
        },
        {
          text: "Created At",
          value: "creationTime"
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
        pageNum: 1,
        search: null
      },
      total: 1,
      records: 0,
      dataList: [],
      isModal: false
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
        search: null,
        pageSize: 10,
        pageNum: 1
      };
      this.getList();
    },
    handleSetPageSize() {},
    handleModifyUser() {},
    handleDeleteUser() {},
    async getList() {
      let params = {
        Id: this.searchValues.id,
        MaxResultCount: this.searchValues.pageSize,
        SkipCount: (this.searchValues.pageNum - 1) * this.searchValues.pageSize,
        ApartmentCode: this.searchValues.apartmentCode
      };
      this.$store.commit("app/SET_LOADING", true);

      await getApartments(params)
        .then(res => {
          console.log(res.data);
          this.dataList = res.data.data;
          this.total = Math.ceil(
            res.data.totalRecords / this.searchValues.pageSize
          );
        })
        .finally(() => {
          this.$store.commit("app/SET_LOADING", false);
        });
    },
    onCreateApart() {
      this.isModal = false;
      this.getList();
    }
  }
};
</script>

<style></style>
