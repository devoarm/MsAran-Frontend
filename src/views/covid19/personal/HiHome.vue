<template>
  <div>
    
    
      <router-link to="/covid19-visit-add">
        <b-button variant="gradient-primary">บันทึกอาการ + </b-button>
      </router-link>
      <router-link to="/covid19-personal-add">
        <b-button variant="gradient-danger">ลงทะเบียนเพิ่ม + </b-button>
      </router-link>
    

    <div>
      <b-card-code title="สถานะการณ์ HI 📣" no-body>
        <canvas id="myChart" width="100" height="30"></canvas>
      </b-card-code>
    </div>
    <div>
      <b-card-code title="ทะเบียนรายชื่อบุคคล" 
              no-body>
        <b-tabs>

          <b-tab title="รายใหม่วันนี้">
            <feather-icon
                icon="BellIcon"
                size="21"
                class="text-danger"
                badge="4"
                badge-classes="badge-danger badge-glow"
              />
            <b-card-body>
              <div
                class="
                  d-flex
                  justify-content-between
                  flex-wrap
                  align-items-center
                "
              >
                <div class>
                  <b-form-group
                    label="ค้นหา"
                    label-cols-sm="2"
                    label-align-sm="left"
                    label-size="sm"
                    label-for="filterInput"
                    class="mb-0"
                  >
                    <b-input-group size="sm">
                      <b-form-input
                        id="filterInput"
                        v-model="filter"
                        type="search"
                        placeholder="กรุณาระบุ....."
                      />
                      <b-input-group-append>
                        <b-button :disabled="!filter" @click="filter = ''">
                          ล้าง
                        </b-button>
                      </b-input-group-append>
                    </b-input-group>
                  </b-form-group>
                </div>
              </div>
            </b-card-body>

            <b-table
              striped
              hover
              responsive
              class="position-relative"
              :per-page="perPage"
              :current-page="currentPage"
              :items="itemes"
              :field="field"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
              :sort-direction="sortDirection"
              :filter="filter"
              :filter-included-field="filterOn"
              @filtered="onFiltered"
              @row-clicked="myRowClickHandler"
            >
              <template #cell(image)="data">
                <b-avatar
                  class="mr-1"
                  :src="$store.state.service.urlImage + data.value"
                />
              </template>
              <!-- Column: Actions -->
              <template #cell(actions)="">
                <b-dropdown
                  variant="link"
                  no-caret
                  :right="$store.state.appConfig.isRTL"
                >
                  <template #button-content>
                    <feather-icon
                      icon="MoreVerticalIcon"
                      size="16"
                      class="align-middle text-body"
                    />
                  </template>
                  <b-dropdown-item>
                    <feather-icon icon="EditIcon" />
                    <span class="align-middle ml-50">แก้ไข</span>
                  </b-dropdown-item>

                  <b-dropdown-item>
                    <feather-icon icon="TrashIcon" />
                    <span class="align-middle ml-50">ลบ</span>
                  </b-dropdown-item>
                </b-dropdown>
              </template>
            </b-table>

            <b-card-body class="d-flex justify-content-between flex-wrap pt-0">
              <!-- page length -->
              <b-form-group
                label="Per Page"
                label-cols="6"
                label-align="left"
                label-size="sm"
                label-for="sortBySelect"
                class="text-nowrap mb-md-0 mr-1"
              >
                <b-form-select
                  id="perPageSelect"
                  v-model="perPage"
                  size="sm"
                  inline
                  :options="pageOptions"
                />
              </b-form-group>

              <!-- pagination -->
              <div>
                <b-pagination
                  v-model="currentPage"
                  :total-rows="totalRows"
                  :per-page="perPage"
                  first-number
                  last-number
                  prev-class="prev-item"
                  next-class="next-item"
                  class="mb-0"
                >
                  <template #prev-text>
                    <feather-icon icon="ChevronLeftIcon" size="18" />
                  </template>
                  <template #next-text>
                    <feather-icon icon="ChevronRightIcon" size="18" />
                  </template>
                </b-pagination>
              </div>
            </b-card-body>

            <template #code>
              {{ codeKitchenSink }}
            </template>
          </b-tab>

           <b-tab title="ผู้ป่วยทั้งหมด" >          
            <b-card-body>
              <div
                class="
                  d-flex
                  justify-content-between
                  flex-wrap
                  align-items-center
                "
              >
                <div class>
                  <b-form-group
                    label="ค้นหา"
                    label-cols-sm="2"
                    label-align-sm="left"
                    label-size="sm"
                    label-for="filterInput"
                    class="mb-0"
                  >
                    <b-input-group size="sm">
                      <b-form-input
                        id="filterInput"
                        v-model="filter"
                        type="search"
                        placeholder="กรุณาระบุ....."
                      />
                      <b-input-group-append>
                        <b-button :disabled="!filter" @click="filter = ''">
                          ล้าง
                        </b-button>
                      </b-input-group-append>
                    </b-input-group>
                  </b-form-group>
                </div>
              </div>
            </b-card-body>

            <b-table
              striped
              hover
              responsive
              class="position-relative"
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
              @row-clicked="myRowClickHandler"
            >
              <template #cell(image)="data">
                <b-avatar
                  class="mr-1"
                  :src="$store.state.service.urlImage + data.value"
                />
              </template>
              <!-- Column: Actions -->
              <template #cell(actions)="">
                <b-dropdown
                  variant="link"
                  no-caret
                  :right="$store.state.appConfig.isRTL"
                >
                  <template #button-content>
                    <feather-icon
                      icon="MoreVerticalIcon"
                      size="16"
                      class="align-middle text-body"
                    />
                  </template>
                  <b-dropdown-item>
                    <feather-icon icon="EditIcon" />
                    <span class="align-middle ml-50">แก้ไข</span>
                  </b-dropdown-item>

                  <b-dropdown-item>
                    <feather-icon icon="TrashIcon" />
                    <span class="align-middle ml-50">ลบ</span>
                  </b-dropdown-item>
                </b-dropdown>
              </template>
            </b-table>

            <b-card-body class="d-flex justify-content-between flex-wrap pt-0">
              <!-- page length -->
              <b-form-group
                label="Per Page"
                label-cols="6"
                label-align="left"
                label-size="sm"
                label-for="sortBySelect"
                class="text-nowrap mb-md-0 mr-1"
              >
                <b-form-select
                  id="perPageSelect"
                  v-model="perPage"
                  size="sm"
                  inline
                  :options="pageOptions"
                />
              </b-form-group>

              <!-- pagination -->
              <div>
                <b-pagination
                  v-model="currentPage"
                  :total-rows="totalRows"
                  :per-page="perPage"
                  first-number
                  last-number
                  prev-class="prev-item"
                  next-class="next-item"
                  class="mb-0"
                >
                  <template #prev-text>
                    <feather-icon icon="ChevronLeftIcon" size="18" />
                  </template>
                  <template #next-text>
                    <feather-icon icon="ChevronRightIcon" size="18" />
                  </template>
                </b-pagination>
              </div>
            </b-card-body>

            <template #code>
              {{ codeKitchenSink }}
            </template>

          </b-tab>
        </b-tabs>
      </b-card-code>
    </div>
  </div>
</template>

<script>
import BCardCode from "@core/components/b-card-code/BCardCode.vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { Bar } from "vue-chartjs";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import Chart from "chart.js";
import {
  BTable,
  BAvatar,
  BBadge,
  BFormGroup,
  BFormSelect,
  BPagination,
  BInputGroup,
  BFormInput,
  BInputGroupAppend,
  BButton,
  BCardBody,
  BModal,
  VBModal,
  BForm,
  BDropdown,
  BDropdownItem,
  BTabs,
  BTab,
} from "bootstrap-vue";
import { codeKitchenSink } from "./code";
import useJwt from "@/auth/jwt/useJwt";
import { required, email } from "@validations";

export default {
  components: {
    BCardCode,
    BTable,
    BAvatar,
    BBadge,
    BForm,
    BFormGroup,
    BFormSelect,
    BPagination,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BButton,
    BCardBody,
    BModal,
    VBModal,
    vSelect,
    BDropdown,
    BDropdownItem,
    ValidationProvider,
    ValidationObserver,
    BTabs,
    BTab,
  },
  extends: Bar,
  data() {
    return {
      messages: [],
      message: "",
      labels: [],
      data_set: [],
      barChart: "",

      userFrom: {
        username: "",
        password: "",
        email: "",
        firstname: "",
        lastname: "",
        phone: "",
      },
      selected: "User",
      option: ["User", "Admin"],
      perPage: 10,
      pageOptions: [5, 10, 20, 50, 100],
      totalRows: 1,
      currentPage: 1,
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      users: [],
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
      fields: [
        // { key: "actions" },
        {
          key: "image",
          label: "รูป",
        },
        {
          // key: "cid",
          // label: "cid",
        },
        { key: "fullname", label: "ชื่อ-นามสกุล", sortable: true },
        { key: "id_card", label: "เลขบัตรประชาชน", sortable: true },
        // { key: "sex", label: "เพศ", sortable: true },
        // { key: "birthday", label: "วันเกิด" },
        //{ key: "pttype_name", label: "สิทธ์การรักษา" },
        { key: "pttype_authen", label: "สิทธิ", sortable: true },
        { key: "mobile", label: "เบอร์โทรศัพท์" },
        // { key: "addrpart", label: "ที่อยู่" },
        // { key: "tmbpart", label: "ตำบล" },
        // { key: "amppart", label: "อำเภอ" },
        // { key: "chwpart", label: "จังหวัด" },
        // { key: "weight", label: "น้ำหนัก" },
        // { key: "height", label: "ส่วนสูง" },
        // { key: "bp", label: "ความดัน" },
        // { key: "pr", label: "อัตราการหายใจ" },
        { key: "vstdate", label: "วันที่เริ่มรับบริการ", sortable: true },
        { key: "dcdate", label: "วันที่สิ้นสุดบริการ", sortable: true },
        { key: "hospcode", label: "หน่วยบริการ", sortable: true },
        { key: "claim_code", label: "Authen" },
        // { key: "line_id", label: "ไอดีไลน์" },
      ],
      /* eslint-disable global-require */
      items: [],
      itemes: [],
      field: [
        // { key: "actions" },
        {
          key: "image",
          label: "รูป",
        },
        { key: "fullname", label: "ชื่อ-นามสกุล", sortable: true },
        { key: "id_card", label: "เลขบัตรประชาชน", sortable: true },
        // { key: "sex", label: "เพศ", sortable: true },
        // { key: "birthday", label: "วันเกิด" },
        //{ key: "pttype_name", label: "สิทธ์การรักษา" },
        { key: "pttype_authen", label: "สิทธิ", sortable: true },
        { key: "mobile", label: "เบอร์โทรศัพท์" },
        { key: "vstdate", label: "วันที่เริ่มรับบริการ", sortable: true },
        { key: "hospcode", label: "หน่วยบริการ", sortable: true },
        // { key: "line_id", label: "ไอดีไลน์" },
      ],
      codeKitchenSink,
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
  created() {},

  mounted: function () {
    this.getHi();
    this.totalRows = this.items.length;

    var ctx = document.getElementById("myChart");
    this.barChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: this.labels,
        datasets: [
          {
            label: "จำนวน", //Vergangenheit = Past
            data: this.data_set,
            backgroundColor: "#28dac6",
            borderColor: "transparent",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        responsiveAnimationDuration: 0,
        maintainAspectRatio: true,
        aspectRatio: 2,
        oneResie: null,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  },

  created: function () {
    this.getMessages(console.log(this.labels)); // get all messages automatically when the page is loaded
  },

  methods: {
    getMessages: function () {
      this.$http.get("api/v1/covid/chart_hi").then((res) => {
        // let labels =[];
        // let data_set =[];
        console.log(res.data);
        for (let [labels, value] of Object.entries(res.data)) {
          this.labels.push(labels.hosname);
          this.data_set.push(value.total);
        }
        this.$nextTick(function () {
          this.barChart.update();
        });
      });
    },

    myRowClickHandler(record, index) {
      this.$router.push(`/covid19-hi-detail/${record.id}`);
    },

    getHi() {
      this.$http
        .get("api/v1/covid/hi", {
          headers: {
            Authorization: `Bearer ${useJwt.getToken()}`,
          },
        })
        .then((res) => {
          this.items = res.data;
          this.totalRows = res.data.length;
        });
    },

    getHiNew() {
      this.$http
        .get("api/v1/covid/hi_new", {
          headers: {
            Authorization: `Bearer ${useJwt.getToken()}`,
          },
        })
        .then((res) => {
          this.itemes = res.data;
          this.totalRows = res.data.length;
          console.log(this.itemes)
        });
    },

    pushHi(){
      this.$http
        .get("api/v1/covid/push_Hi", {
          headers: {
            Authorization: `Bearer ${useJwt.getToken()}`,
          },
        })
        .then((res) => {
          this.itemes = res.data;
          this.totalRows = res.data.length;
          console.log(this.itemes)
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
