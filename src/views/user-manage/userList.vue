<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        User Apartment
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <app-text-field
            v-model="searchValues.search"
            label="Search"
            placeholder="Search by name or aparment id"
          />
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
              <v-btn color="secondary" dark>
                New User
              </v-btn>
            </v-toolbar>
          </template>
          <template v-slot:footer>
            <div class="text-center mt-2 pb-4">
              <v-pagination v-model="searchValues.pageNum" :length="6" />
            </div>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import AppTextField from "@/components/app/TextField";
import BtnResetSearch from "@/components/app/BtnResetSearch";
import PageCount from "@/components/app/PageCount";
import { getUserApartList } from "@/api/userApartmentApi";
export default {
  components: {
    AppTextField,
    BtnResetSearch,
    PageCount
  },
  data() {
    return {
      tableHeaders: [
        {
          text: "No",
          align: "start",
          value: "userId",
          sortable: false
        },
        {
          text: "Name",
          value: "userName"
        },
        {
          text: "Apartment Code",
          value: "apartmentCode"
        },
        {
          text: "Apartment",
          value: "apartmentName"
        },
        {
          text: "Actions",
          value: "actions",
          sortable: false
        }
      ],
      searchValues: {
        search: null,
        pageSize: 10,
        pageNum: 1
      },
      dataList: []
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    handleSearch() {},
    handleReset() {},
    handleSetPageSize() {},
    handleModifyUser() {},
    handleDeleteUser() {},
    async getList() {
      let params = {
        Search: this.searchValues.search,
        MaxResultCount: this.searchValues.pageSize,
        SkipCount: this.searchValues.pageNum * this.searchValues.pageSize
      };
      await getUserApartList(params).then(res => {
        console.log(res.data);
        this.dataList = res.data;
      });
    }
  }
};
</script>

<style></style>
