<template>
  <div>
    <div class="mb-1">
      <!-- <router-link to="/covid19-visit-add/0">
        <b-button variant="gradient-primary">บันทึกอาการ + </b-button>
      </router-link> -->
      <b-button variant="gradient-primary" @click="getHiHosxp">+ ดึงข้อมูลจาก Hosxp</b-button>
      <router-link to="/covid19-personal-add" class="ml-1">
        <b-button variant="gradient-danger">ลงทะเบียนเพิ่ม + </b-button>
      </router-link>
    </div>
    <bar-chart />
    <div>
      <b-card-code title="ทะเบียนรายชื่อบุคคล Home Isolation" no-body>
        <b-tabs>
          <b-tab v-if="getUserData.organigation === '0'">
            <template #title>
              <span class="mr-1">รายใหม่วันนี้</span>
              <b-badge v-if="totalRowsNew>0" variant="danger">
                <feather-icon icon="BellIcon" class="mr-25" />
                <span>{{totalRowsNew}}</span>
              </b-badge>
            </template>
            <TabalToDay />
          </b-tab>
          <b-tab v-else>
            <template #title>
              <span class="mr-1">รายใหม่วันนี้</span>
              <b-badge v-if="totalRowsNew>0" variant="danger">
                <feather-icon icon="BellIcon" class="mr-25" />
                <span>{{totalRowsNew}}</span>
              </b-badge>
            </template>
            <NewHiUser />
          </b-tab>

          <b-tab>
            <template #title>
              <span class="mr-1">กำลังรักษาทั้งหมด</span>
              <b-badge variant="info">
                <feather-icon icon="UsersIcon" class="mr-25" />
                <span>{{totalRowsFull}}</span>
              </b-badge>
            </template>
            <tabal-hi />
            <template #code>
              {{ codeKitchenSink }}
            </template>
          </b-tab>

          <b-tab>
            <template #title>
              <span class="mr-1">รักษาหายทั้งหมด</span>
              <b-badge variant="success">
                <feather-icon icon="CheckIcon" class="mr-25" />
                <span>{{totalRowsSuccess}}</span>
              </b-badge>
            </template>
            <tabal-success />
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
  getUserData,  
} from "@/auth/utils";
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
import BarChart from "./components/hi/BarChart";
import TabalToDay from "./components/hi/TabalToDay";
import TabalHi from "./components/hi/TabalHi";
import TabalSuccess from "./components/hi/TabalSuccess";
import NewHiUser from "./components/hi/NewHiUser";
export default {
  components: {
    BCardCode,
    TabalToDay,
    TabalHi,
    TabalSuccess,
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
    BarChart,
    NewHiUser
  },
  data() {
    return {
      getUserData: getUserData(),
      totalRowsNew:0,      
      totalRowsFull:0,      
      totalRowsSuccess:0,      
      codeKitchenSink,
    };
  },
  mounted() {
    this.getHiNew()
    this.getHi()
    this.getHiSuccess()
  },

  methods: {
    getHiNew() {
      this.$http
        .get(`api/v1/covid/hi_new/${getUserData().organigation}`, {
          headers: {
            Authorization: `Bearer ${useJwt.getToken()}`,
          },
        })
        .then((res) => {          
          this.totalRowsNew = res.data.length;          
        });
    },
    async getHiHosxp(){
      await this.$http.get(`api/v1/covid/push_Hi`, {
          headers: {
            Authorization: `Bearer ${useJwt.getToken()}`,
          },
        }).then((res) => {
          console.log(res.data)
          location.reload();
      })
    },
    getHi() {
      this.$http
        .get(`api/v1/covid/hi/${getUserData().organigation}`, {
          headers: {
            Authorization: `Bearer ${useJwt.getToken()}`,
          },
        })
        .then((res) => {          
          this.totalRowsFull = res.data.length;
        });
    },
    getHiSuccess() {
      this.$http
        .get(`api/v1/covid/hi_success/${getUserData().organigation}`, {
          headers: {
            Authorization: `Bearer ${useJwt.getToken()}`,
          },
        })
        .then((res) => {
          this.totalRowsSuccess = res.data.length;
        });
    },
  },
};
</script>
