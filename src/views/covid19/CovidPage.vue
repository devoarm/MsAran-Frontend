<template>
  <b-card no-body class="card-statistics">
    <b-card-header>
      <b-card-title>WARD COVID-19</b-card-title>

      <b-row>
        <b-col>
          <label for="datepicker-valid">วันที่เริ่ม</label>
          <b-form-datepicker
            id="datepicker-invalid"
            :state="false"
            locale="th"
          />
        </b-col>
        <b-col>
          <label for="datepicker-valid">วันที่สิ้นสุด</label>
          <b-form-datepicker id="datepicker-valid" :state="true" locale="th" />
        </b-col>
        <b-col>
          <b-button variant="relief-primary" class="mb-2">GO</b-button>
        </b-col>

        <!-- <b-col>
      <b-card-text class="mr-25 mb-0">
       Updated 1 month ago
      </b-card-text>
    </b-col> -->
      </b-row>
    </b-card-header>
    <b-card-body class="statistics-body">
      <b-row>
        <b-col
          v-for="item in statisticsItems2"
          :key="item.icon"
          md="3"
          sm="6"
          class="mb-2 mb-md-0"
          :class="item.customClass"
        >
          <b-media no-body>
            <b-media-aside class="mr-2">
              <b-avatar size="48" :variant="item.color">
                <feather-icon size="24" :icon="item.icon" />
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
            <b-media-aside class="mr-2">
              <b-avatar size="48" :variant="item.color">
                <feather-icon size="24" :icon="item.icon" />
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

    <b-card-body title="รายละเอียด">
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
                placeholder="ค้นหาระบุ...."
              />
              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''">
                  ล้าง
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
    </b-card-body>
  </b-card>
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
  BTable,
  BFormDatepicker,
  BButton,
  BBadge,
  BFormGroup,
  BFormSelect,
  BPagination,
  BInputGroup,
  BFormInput,
  BInputGroupAppend,
} from "bootstrap-vue";
import { keys } from "postcss-rtl/lib/affected-props";

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
    BFormDatepicker,
    BButton,

    BBadge,
    BFormGroup,
    BFormSelect,
    BPagination,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
  },
  data() {
    return {
      items: [],
      statisticsItems: [],

      statisticsItems2: [
        {
          icon: "UserIcon",
          color: "light-danger",
          title: "230k",
          subtitle: "ผู้ป่วยแดง",
          customClass: "mb-2 mb-xl-0",
        },
        {
          icon: "UserIcon",
          color: "light-warning",
          title: "8.549k",
          subtitle: "ผู้ป่วยเหลือง",
          customClass: "mb-2 mb-xl-0",
        },
        {
          icon: "UserIcon",
          color: "light-success",
          title: "1.423k",
          subtitle: "ผู้ป่วยเขียว",
          customClass: "mb-2 mb-sm-0",
        },
      ],

      perPage: 10,
      pageOptions: [5, 10, 20, 50],
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
        {
          key: "0" + 1,
          label: "ลำดับ",
        },
        { key: "wardName", label: "ชื่อแผนก", sortable: true },
        { key: "bedLimit", label: "จำนวนเตียงทั้งหมด", sortable: true },
        { key: "newCase", label: "รับใหม่", sortable: true },
        { key: "disCharge", label: "ออก", sortable: true },
        { key: "Stay", label: "คงเหลือ", sortable: true },
        { key: "State", label: "รองรับเพิ่ม", sortable: true },
        // 'local_code',
        // 'prefix',
        // 'service_point_name',
        //  {key: 'service_point_name', label: 'ชื่อแผนก'},
      ],
    };
  },

  mounted() {
    this.$http
      .get("api/v1/covid/bed")
      .then((res) => {
        // handle success
        console.log(res.data);
        this.items = res.data;
        this.statisticsItems = [
          {
            icon: "TrendingUpIcon",
            color: "light-primary",
            title: items[0].Stay,
            subtitle: items[0].wardName,
            customClass: "mb-2 mb-xl-0",
          },
          {
            icon: "UserIcon",
            color: "light-info",
            title: items[1].Stay,
            subtitle: items[1].wardName,
            customClass: "mb-2 mb-xl-0",
          },
          // {
          //   icon: "BoxIcon",
          //   color: "light-danger",
          //   title: items[2].Stay,
          //   subtitle: items[2].wardName,
          //   customClass: "mb-2 mb-sm-0",
          // },
          // {
          //   icon: "DollarSignIcon",
          //   color: "light-success",
          //   title: items[3].Stay,
          //   subtitle: items[3].wardName,
          //   customClass: "",
          // },
        ];
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });

    this.totalRows = this.items.length;
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
  

  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => ({ text: f.label, value: f.key }));
    },
  },
};
</script>
