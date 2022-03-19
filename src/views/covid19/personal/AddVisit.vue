<template>
  <b-card-code title="" no-body>
    <div class="pl-3 pr-3 pb-2">
      <!-- User Info: Input Fields -->
      <b-form class="">
        <!-- Header: Personal Info -->
        <div class="d-flex">
          <feather-icon icon="UserIcon" size="19" />
          <h4 class="mb-2 ml-50">Personal HI Add Visit : ชื่อ...</h4>
        </div>

        <b-row>
          <!-- Field: Country -->
          <b-col cols="12" md="6" lg="4">
            <b-form-group label="วันที่รับบริการ">
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
          <b-col cols="12" md="6" lg="4">
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
            >
              ล้าง
            </b-button>
          </b-col>
        </b-row>
      </b-form>
    </div>
  </b-card-code>
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
} from "bootstrap-vue";
import flatPickr from "vue-flatpickr-component";
import vSelect from "vue-select";
import {  
  getUserData,  
} from "@/auth/utils";

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
    };
  },
  mounted() {
    this.$http.get(`api/v1/forms/person-by-hoscode/${getUserData().organigation}/${getUserData().role}`).then((res) => {
      this.ob_person = res.data.result
      console.log(this.ob_person);
    });
    this.$http.get("api/v1/forms/provid").then((res) => {
      res.data.result.forEach((element) => {
        this.ob_provid.push({
          title: element.firstname,
          value: element.id,
        });
      });
    });    
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
        id: this.form.id.id,
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
              this.$router.push("/covid19-personal-account");
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
        .get("api/v1/covid/visit-by-id/".uId, {
          headers: {
            Authorization: `Bearer ${useJwt.getToken()}`,
          },
        })
        .then((res) => {
          this.items = res.data;
          this.totalRows = res.data.length;
        });
    },

    fetchTMB() {
      this.$http
        .get(`api/v1/forms/provid/${this.form.provid.value}`)
        .then((res) => {
          this.ob_provid = [];
          res.data.result.forEach((element) => {
            this.ob_provid.push({
              title: element.firstname,
              value: element.id,
            });
          });
        });
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-flatpicker.scss";
@import "@core/scss/vue/libs/vue-select.scss";
</style>
