<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        Account
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
              placeholder="Enter name"
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
          <template v-slot:item.fullName="{ item }">
            <v-avatar size="24" class="mr-2" color="grey">
              <v-icon dark>
                mdi-account-circle
              </v-icon>
            </v-avatar>
            <span>{{ item.fullName }}</span>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-menu v-if="item.state != 2" offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-icon size="20" class="mr-2 ml-4 pa-1" v-bind="on" v-on="on">
                  mdi-dots-vertical
                </v-icon>
              </template>
              <v-list>
                <v-list-item-group v-if="item.state == 0">
                  <v-list-item @click="handleAcceptForm(item.id)">
                    <v-list-item-icon>
                      <v-icon>mdi-check-circle-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>Accept</v-list-item-content>
                  </v-list-item>
                  <v-list-item @click="handleDenyForm(item.id)">
                    <v-list-item-icon>
                      <v-icon>mdi-close-circle-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>Deny</v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
                <v-list-item-group>
                  <v-list-item
                    v-if="item.state == 1 || item.state == 3"
                    @click="redirectUserDetail(item.userId)"
                  >
                    <v-list-item-icon>
                      <v-icon>mdi-information-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>Info</v-list-item-content>
                  </v-list-item>
                  <v-list-item
                    v-if="item.state == 1"
                    @click="handleDeletForm(item.id)"
                  >
                    <v-list-item-icon>
                      <v-icon>mdi-delete-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>Delete</v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-menu>
          </template>
          <template v-slot:item.state="{ item }">
            <v-chip v-if="item.state == 0" class="ma-2" color="warning">
              Wating
            </v-chip>
            <v-chip v-else-if="item.state == 1" class="ma-2" color="success">
              Accepted
            </v-chip>
            <v-chip v-else-if="item.state == 3" class="ma-2" color="error">
              Denied
            </v-chip>
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
              <v-pagination v-model="searchValues.pageNum" :length="total" />
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
import {
  getVerifyUser,
  acceptVerify,
  denyVerify,
  deleteVerifyUser
} from "@/api/verifyUserApi";
import { createListNo } from "@/utils/format";

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
          value: "fullName"
        },
        {
          text: "Identification",
          value: "cccd"
        },
        {
          text: "Apartment Code",
          value: "apartmentCode"
        },
        {
          text: "Status",
          value: "state"
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
    async getList() {
      let params = {
        Search: this.searchValues.search,
        MaxResultCount: this.searchValues.pageSize,
        SkipCount: (this.searchValues.pageNum - 1) * this.searchValues.pageSize
      };
      this.$store.commit("app/SET_LOADING", true);

      await getVerifyUser(params)
        .then(res => {
          console.log(res.data);
          this.dataList = createListNo(
            res.data.data,
            this.searchValues.pageSize,
            this.searchValues.pageNum
          );
          this.total = Math.ceil(
            res.data.totalRecords / this.searchValues.pageSize
          );
          console.log(this.dataList);
        })
        .finally(() => {
          this.$store.commit("app/SET_LOADING", false);
        });
    },
    async handleAcceptForm(id) {
      let bodyData = { formId: id };
      await acceptVerify(bodyData).then(res => {
        this.$toast.success("Accept Successfully");
        this.getList();
      });
    },
    async handleDenyForm(id) {
      let bodyData = { formId: id };
      await denyVerify(bodyData).then(res => {
        this.$toast.success("Deny Successfully");
        this.getList();
      });
    },
    async handleDeletForm(id) {
      let data = { id };
      await deleteVerifyUser(data).then(res => {
        this.$toast.success("Delete Successfully");
        this.getList();
      });
    },
    redirectUserDetail(userId) {
      let route = this.$router.resolve({
        name: "UserDetail",
        params: {
          id: userId
        }
      });
      window.open(route.href, "_blank");
    }
  }
};
</script>

<style></style>
