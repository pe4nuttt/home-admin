<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        Apartment List
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
          :items-per-page="searchValues.pageSize"
          hide-default-footer
          class="elevation-1"
        >
          <!-- <template v-slot:item.no="{ item, index }">
            <span>{{
              index + 1 + searchValues.pageSize * (searchValues.pageNum - 1)
            }}</span>
          </template> -->
          <template v-slot:item.actions="{ item }">
            <v-icon
              size="24"
              color="blue"
              class="mr-2"
              @click="redirectDetail(item.id)"
            >
              mdi-information-outline
            </v-icon>
            <v-icon size="24" color="red" @click="handleDeleteUser">
              mdi-delete-outline
            </v-icon>
          </template>
          <template v-slot:item.creationTime="{ item }">
            <span> {{ formatDate(item.creationTime) }} </span>
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
import { createListNo, formatDate } from "@/utils/format";
export default {
  components: {
    AppTextField,
    BtnResetSearch,
    PageCount,
    ApartCreatePop
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
  // watch: {
  //   dataList() {
  //     this.dataList = this.dataList.map((item, index) => {
  //       return {
  //         ...item,
  //         no: index + 1 + searchValues.pageSize * (searchValues.pageNum - 1)
  //       };
  //     });
  //   }
  // },
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
    handleChangePageNum() {
      console.log(this.searchValues.pageNum);
      this.getList();
    },
    handleSetPageSize(value) {
      this.searchValues.pageSize = value;
      this.getList();
    },
    handleModifyUser() {},
    handleDeleteUser() {},
    async getList() {
      let params = {
        Id: this.searchValues?.id,
        MaxResultCount: this.searchValues.pageSize,
        SkipCount: (this.searchValues.pageNum - 1) * this.searchValues.pageSize,
        ApartmentCode: this.searchValues.apartmentCode
      };
      this.$store.commit("app/SET_LOADING", true);

      await getApartments(params)
        .then(res => {
          console.log(res.data);
          // this.dataList = res.data.data.map((item, index) => {
          //   return {
          //     ...item,
          //     no:
          //       index +
          //       1 +
          //       this.searchValues.pageSize * (this.searchValues.pageNum - 1)
          //   };
          // });
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
    onCreateApart() {
      this.isModal = false;
      this.getList();
    },
    redirectDetail(id) {
      this.$router.push({
        name: "ApartmentDetail",
        params: {
          id
        }
      });
    }
  }
};
</script>

<style></style>
