<template>
  <div>
    <div class="mb-1">
      <router-link to="/covid19-visit-add">
        <b-button variant="gradient-primary">บันทึกอาการ + </b-button>
      </router-link>
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
          <b-tab v-if="getUserData.organigation==='0'">    
            <template #title>
                <span class="mr-1">รายใหม่วันนี้</span>
                <b-badge variant="danger">
                  <feather-icon icon="BellIcon" class="mr-25" />
                  <span>{{totalNew}}</span>
                </b-badge>
              </template>      
            <tabal-toDay />
          </b-tab>
          <b-tab v-else>    
            <template #title>
                <span class="mr-1">รายใหม่วันนี้</span>
                <!-- <b-badge variant="danger">
                  <feather-icon icon="BellIcon" class="mr-25" />
                  <span>{{totalNew}}</span>
                </b-badge> -->                
              </template>     
              <NewHiUser /> 
            <tabal-toDay />
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
    <template>
      <ThailandAutoComplete v-model="district" type="district" @select="select" label="ตำบล" size="small" placeholder="ตำบล..."/>
      <ThailandAutoComplete v-model="amphoe" type="amphoe" @select="select" label="อำเภอ" color="#42b883" placeholder="อำเภอ..."/>
      <ThailandAutoComplete v-model="province" type="province" @select="select" label="จังหวัด" size="medium" color="#35495e" placeholder="จังหวัด..."/>
      <ThailandAutoComplete v-model="zipcode" type="zipcode" @select="select" label="รหัสไปรษณีย์" size="large" color="#00a4e4" placeholder="รหัสไปรษณีย์..."/>
    </template>
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
import NewHiUser from "./components/hi/NewHiUser";
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
       district: '',
          amphoe: '',
          province: '',
          zipcode: '',
      getUserData: getUserData(),
      totalNew:0,
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
     select (address) {
          this.district = address.district
          this.amphoe = address.amphoe
          this.province = address.province
          this.zipcode = address.zipcode
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
          this.totalNew = res.data.length;          
        });
    },
  },
};
</script>
