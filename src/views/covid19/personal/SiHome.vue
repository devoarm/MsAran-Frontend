<template>
  <div>
    <div class="mb-1">
      <!-- <router-link to="/covid19-visit-add">
        <b-button variant="gradient-primary">บันทึกอาการ + </b-button>
      </router-link> -->
      <b-button variant="gradient-primary" @click="getHiHosxp">+ ดึงข้อมูลจาก Hosxp</b-button>
      <router-link to="/covid19-personal-add" class="ml-1">
        <b-button variant="gradient-danger">ลงทะเบียนเพิ่ม + </b-button>
      </router-link>
    </div>
    <div>           
      <bar-chart/>      
    </div>
    <div>
      <b-card-code title="ทะเบียนรายชื่อบุคคล OP Self Isolation" no-body>
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
                  <span>{{totalNow}}</span>
                </b-badge>
              </template>        
            <tabal-si />
          </b-tab>
          <b-tab>     
            <template #title>
                <span class="mr-1">รักษาหายทั้งหมด</span>
                <b-badge variant="success">
                  <feather-icon icon="CheckIcon" class="mr-25" />
                  <span>{{totalSuccess}}</span>
                </b-badge>
              </template>     
            <tabal-success />
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
import {  
  getUserData,  
} from "@/auth/utils";
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
import BarChart from "./components/si/BarChart";
import TabalToDay from "./components/si/TabalToDay";
import TabalSi from "./components/si/TabalSi";
import TabalSuccess from "./components/si/TabalSuccess";
import NewHiUser from "./components/si/NewHiUser";
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
    BarChart,
    TabalToDay,
    TabalSi,
    TabalSuccess,
    NewHiUser
  },
  data() {
    return {
      getUserData: getUserData(),
      totalRowsNew:0,
      totalNow:0,
      totalSuccess:0,
    };
  },
  mounted() {
    this.getSiNew()
    this.getSi()
    this.getSiSuccess()
  },
  methods: {
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
     getSi() {
      this.$http
        .get(`api/v1/covid/si/${getUserData().organigation}`, {
          headers: {
            Authorization: `Bearer ${useJwt.getToken()}`,
          },
        })
        .then((res) => {          
          this.totalNow = res.data.length;
          console.log(this.items)
        });
    },   
     getSiSuccess() {
      this.$http
        .get(`api/v1/covid/si_success/${getUserData().organigation}`, {
          headers: {
            Authorization: `Bearer ${useJwt.getToken()}`,
          },
        })
        .then((res) => {
          this.totalSuccess = res.data.length;
        });
    },
    getSiNew() {
      this.$http
        .get(`api/v1/covid/si-new/${getUserData().organigation}`, {
          headers: {
            Authorization: `Bearer ${useJwt.getToken()}`,
          },
        })
        .then((res) => {         
          this.totalRowsNew = res.data.length;            
        });
    },
  },
};
</script>
