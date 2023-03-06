<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        User Apartment
      </v-card-title>
      <v-card-text>
        <v-form ref="form" @submit.prevent="handleSearch">
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
              @click="redirectDetail(item.userId)"
            >
              mdi-information-outline
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
              <v-pagination @input="handleChangePageNum" v-model="searchValues.pageNum" :length="total" />
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
import { createListNo, formatDate } from "@/utils/format";

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
          value: "no",
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
      total: 1,
      records: 0,
      dataList: []
    };
  },
  mounted() {
    this.getList();
    // this.$toast("My toast content", {
    //   timeout: 100000
    // });
    // this.$toast.info("Info toast");
    // this.$toast.success("Success toast");
    // this.$toast.error("Error toast");
    // this.$toast.warning("Warning toast");
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
    handleSetPageSize(value) {
      this.searchValues.pageSize = value;
      this.getList();
    },
    handleChangePageNum() {
      console.log(this.searchValues.pageNum);
      this.getList();
    },
    handleDeleteUser() {},
    async getList() {
      let params = {
        Search: this.searchValues.search,
        MaxResultCount: this.searchValues.pageSize,
        SkipCount: (this.searchValues.pageNum - 1) * this.searchValues.pageSize
      };
      this.$store.commit("app/SET_LOADING", true);

      await getUserApartList(params)
        .then(res => {
          console.log(res.data);
          this.dataList = createListNo(
            res.data.data,
            this.searchValues.pageSize,
            this.searchValues.pageNum
          );
          this.dataList.creationTime = formatDate(this.dataList.creationTime);
          this.total = Math.ceil(
            res.data.totalRecords / this.searchValues.pageSize
          );
          console.log(this.dataList);
        })
        .finally(() => {
          this.$store.commit("app/SET_LOADING", false);
        });
    },
    redirectDetail(userId) {
      console.log(userId);
      this.$router.push({
        name: "UserDetail",
        params: { id: userId }
      });
    }
  }
};
</script>

<style></style>
