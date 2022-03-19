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
    <bar-chart />
    <div>
      <b-card-code title="ทะเบียนรายชื่อบุคคล Home Isolation" no-body>
        <b-tabs>
          <b-tab>
            <template #title>
              <span class="mr-1">รายใหม่วันนี้</span>
              <b-badge v-if="totalRows>0" variant="danger">
                <feather-icon icon="BellIcon" class="mr-25" />
                <span>{{totalRows}}</span>
              </b-badge>
            </template>
            <TabalToDay />
          </b-tab>

          <b-tab title="ผู้ป่วยทั้งหมด">
            <tabal-hi />
            <template #code>
              {{ codeKitchenSink }}
            </template>
          </b-tab>

          <b-tab title="รักษาหายทั้งหมด">
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
import BarChart from "./components/BarChart";
import TabalToDay from "./components/TabalToDay";
import TabalHi from "./components/TabalHi";
import TabalSuccess from "./components/TabalSuccess";
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
  },
  data() {
    return {
      totalRows:0,      
      codeKitchenSink,
    };
  },
  mounted() {
    this.getHiNew()
  },

  methods: {
    getHiNew() {
      this.$http
        .get("api/v1/covid/hi_new", {
          headers: {
            Authorization: `Bearer ${useJwt.getToken()}`,
          },
        })
        .then((res) => {          
          this.totalRows = res.data.length;          
        });
    },
  },
};
</script>
