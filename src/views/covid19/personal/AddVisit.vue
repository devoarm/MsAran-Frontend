<template>
  <div>
    <b-card-code title="Personal HI Add Visit" no-body>
      <div class="pl-3 pr-3 pb-2">
        <!-- User Info: Input Fields -->
        <b-form class="">
          <!-- Header: Personal Info -->
          <div class="mb-2">          
            <b-row class="d-flex justify-content-between">
              <b-col md="6">
                <h4>ชื่อ : {{patient.fullname}}</h4>
              </b-col>
              <b-col cols="6">
                <h4>วันแรกเข้า : {{patient.vstdate}} </h4>
              </b-col>
            </b-row>
          </div>
          <b-row>          
            <b-col cols="12" md="4">
              <b-form-group label="วันที่รับบริการ" label-for="period">
                <flat-pickr
                  class="form-control"
                  :config="{ dateFormat: 'Y-m-d' }"
                  placeholder="YYYY-MM-DD"
                  v-model="form.vstdate"
                />
              </b-form-group>
            </b-col>
            <!-- Field: Username -->
            <b-col cols="12" md="4">
              <b-form-group label="ช่วงเวลา(เช้า-บ่าย)" label-for="period">
                <b-form-select v-model="form.period" :options="ob_period" />
              </b-form-group>
            </b-col>

            <!-- Field: Username ค้นหาผู้ป่วยด้วย cid หรือชื่อ-->
            <b-col cols="12" md="6" lg="4" v-if="$route.params.hiId == 0">
              <b-form-group label="ผู้ป่วย" abel-for="id">
                <v-select
                  v-model="form.id"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  label="fullname"
                  :options="ob_person"          
                  key="id"      
                />
              </b-form-group>
            </b-col>

            <!-- Field: Username -->
            <b-col cols="12" md="4">
              <b-form-group label="อุณหภูมิร่างกาย" label-for="bt">
                <b-form-select v-model="form.bt" :options="ob_bt" />
              </b-form-group>
            </b-col>

            <!-- Field: Full Name -->
            <b-col cols="12" md="4">
              <b-form-group label="ระดับ Oxigen ในเลือด" label-for="O2sat">
                <b-form-input v-model="form.O2sat" type="number" placeholder="Enter Number Only"/>
              </b-form-group>
            </b-col>

            <b-col cols="12" md="4">
              <b-form-group label="อาการ" label-for="medication">
                <b-form-input v-model="form.medication" />
              </b-form-group>
            </b-col>

            <b-col cols="12" md="4">
              <b-form-group label="บันทึกการรักษา" label-for="note">
                <b-form-input v-model="form.note" />
              </b-form-group>
            </b-col>
          </b-row>

          <b-row class="mt-2">
            <b-col>
              <b-button
                variant="primary"
                class="mb-1 mb-sm-0 mr-0 mr-sm-1"
                :block="$store.getters['app/currentBreakPoint'] === 'xs'"
                @click="handleSubmit"
              >
                บันทึก
              </b-button>
              <b-button
                variant="outline-secondary"
                :block="$store.getters['app/currentBreakPoint'] === 'xs'"
                @click.prevent="$router.go(-1)"
              >
                ย้อนกลับ
              </b-button>
            </b-col>
          </b-row>
        </b-form>      
      </div>
    </b-card-code>
    <div>
      <b-card-code no-body>
        <div class="row ml-2 mb-1">
          <div>
            <b-row>
              <h3>📣 ประวัติการติดตาม</h3>
              <b-button          
                variant="warning"      
                size="sm"
                class="ml-1"   
                @click="onExport"   
              >
                <feather-icon
                  icon="StarIcon"
                  class="mr-50"
                />
                <span class="align-middle">ดาว์นโหลดไฟล์ Excel</span>
              </b-button>
            </b-row>
          </div>          
        </div>                
        <b-table responsive :items="items" :fields="fields" class="mb-0">
        </b-table>
      </b-card-code>
    </div>
  </div>
</template>

<script>
import BCardCode from "@core/components/b-card-code/BCardCode.vue";
import {
  BRow,
  BCol,
  BForm,
  BFormGroup,
  BFormInput,
  BFormRadioGroup,
  BFormCheckboxGroup,
  BButton,
  BFormFile,
  BAvatar,
  BFormSelect,
  BTable,
} from "bootstrap-vue";
import flatPickr from "vue-flatpickr-component";
import vSelect from "vue-select";
import {  
  getUserData,  
} from "@/auth/utils";
import useJwt from "@/auth/jwt/useJwt";
import XLSX from 'xlsx' // import xlsx

export default {
  components: {
    BRow,
    BCol,
    BForm,
    BFormFile,
    BAvatar,
    BFormGroup,
    BCardCode,
    flatPickr,
    BFormInput,
    vSelect,
    BFormRadioGroup,
    BFormCheckboxGroup,
    BButton,
    BFormSelect,
    BTable
  },
  data() {
    return {
      user:{},
      form: {
        vstdate: "",
        period: "",
        id: "",
        bt: "",
        O2sat: "",
        medication: "",
        note: "",
        provid: "",
      },
      fields: [
        {
          key: "vstdate",
          label: "วันที่",
        },
        {
          key: "period",
          label: "ช่วงเวลา",
        },
        {
          key: "bt",
          label: "อุณหภูมิ",
        },
        {
          key: "O2sat",
          label: "O2sat",
        },
        {
          key: "medication",
          label: "อาการ",
        },
        {
          key: "medication",
          label: "อาการ",
        },
        {
          key: "note",
          label: "บันทึกการรักษา",
        },
        {
          key: "provid_name",
          label: "ผู้ประเมิน",
        },
      ],
      items: [],
      ob_bt: [
        "35",
        "35.5",
        "36",
        "36.5",
        "37",
        "37.5",
        "38",
        "38.5",
        "39",
        "38.5",
        "40",
        "40.5",
        "41",
        "41.5",
        "42",
        "42.5",
        "43",
        "43.5",
      ],
      ob_person: [],
      ob_period: ["เช้า", "เย็น"],
      ob_provid: [],
      patient:{},
    };
  },
  mounted() {    
    this.getHi()
    this.getVisit()
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      this.file = file;
      this.url = URL.createObjectURL(file);
    },
    handleSubmit() {      
      var data = {
        vstdate: this.form.vstdate,
        period: this.form.period,
        hi_id: this.patient.id,
        bt: this.form.bt,
        O2sat: this.form.O2sat,
        medication: this.form.medication,
        note: this.form.note,
        provid: getUserData().id,
      }
      // console.log(data);
      this.$http
        .post(`api/v1/covid/hi-add-visit`, data)
        .then((res) => {
          if (res.data.status == 200) {
            this.$swal({
              icon: "success",
              title: "บันทึกสำเร็จ",
              showConfirmButton: false,
              timer: 1000,
            }).then(() => {
              this.form = {
                vstdate: "",
                period: "",
                id: "",
                bt: "",
                O2sat: "",
                medication: "",
                note: "",
                provid: "",
              }
              this.getVisit()
            });
          }
          else{
            this.$swal({
              icon: "error",
              title: "ไม่สำเร็จ",
              text: "ผิดพลาด",
              showConfirmButton: true,              
            }).then(() => {              
            });
          }          
        }).catch((err) => {console.log(err)})      
    },
    getHi() {
      this.$http
        .get(`api/v1/covid/hi-by-id/${this.$route.params.hiId}`, {
          headers: {
            Authorization: `Bearer ${useJwt.getToken()}`,
          },
        })
        .then((res) => {
          this.patient = res.data
        });
    },    
    getVisit() {
      this.$http
        .get(`api/v1/covid/visit-by-id/${this.$route.params.hiId}`, {
          headers: {
            Authorization: `Bearer ${useJwt.getToken()}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.items = res.data;
        });
    },
    onExport() {
      const dataWS = XLSX.utils.json_to_sheet(this.items)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, dataWS)
      XLSX.writeFile(wb,'export.xlsx')
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-flatpicker.scss";
@import "@core/scss/vue/libs/vue-select.scss";
</style>
