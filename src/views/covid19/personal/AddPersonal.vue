<template>
  <b-card-code title="" no-body>
    <div class="pl-3 pr-3 pb-2">
      <!-- User Info: Input Fields -->
      <validation-observer ref="simpleRules">
      <b-form class="">
        <!-- Header: Personal Info -->
        <div class="d-flex">
          <feather-icon icon="UserIcon" size="19" />
          <h4 class="mb-2 ml-50">Personal Information</h4>
        </div>
        <b-row class="d-flex align-items-center">
          <b-avatar v-if="url" class="mb-2" size="100px" :src="url" />
          <b-col cols="12" md="4">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroupFileAddon01"
                  >Upload</span
                >
              </div>
              <div class="custom-file">
                <input
                  type="file"
                  v-on:change="onFileChange"
                  class="custom-file-input"
                />
                <label class="custom-file-label" for="inputGroupFile01"
                  >เลือกรูปภาพ</label
                >
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <!-- Field: Username -->
          <b-col cols="12" md="4">
            <validation-provider
                #default="{ errors }"
                name="เลขบัตรประชาชน"
                rules="required|integer|min:13"
            >
              <b-form-group label="เลขบัตรประชาชน" label-for="cid">                
                <b-form-input v-model="form.cid" :state="errors.length > 0 ? false : null"/>
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>
          <!-- Field: Username -->
          <b-col cols="12" md="4">
            <validation-provider
                #default="{ errors }"
                name="ชื่อ-นามสกุล"
                rules="required"
            >
              <b-form-group label="ชื่อ-นามสกุล" label-for="fullname">
                <b-form-input v-model="form.fullname" :state="errors.length > 0 ? false : null"/>
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>

          <b-col cols="12" md="4">
            <b-form-group label="เพศ" label-for="sex">
              <b-form-select v-model="form.sex" :options="ob_sex" />
            </b-form-group>
          </b-col>

          <b-col cols="12" md="4">
            <b-form-group label="วันเกิด" label-for="brithday">
              <flat-pickr
                class="form-control"
                :config="{ dateFormat: 'Y-m-d' }"
                placeholder="YYYY-MM-DD"
                v-model="form.birthday"
              />
            </b-form-group>
          </b-col>

          <b-col cols="12" md="4">
            <b-form-group label="สิทธิการรักษา" label-for="role">
              <v-select                
                @input="(value)=>{form.pttype_name = value.pttype}"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                label="name"
                :options="ob_pttype_name"
              />
            </b-form-group>
          </b-col>

          <!-- Field: Email -->
          <b-col cols="12" md="4">
            <b-form-group label="เลขหมายโทรศัพท์" label-for="phone">
              <b-form-input
                v-model="form.mobile"
                placeholder="Enter Number Only"
              />
            </b-form-group>
          </b-col>
        </b-row>

        <div class="d-flex mt-2">
          <feather-icon icon="MapPinIcon" size="19" />
          <h4 class="mb-0 ml-50">ที่อยู่รักษา</h4>
        </div>

        <!-- Form: Personal Info Form -->
        <b-row class="mt-1">
          
          <b-col cols="12" md="6" lg="4">
            <b-form-group label="บ้านเลขที่ หมู่">
              <b-form-input v-model="form.addrpart" />
            </b-form-group>
          </b-col>
          <!-- Field: Country -->
          <b-col cols="12" md="6" lg="4">
            <b-form-group label="จังหวัด">
              <v-select                
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"                
                label="changwatname"
                :options="ob_chwpart"
                @input="(value)=>{fetchAMP(value)}"
              />
            </b-form-group>
          </b-col>

          <!-- Field: State -->
          <b-col cols="12" md="6" lg="4">
            <b-form-group label="อำเภอ">
              <v-select                             
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                label="ampurname"
                :disabled="form.chwpart == ''"
                :options="ob_amppart"
                @input="(value)=>{fetchTMB(value)}"                
              />
            </b-form-group>
          </b-col>

          <!-- Field: City -->
          <b-col cols="12" md="6" lg="4">
            <b-form-group label="ตำบล">
              <v-select                
                @input="(value)=>{form.tmbpart = value.tamboncodefull}" 
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                label="tambonname"
                :disabled="form.amppart == ''"
                :options="ob_tmbpart"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <!-- Header: Personal Info -->
        <div class="d-flex mt-2">
          <feather-icon icon="MapPinIcon" size="19" />
          <h4 class="mb-0 ml-50">รายละเอียดร่างกายแรกเข้า</h4>
        </div>

        <!-- Form: Personal Info Form -->
        <b-row class="mt-1">
          <!-- Field: Postcode -->
          <b-col cols="12" md="6" lg="4">
            <b-form-group label="น้ำหนัก(kg)">
              <b-form-input
                type="number"
                v-model="form.weight"
                placeholder="Enter Number Only"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12" md="6" lg="4">
            <b-form-group label="ส่วนสูง(cm)">
              <b-form-input
                type="number"
                v-model="form.height"
                placeholder="Enter Number Only"
              />
            </b-form-group>
          </b-col>

          <!-- Field: City -->
          <b-col cols="12" md="6" lg="4">
            <b-form-group label="ความดัน(ตัวบน/ตัวล่าง)">
              <b-form-input
                type="number"
                v-model="form.bp"
                placeholder="Enter Number Only"
              />
            </b-form-group>
          </b-col>

          <!-- Field: State -->
          <b-col cols="12" md="6" lg="4">
            <b-form-group label="อัตราการหายใจ(ครั้งต่อนาที)">
              <b-form-input
                type="number"
                v-model="form.pr"
                placeholder="Enter Number Only"
              />
            </b-form-group>
          </b-col>

          <!-- Field: Country -->
          <b-col cols="12" md="6" lg="4">
            <validation-provider
                #default="{ errors }"
                name="หน่วยการบริการที่ดูแล"
                rules="required"
            >
              <b-form-group label="วันที่รับบริการ">
                <flat-pickr
                  class="form-control"
                  :state="errors.length > 0 ? false : null"
                  :config="{ dateFormat: 'Y-m-d' }"
                  placeholder="YYYY-MM-DD"
                  v-model="form.vstdate"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>
          <!-- Field: Country -->
          <b-col cols="12" md="6" lg="4">
            <b-form-group label="วันที่จำหน่าย">
              <flat-pickr
                class="form-control"
                :config="{ dateFormat: 'Y-m-d' }"
                placeholder="YYYY-MM-DD"
                v-model="form.dcdate"
              />
            </b-form-group>
          </b-col>
          <!-- Field: Postcode -->
          <b-col cols="12" md="6" lg="4" v-if="userOrgan == '0'">           
              <b-form-group label="หน่วยการบริการที่ดูแล">
                <v-select                  
                  @input="(value)=>{form.hospcode = value.hoscode}"                  
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  label="hosname"                                    
                  key="hoscode"
                  :options="ob_hospital"                  
                />
                <small class="text-danger" v-if="form.hospcode==''">กรุณาระบุหน่วยบริการ</small>
              </b-form-group>            
          </b-col>
          <b-col cols="12" md="6" lg="4">
            <b-form-group label="เลข Authen">
              <b-form-input v-model="form.authen_number" />
            </b-form-group>
          </b-col>

          <!-- Field: City -->
          <b-col cols="12" md="6" lg="4">
            <b-form-group label="LineID">
              <b-form-input v-model="form.line_id" />
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
              Save Changes
            </b-button>
            <b-button
              variant="outline-secondary"
              :block="$store.getters['app/currentBreakPoint'] === 'xs'"
            >
              Reset
            </b-button>
          </b-col>
        </b-row>
      </b-form>
      </validation-observer>
    </div>
  </b-card-code>
</template>

<script>
import BCardCode from "@core/components/b-card-code/BCardCode.vue";
import { required, email } from "@validations";
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
import { ref } from "@vue/composition-api";
import vSelect from "vue-select";
import { ValidationProvider, ValidationObserver } from "vee-validate";
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
    ValidationProvider, ValidationObserver
  },
  data() {
    return {
      userOrgan: getUserData().organigation,
      file: "",
      url: null,
      form: {
        cid: "",
        fullname: "",
        sex: "ชาย",
        image: "",
        birthday: "",
        pttype_name: "",
        mobile: "",
        addrpart: "",
        tmbpart: "",
        amppart: "",
        chwpart: "",
        weight: null,
        height: null,
        bp: "",
        pr: "",
        vstdate: null,
        dcdate: null,
        hospcode: "",
        authen_number: "",
        line_id: "",
      },
      ob_sex: ["ชาย", "หญิง"],
      ob_tmbpart: [],
      ob_amppart: [],
      ob_chwpart: [],
      ob_pttype_name: [],
      ob_hospital: [],
    };
  },
  mounted() {
    this.$http.get("api/v1/forms/ptt-type").then((res) => {      
      this.ob_pttype_name = res.data.result      
    });
    this.$http.get("api/v1/forms/subdistrict").then((res) => {      
      this.ob_tmbpart = res.data.result
    });
    this.$http.get("api/v1/forms/district").then((res) => {      
        this.ob_amppart = res.data.result      
    });
    this.$http.get("api/v1/forms/province").then((res) => {      
      this.ob_chwpart = res.data.result      
    });
    this.$http
      .get(`api/v1/forms/c_hospital/27`)
      .then((res) => {
        this.ob_hospital = res.data.result
        console.log(this.ob_hospital)
    });
  },
  methods: {    
    onFileChange(e) {
      const file = e.target.files[0];
      this.file = file;
      this.url = URL.createObjectURL(file);
    },
    handleSubmit() {
      this.$refs.simpleRules.validate().then((success) => {        
        if (success) {
          let formData = new FormData();
          if(this.userOrgan != '0'){
            this.form.hospcode = this.userOrgan
          }      
          console.log(this.form)
          formData.append("file", this.file);
          formData.append("data", JSON.stringify(this.form));
          this.$http
            .post(`api/v1/covid/hi-add-patient-avatar`, formData)
            .then((res) => {
              console.log(res.data)
              if (res.data.msg == "Ok") {
                this.$swal({
                  icon: "success",
                  title: "สำเร็จ",
                  showConfirmButton: false,
                  timer: 1000,
                }).then(() => {
                  this.$router.push("/covid19-personal-account");
                });
              } else {
                this.$swal({
                  icon: "error",
                  title: "เพิ่มข้อมูลไม่สำเร็จ",
                  showConfirmButton: false,
                  timer: 1000,
                });
              }
            })
            .catch((err) => console.log(err));
        }
      })
      
    },

    async fetchAMP(value) {      
      this.form.chwpart = value.changwatcode
      await this.$http
        .get(`api/v1/forms/district-by-province/${this.form.chwpart}`)
        .then((res) => {
          this.ob_amppart = res.data.result;          
        });
      await this.$http
        .get(`api/v1/forms/c_hospital/${this.form.chwpart}`)
        .then((res) => {
          this.hospcode = res.data.result
        });
    },
    fetchTMB(value) {
      console.log(value);
      this.form.amppart = value.ampurcodefull
      this.$http
        .get(`api/v1/forms/subdistrict-by-district/${this.form.amppart}`)
        .then((res) => {
          this.ob_tmbpart = res.data.result;          
        });
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-flatpicker.scss";
@import "@core/scss/vue/libs/vue-select.scss";
</style>
