<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="5" lg="4">
        <v-card>
          <v-card-text class="pt-15 text-center">
            <v-avatar class="rounded" size="120" color="grey" tile>
              <img :src="require('@/assets/default-avatar.jpg')" alt="avatar" />
            </v-avatar>
            <h6 class="mt-4 text-h6">{{ userDetail.fullName }}</h6>
          </v-card-text>
          <v-card-text>
            <h6 class="text-h6">Details</h6>
            <v-divider class="mt-4 mb-2" />
            <v-list class="card-list">
              <v-list-item>
                <span class="text-subtitle-2">
                  Fullname:
                  <span class="text-body-1">{{ userDetail.fullName }}</span>
                </span>
              </v-list-item>
              <v-list-item>
                <span class="text-subtitle-2">
                  Citizen Identification:
                  <span class="text-body-1">{{ userDetail.cccd }}</span>
                </span>
              </v-list-item>
              <v-list-item>
                <span class="text-subtitle-2">
                  Country:
                  <span class="text-body-1">Vietnam</span>
                </span>
              </v-list-item>
              <v-list-item>
                <span class="text-subtitle-2">
                  Modified At:
                  <span class="text-body-1">{{ userDetail.creationTime }}</span>
                </span>
              </v-list-item>
            </v-list>
            <div class="text-center">
              <v-btn color="primary" @click="isModal = true">Edit</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="7" lg="8">
        <v-card>
          <v-card-title>
            Apartment List
          </v-card-title>
          <v-card-text class="pa-0">
            <v-data-table
              :headers="tableHeaders"
              :items="dataList"
              :items-per-page="10"
              hide-default-footer
              class="elevation-1"
            >
              <template v-slot:item.no="{ item, index }">
                <span>{{ index + 1 }}</span>
              </template>
              <template v-slot:item.actions="{ item, index }">
                <v-icon
                  size="24"
                  color="blue"
                  class="mr-2"
                  @click="redirectApartDetail(item.apartmentId)"
                >
                  mdi-information-outline
                </v-icon>
                <v-icon size="24" color="red" @click="handleDeleteUser(index)">
                  mdi-delete-outline
                </v-icon>
              </template>
              <template v-slot:top>
                <v-toolbar flat>
                  <page-count
                    :page-size="searchValues.pageSize"
                    @selected="handleSetPageSize"
                  />
                </v-toolbar>
              </template>
              <template v-slot:footer>
                <div class="text-center mt-2 pb-4">
                  <v-pagination
                    v-model="searchValues.pageNum"
                    :length="total"
                    @input="handleChangePageNum()"
                  />
                </div>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <user-update-pop
      :is-modal="isModal"
      :detail-data="userDetail"
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
import UserUpdatePop from "./components/UserUpdatePop.vue";
import { getApartsOfUser } from "@/api/userApartmentApi";
import { getUser } from "@/api/userApi";
export default {
  components: {
    AppTextField,
    BtnResetSearch,
    PageCount,
    UserUpdatePop
  },
  data() {
    return {
      tableHeaders: [
        {
          text: "No",
          value: "no",
          align: "start",
          sortable: false
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
        userId: this.$route.params.id,
        pageSize: 10,
        pageNum: 1
      },
      total: 1,
      records: 0,
      dataList: [],
      userDetail: {},
      isModal: false
    };
  },
  mounted() {
    this.getApartList();
    this.getUserDetail();
  },
  methods: {
    handleSearch() {
      this.getApartList();
    },
    handleReset() {
      this.searchValues = {
        search: null,
        pageSize: 10,
        pageNum: 1
      };
      this.getApartList();
    },
    handleSetPageSize(value) {
      this.searchValues.pageSize = value;
      this.getApartList();
    },
    handleChangePageNum() {
      console.log(this.searchValues.pageNum);
      this.getApartList();
    },
    handleDeleteUser(item) {
      console.log(item);
    },
    async getApartList() {
      let params = {
        UserId: this.searchValues.userId,
        MaxResultCount: this.searchValues.pageSize,
        SkipCount: (this.searchValues.pageNum - 1) * this.searchValues.pageSize
      };
      this.$store.commit("app/SET_LOADING", true);

      await getApartsOfUser(params)
        .then(res => {
          console.log(res.data);
          this.dataList = res.data.data;
          this.total = Math.ceil(
            res.data.totalRecords / this.searchValues.pageSize
          );
          console.log(this.dataList);
        })
        .finally(() => {
          this.$store.commit("app/SET_LOADING", false);
        });
    },
    async getUserDetail() {
      this.$store.commit("app/SET_LOADING", true);
      await getUser({ AccountId: this.$route.params.id })
        .then(res => {
          this.userDetail = res.data.data;
          this.userDetail.creationTime = formatDate(
            this.userDetail.creationTime
          );
          this.$store.commit("app/SET_LOADING", false);
        })
        .catch(err => {
          this.$store.commit("app/SET_LOADING", false);
        });
    },
    handleEdit() {
      this.isModal = false;
      this.getUserDetail();
    },
    redirectApartDetail(id) {
      let route = this.$router.resolve({
        name: "ApartmentDetail",
        params: {
          id
        }
      });
      window.open(route.href, "_blank");
    }
  }
};
</script>

<style></style>
