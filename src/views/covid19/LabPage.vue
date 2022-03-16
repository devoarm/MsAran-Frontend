<template>
  <div>
    <b-card no-body class="card-statistics">
      <b-card-header>
        <b-card-title>LAB COVID-19</b-card-title>
        <b-card-text class="mr-25 mb-0"> Updated 1 month ago </b-card-text>
      </b-card-header>
      <b-card-body class="statistics-body">
        <b-row>
          <b-col md="3" sm="6" class="mb-2 mb-md-0">
            <b-media no-body>
              <b-media-aside class="mr-2">
                <b-avatar size="48" variant="info">
                  <feather-icon size="24" icon="ShieldIcon" />
                </b-avatar>
              </b-media-aside>
              <b-media-body class="my-auto">
                <h4 class="font-weight-bolder mb-0">
                  {{ statisticsItems[0].total }} ชุด
                </h4>
                <b-card-text class="font-small-3 mb-0">
                  {{ statisticsItems[0].lab_type }}
                </b-card-text>
              </b-media-body>
            </b-media>
          </b-col>
          <b-col md="3" sm="6" class="mb-2 mb-md-0">
            <b-media no-body>
              <b-media-aside class="mr-2">
                <b-avatar size="48" variant="info">
                  <feather-icon size="24" icon="ShieldIcon" />
                </b-avatar>
              </b-media-aside>
              <b-media-body class="my-auto">
                <h4 class="font-weight-bolder mb-0">
                  {{ statisticsItems[1].total }} ชุด
                </h4>
                <b-card-text class="font-small-3 mb-0">
                  {{ statisticsItems[1].lab_type }}
                </b-card-text>
              </b-media-body>
            </b-media>
          </b-col>
          <b-col md="3" sm="6" class="mb-2 mb-md-0">
            <b-media no-body>
              <b-media-aside class="mr-2">
                <b-avatar size="48" variant="warning">
                  <feather-icon size="24" icon="ShieldIcon" />
                </b-avatar>
              </b-media-aside>
              <b-media-body class="my-auto">
                <h4 class="font-weight-bolder mb-0">
                  {{ statisticsItems[2].total }} ชุด
                </h4>
                <b-card-text class="font-small-3 mb-0">
                  {{ statisticsItems[2].lab_type }}
                </b-card-text>
              </b-media-body>
            </b-media>
          </b-col>
          <b-col md="3" sm="6" class="mb-2 mb-md-0">
            <b-media no-body>
              <b-media-aside class="mr-2">
                <b-avatar size="48" variant="warning">
                  <feather-icon size="24" icon="ShieldIcon" />
                </b-avatar>
              </b-media-aside>
              <b-media-body class="my-auto">
                <h4 class="font-weight-bolder mb-0">
                  {{ statisticsItems[3].total }} ชุด
                </h4>
                <b-card-text class="font-small-3 mb-0">
                  {{ statisticsItems[3].lab_type }}
                </b-card-text>
              </b-media-body>
            </b-media>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>

    <!-- ค้นนหา -->
    <b-card class="card-statistics">
    <b-card-text class="mt-1 mb-0">
      <div>
        <b-form @submit.prevent>
          <b-row>
            <b-col cols="8">
              <b-form-group label="เช็คประวัติ LAB" label-for="cid" label-cols-md="2">
                <b-form-input
                  id="cid"
                  v-model="serachData"
                  placeholder="เลขบัตรประจำตัวประชาชน"
                />
              </b-form-group>
            </b-col>
            <!-- submit and reset -->
            <b-col>
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                type="submit"
                variant="primary"
                class="mr-1"
                @click="serachFetchData"
              >
                ค้นหา
              </b-button>
              <b-button
                v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                type="reset"
                variant="outline-secondary"
              >
                ล้าง
              </b-button>
            </b-col>
          </b-row>
        </b-form>
      </div>
    </b-card-text>
    </b-card>

    <b-card class="card-statistics">
    <div class="demo-inline-spacing">
      <h3>ประวัติการตรวจ Lab RT-PCR</h3>
      <b-row>
        <b-col md="2" sm="4" class="my-1">
          <b-form-group class="mb-0">
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
        <b-col md="4" sm="8" class="my-1">
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
                  <option value="">-- none --</option>
                </template>
              </b-form-select>
              <b-form-select
                v-model="sortDesc"
                size="sm"
                :disabled="!sortBy"
                class="w-25"
              >
                <option :value="false">Asc</option>
                <option :value="true">Desc</option>
              </b-form-select>
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col md="6" class="my-1">
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
                <b-button :disabled="!filter" @click="filter = ''">
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
            <!-- A virtual column -->
            <template #cell(index)="data">
              {{ data.index + 1 }}
            </template>
            <template #cell(avatar)="data">
              <b-avatar :src="data.value" />
            </template>

            <template #cell(status)="data">
              <b-badge :variant="status[1][data.value]">
                {{ status[0][data.value] }}
              </b-badge>
            </template>
          </b-table>
        </b-col>

        <b-col cols="12">
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
    </b-card>
  </div>
</template>

<script>
import {
  BCard,
  BCardHeader,
  BCardTitle,
  BCardText,
  BCardBody,
  BRow,
  BCol,
  BMedia,
  BMediaAside,
  BAvatar,
  BMediaBody,
  BFormInput,
  BForm,
  BFormGroup,
  BFormSelect,
  BButton,
  BInputGroupAppend,
  BInputGroup,
  BDropdown,
  BDropdownItem,
  BPagination,
  BBadge,
} from "bootstrap-vue";
import { BTable } from "bootstrap-vue";

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BCardHeader,
    BCardTitle,
    BCardText,
    BCardBody,
    BMedia,
    BAvatar,
    BMediaAside,
    BMediaBody,
    BTable,
    BFormInput,
    BForm,
    BButton,
    BInputGroupAppend,
    BInputGroup,
    BDropdown,
    BDropdownItem,
    BFormGroup,
    BFormSelect,
    BPagination,
    BBadge,
  },

  data() {
    return {
      serachData: "",

      statisticsItems: [],

      perPage: 20,
      pageOptions: [10, 20, 50, 100],
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
      fields: [
        { key: "index", label: "ลำดับ" },

        "hn",
        "vn",
        { key: "fullname", label: "ชื่อ-นามสกุล" },
        "cid",
        {
          key: "vstdate",
          label: "วันที่รับบริการ",
          sortable: true,

          formatter: (item) => new Date().getFullYear() - item.vstdate,
        },

        // { key: "sentdate", label: "วันที่ส่ง", sortable: true },
        { key: "nationality_name", label: "สัญชาติ", sortable: true },
        { key: "cc", label: "หมายเหตุ" },
      ],
      items: [],

      value: "",
    };
  },
  mounted() {
    this.$http
      .get("api/v1/covid/lab")
      .then((res) => {
        // handle success
        this.statisticsItems = res.data;
        console.log(this.statisticsItems);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });

    this.totalRows = this.items.length;
    console.log(this.items);
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => ({ text: f.label, value: f.key }));
    },
  },

  methods: {
    serachFetchData() {
      this.$http
        .get(`api/v1/covid/screenLabList/${this.serachData}`)
        .then((res) => {
          // handle success
          console.log(res.data);
          this.items = res.data;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    },

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
