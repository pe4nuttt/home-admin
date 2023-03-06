<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        Apartment Detail
      </v-card-title>
      <v-card-text>
        <v-list>
          <v-row>
            <v-col cols="12" md="6" lg="4">
              <v-list-item>
                <span class="text-subtitle-2">
                  Apartment Name:
                  <span class="text-body-1">{{
                    apartDetail.apartmentName
                  }}</span>
                </span>
              </v-list-item>
            </v-col>
            <v-col cols="12" md="6" lg="4">
              <v-list-item>
                <span class="text-subtitle-2">
                  Apartment Code:
                  <span class="text-body-1">{{
                    apartDetail.apartmentCode
                  }}</span>
                </span>
              </v-list-item>
            </v-col>
            <v-col cols="12" md="6" lg="4">
              <v-list-item>
                <span class="text-subtitle-2">
                  Address:
                  <span class="text-body-1">{{ apartDetail.address }}</span>
                </span>
              </v-list-item>
            </v-col>
            <v-col cols="12" md="6" lg="4">
              <v-list-item>
                <span class="text-subtitle-2">
                  Created At:
                  <span class="text-body-1">{{
                    apartDetail.creationTime
                  }}</span>
                </span>
              </v-list-item>
            </v-col>
          </v-row>
        </v-list>
        <!-- <btn-reset-search @searchBtn="handleSearch" @resetBtn="handleReset" /> -->
        <div class="d-flex align-center justify-end">
          <v-btn color="primary" @click="isModal = true">Edit</v-btn>
        </div>
      </v-card-text>
    </v-card>
    <v-card class="mt-5">
      <v-card-text class="pa-0">
        <v-data-table
          :headers="tableHeaders"
          :items="userList"
          :items-per-page="10"
          hide-default-footer
          class="elevation-1"
        >
          <template v-slot:item.userName="{ item }">
            <v-avatar size="24" class="mr-2" color="grey">
              <v-icon dark>
                mdi-account-circle
              </v-icon>
            </v-avatar>
            <span>{{ item.userName }}</span>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon
              size="24"
              color="blue"
              class="mr-2"
              @click="redirectUserDetail(item.userId)"
            >
              mdi-information-outline
            </v-icon>
            <v-icon
              size="24"
              color="red"
              @click="handleDeleteUserApart(item.id)"
            >
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
            </v-toolbar>
          </template>
          <template v-slot:footer>
            <div class="text-center mt-2 pb-4">
              <v-pagination
                v-model="searchValues.pageNum"
                :length="total"
                @input="handleChangePageNum"
              />
            </div>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    <apart-update-pop
      :isModal="isModal"
      :detailData="apartDetail"
      @save="handleEdit"
      @close="isModal = false"
    />
  </v-container>
</template>

<script>
import { formatDate } from "@/utils/format";
import AppTextField from "@/components/app/TextField";
import BtnResetSearch from "@/components/app/BtnResetSearch";
import PageCount from "@/components/app/PageCount";
import ApartUpdatePop from "./components/ApartUpdatePop";
import { getUserApartList, deleteUserApartment } from "@/api/userApartmentApi";
import { getApartments } from "@/api/apartmentApi";
import { createListNo } from "@/utils/format";
export default {
  components: {
    AppTextField,
    BtnResetSearch,
    PageCount,
    ApartUpdatePop
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
      total: 1,
      records: 0,
      userList: [],
      apartDetail: {},
      isModal: false
    };
  },
  computed: {
    apartId() {
      return this.$route.params.id;
    }
  },
  mounted() {
    Promise.all([this.getApartDetail(), this.getList()]);
  },
  methods: {
    handleSetPageSize(value) {
      this.searchValues.pageSize = value;
      this.getList();
    },
    handleChangePageNum() {
      console.log(this.searchValues.pageNum);
      this.getList();
    },

    redirectUserDetail(id) {
      let route = this.$router.resolve({
        name: "UserDetail",
        params: {
          id
        }
      });
      window.open(route.href, "_blank");
    },
    async getApartDetail() {
      await getApartments({ id: this.apartId }).then(res => {
        this.apartDetail = res.data.data[0];
        this.apartDetail.creationTime = formatDate(
          this.apartDetail.creationTime
        );
      });
    },
    async getList() {
      //   let params = {
      //     Search: this.searchValues.search,
      //     MaxResultCount: this.searchValues.pageSize,
      //     SkipCount: (this.searchValues.pageNum - 1) * this.searchValues.pageSize
      //   };
      let params = {
        ApartmentId: this.apartId
      };
      this.$store.commit("app/SET_LOADING", true);

      await getUserApartList(params)
        .then(res => {
          console.log(res.data);
          this.userList = createListNo(
            res.data.data,
            searchValues.pageSize,
            searchValues.pageNum
          );
          this.total = Math.ceil(
            res.data.totalRecords / this.searchValues.pageSize
          );
        })
        .finally(() => {
          this.$store.commit("app/SET_LOADING", false);
        });
    },
    async handleDeleteUserApart(id) {
      this.$store.commit("app/SET_LOADING", true);

      await deleteUserApartment({ id })
        .then(res => {
          this.getUserApartList();
          this.$store.commit("app/SET_LOADING", false);
          this.$toast.success("Delete Successfully");
        })
        .catch(err => {
          this.$store.commit("app/SET_LOADING", false);
        });
    },
    handleEdit() {
      this.isModal = false;
      this.getApartDetail();
    }
  }
};
</script>

<style></style>
