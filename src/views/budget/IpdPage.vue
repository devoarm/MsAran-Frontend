<template>
  <div>
    <div class="demo-inline-spacing">
      <b-dropdown
        id="dropdown-1"
        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
        text="ปีงบประมาณ"
        variant="primary"
      >
        <b-dropdown-item>2565</b-dropdown-item>
        <b-dropdown-item>2564</b-dropdown-item>
      </b-dropdown>

      <b-dropdown
        id="dropdown-1"
        v-ripple.400="'rgba(113, 102, 240, 0.15)'"
        text="สิทธิการรักษา"
        variant="outline-primary"
      >
        <b-dropdown-item>UC</b-dropdown-item>
        <b-dropdown-item>เบิกจ่ายตรง</b-dropdown-item>
        <b-dropdown-item>อปท.</b-dropdown-item>
        <b-dropdown-item>ประกันสังคม</b-dropdown-item>
      </b-dropdown>
    </div>

    <div class="demo-inline-spacing">
      <b-form-select v-model="selected" :options="options" />
      <b-card-text class="mt-1 mb-0">
        Selected: <strong>{{ selected }}</strong>
      </b-card-text>
    </div>

    <div class="demo-inline-spacing">
      <h3>จำนวนเงินโอน</h3>
      <b-table responsive :items="items2" :fields="fields2" class="mb-0">
        <template #cell(Phone)="data">
          <span class="text-nowrap">
            {{ data.value }}
          </span>
        </template>

        <!-- Optional default data cell scoped slot -->
        <template #cell()="data">
          {{ data.value }}
        </template>
      </b-table>
    </div>
    <div class="demo-inline-spacing">
      <h3>รายละเอียดบุคคล</h3>
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
  </div>
</template>

<script>
import {
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
  BDropdown,
  BDropdownItem,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";

export default {
  components: {
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
    BDropdown,
    BDropdownItem,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
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
        "an",
        { key: "fullname", label: "ชื่อ-นามสกุล", sortable: true },
        { key: "regdate", label: "วันที่รับบริการ", sortable: true },
        // { key: "sentdate", label: "วันที่ส่ง", sortable: true },
        { key: "income", label: "ค่าใช้จ่าย", sortable: true },
        { key: "compensate", label: "เงินโอน", sortable: true },
        { key: "status", label: "สถานะ", sortable: true },
        { key: "PROJCODE", label: "project", sortable: true },
        { key: "rep", label: "rep" },
      ],
      items: [],
      items2: [],
      fields2: [
        { key: "mon", label: "เดือน", sortable: true },
        { key: "t_AdjRW", label: "AdjRW", sortable: true },
        { key: "compensate", label: "จำนวนเงินโอน", sortable: true },
      ],

      status: [
        {
          1: "สำเร็จ",
          2: "รอ Statment",
          3: "ยังไม่ส่งเบิก",
          4: "โอนเงินแล้ว",
          5: "อื่นๆ",
        },
        {
          1: "light-success",
          2: "light-warning",
          3: "light-danger",
          4: "light-primary",
          5: "light-info",
        },
      ],
      selected: null,
      options: [
        { value: null, text: "กรุณาเลือกระบุสิทธิ" },
        { value: "UC", text: "หลักประกันสุขภาพ UC" },
        { value: "OFC", text: "เบิกจ่ายตรง" },
        { value: "อปท", text: "อปท." },
        { value: "SSS", text: "ประกันสังคม" },
        { value: "63", text: "This one is disabled", disabled: true },
      ],

    };
  },

  mounted() {
    this.$http
      .get("api/v1/budgets/ipd")
      .then((res) => {
        // handle success
        console.log(res.data);
        this.items = res.data;
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });

    this.$http
      .get("api/v1/budgets/sum_statment")
      .then((res) => {
        // handle success
        this.items2 = res.data;
        console.log(this.items2);
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
