<template lang="">
<div>
     <b-card
    no-body
    class="card-statistics"
  >
    <b-card-header>
      <b-card-title>สรุปรายงาน (ทั้งหมด {{ waitCheck+waitDrug+sendHos+successCheck+orther }} คน)</b-card-title>
      <b-card-text class="mr-25 mb-0">
        ข้อมูลของวันนี้
      </b-card-text>
    </b-card-header>
    <b-card-body class="statistics-body">
      <b-row>
        <b-col
          v-for="item in statisticsItems"
          :key="item.icon"
          md="3"
          sm="6"
          class="mb-2 mb-md-0"
          :class="item.customClass"
        >
          <b-media no-body>
            <b-media-aside

              class="mr-2"
            >
              <b-avatar
                size="48"
                :variant="item.color"
              >
                <feather-icon
                  size="24"
                  :icon="item.icon"
                />
              </b-avatar>
            </b-media-aside>
            <b-media-body class="my-auto">
              <h4 class="font-weight-bolder mb-0">
                {{ item.title }}
              </h4>
              <b-card-text class="font-small-3 mb-0">
                {{ item.subtitle }}
              </b-card-text>
            </b-media-body>
          </b-media>
        </b-col>
      </b-row>
    </b-card-body>
  </b-card>
<b-card-code title="รายการเข้ารับตรวจ">   
    <div>
        <b-row>
            <b-col
            md="2"
            sm="4"
            class="my-1"
            >
            <b-form-group
                class="mb-0"
            >
                <label class="d-inline-block text-sm-left mr-50">Per page</label>
                <b-form-select
                id="perPageSelect"
                v-model="perPage"
                size="sm"
                :options="pageOptions"
                class="w-50"
                />
            </b-form-group>
            </b-col>
            <b-col
            md="4"
            sm="8"
            class="my-1"
            >
            <b-form-group
                label="Sort"
                label-cols-sm="3"
                label-align-sm="right"
                label-size="sm"
                label-for="sortBySelect"
                class="mb-0"
            >
                <b-input-group size="sm">
                <b-form-select
                    id="sortBySelect"
                    v-model="sortBy"
                    :options="sortOptions"
                    class="w-75"
                >
                    <template v-slot:first>
                    <option value="">
                        -- none --
                    </option>
                    </template>
                </b-form-select>
                <b-form-select
                    v-model="sortDesc"
                    size="sm"
                    :disabled="!sortBy"
                    class="w-25"
                >
                    <option :value="false">
                    Asc
                    </option>
                    <option :value="true">
                    Desc
                    </option>
                </b-form-select>
                </b-input-group>
            </b-form-group>
            </b-col>
            <b-col
            md="6"
            class="my-1"
            >
            <b-form-group
                label="Filter"
                label-cols-sm="3"
                label-align-sm="right"
                label-size="sm"
                label-for="filterInput"
                class="mb-0"
            >
                <b-input-group size="sm">
                <b-form-input
                    id="filterInput"
                    v-model="filter"
                    type="search"
                    placeholder="Type to Search"
                />
                <b-input-group-append>
                    <b-button
                    :disabled="!filter"
                    @click="filter = ''"
                    >
                    Clear
                    </b-button>
                </b-input-group-append>
                </b-input-group>
            </b-form-group>
            </b-col>

            <b-col cols="12">
            <b-table
                striped
                hover
                responsive
                :per-page="perPage"
                :current-page="currentPage"
                :items="items"
                :fields="fields"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :sort-direction="sortDirection"
                :filter="filter"
                :filter-included-fields="filterOn"
                @filtered="onFiltered"
            >
                
            </b-table>
            </b-col>

            <b-col
            cols="12"
            >
            <b-pagination
                v-model="currentPage"
                :total-rows="totalRows"
                :per-page="perPage"
                align="center"
                size="sm"
                class="my-0"
            />
            </b-col>
        </b-row>
    </div>
    </b-card-code>
    </div>
</template>
<script>
import {
  BCardText,
  BTable,
  BAvatar,
  BBadge,
  BRow,
  BCol,
  BFormGroup,
  BFormSelect,
  BPagination,
  BInputGroup,
  BFormInput,
  BInputGroupAppend,
  BButton,
  BCard,
  BCardHeader,
  BCardTitle,
  BCardBody,
  BMedia,
  BMediaAside,
  BMediaBody,
} from "bootstrap-vue";
import BCardCode from "@core/components/b-card-code";
export default {
  components: {
    BCardText,
    BCardCode,
    BTable,
    BAvatar,
    BBadge,
    BRow,
    BCol,
    BFormGroup,
    BFormSelect,
    BPagination,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BButton,
    BCard,
    BCardHeader,
    BCardTitle,
    BCardBody,
    BMedia,
    BMediaAside,
    BMediaBody,
  },
  data() {
    return {
      perPage: 10,
      pageOptions: [10, 20, 50, 100, 500],
      totalRows: 1,
      currentPage: 1,
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
      statisticsItems: [],
      fields: [
        "hn",
        "pt_name",
        "main_dep_queue",
        "vettime",
        "vn",
        "cc",
        "rx_time",
        "department",
        "cur_dep_time",
        "cur_name",
        "cur_dep",
        "count_pt_depart",
      ],          
      items: [],
      waitCheck: 0,
      waitDrug: 0,
      sendHos: 0,
      successCheck: 0,
      orther: 0,
    };
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => ({ text: f.label, value: f.key }));
    },
  },
  mounted() {
    // Set the initial number of items
    this.$http.get("api/v1/audit/visit-check").then((res) => {
      this.items = res.data.result;
      this.items.forEach((item) => {
        if (item.cur_name == "ตรวจแล้ว") {
          this.successCheck++;
        }
        else if (item.cur_name == "รอผลตรวจ") {
          this.waitCheck++;
        }
        else if (item.cur_name == "ส่งต่อสถานพยาบาลอื่น") {
          this.sendHos++;
        }
        else if (item.cur_name == "รอรับยา") {
          this.waitDrug++;
        } else {
          this.orther++;
        }
      });
      this.statisticsItems = [
        {
          icon: "CheckCircleIcon",
          color: "light-success",
          title: `${this.successCheck} คน`,
          subtitle: "ตรวจแล้ว",
          customClass: "mb-2 mb-xl-0",
        },
        {
          icon: "UsersIcon",
          color: "light-primary",
          title: `${this.waitCheck} คน`,
          subtitle: "รอผลตรวจ",
          customClass: "mb-2 mb-xl-0",
        },
        {
          icon: "GitMergeIcon",
          color: "light-info",
          title: `${this.waitDrug} คน`,
          subtitle: "รอรับยา",
          customClass: "mb-2 mb-xl-0",
        },
        {
          icon: "LogOutIcon",
          color: "light-danger",
          title: `${this.sendHos} คน`,
          subtitle: "ส่งต่อสถานพยาบาลอื่น",
          customClass: "mb-2 mb-sm-0",
        },
        {
          icon: "FileMinusIcon",
          color: "light-secondary",
          title: `${this.orther} คน`,
          subtitle: "อื่น ๆ",
          customClass: "mb-2 mb-sm-0 mt-2",
        },
      ];
      this.totalRows = this.items.length;
    });
  },
  methods: {
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`;
      this.infoModal.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
};
</script>
<style lang="">
</style>