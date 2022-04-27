<template>
  <b-card-code title="" no-body>
    <div class="pl-3 pr-3 pb-2">
      <!-- User Info: Input Fields -->
      <validation-observer ref="simpleRules">
      <b-form class="">
        <!-- Header: Personal Info -->
        <div class="d-flex">
          <feather-icon icon="UserIcon" size="19" />
          <h4 class="mb-2 ml-50">แก้ไขข้อมูล HI</h4>
        </div>
        <b-row class="d-flex align-items-center">
          <b-avatar
            v-if="!file"
            class="mb-2"
            size="100px"
            :src="$store.state.service.urlImage + url"
          />
          <b-avatar v-else class="mb-2" size="100px" :src="url" />
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
            <b-form-group label="เลขบัตรประชาชน" label-for="cid">
              <validation-provider
                #default="{ errors }"
                name="เลขบัตรประชาชน"
                rules="required|digits:13"
              >
                <b-form-input v-model="form.cid" name="cid" :state="errors.length > 0 ? false:null"/>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <!-- Field: Username -->
          <b-col cols="12" md="4">
            <b-form-group label="ชื่อ-นามสกุล" label-for="fullname">
              <validation-provider
                #default="{ errors }"
                name="ชื่อ-นามสกุล"
                rules="required"
              >
                <b-form-input v-model="form.fullname" :state="errors.length > 0 ? false:null"/>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="4">
            <b-form-group label="เพศ" label-for="sex">
               <v-select                
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"                
                :options="ob_sex"
                label="name"
                @input="(value)=>{form.sex = value.sexcode}"
                />
            </b-form-group>
          </b-col>         
          <b-col cols="12" md="4">
            <b-form-group label="อายุ" label-for="age">
              <b-form-input v-model="form.age" name="age" type="number"/>
            </b-form-group>
          </b-col>         

          <b-col cols="12" md="4">
            <b-form-group label="สิทธิการรักษา" label-for="role">
              <v-select
                v-model="form.pttype_name"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                label="name"
                :options="ob_pttype_name"
                @input="(value)=>{form.pttype_name = value.name}"
              />
            </b-form-group>
          </b-col>

          <!-- Field: Email -->
          <b-col cols="12" md="4">
            <b-form-group label="เลขหมายโทรศัพท์" label-for="phone">
              <b-form-input v-model="form.mobile" />
            </b-form-group>
          </b-col>
        </b-row>

        <div class="d-flex mt-2">
          <feather-icon icon="MapPinIcon" size="19" />
          <h4 class="mb-0 ml-50">ที่อยู่รักษา</h4>
        </div>

        <!-- Form: Personal Info Form -->
        <b-row class="mt-1">
          <!-- Field: Postcode -->
          <!-- <b-col cols="12" md="6" lg="4">
            <b-form-group label="รหัสไปรษณีย์">
              <b-form-input type="number" v-model="form.postcode" />
            </b-form-group>
          </b-col> -->
          <b-col cols="12" md="6" lg="4">
            <b-form-group label="บ้านเลขที่ หมู่">
              <b-form-input v-model="form.addrpart" />
            </b-form-group>
          </b-col>
          <!-- Field: Country -->
          <template>
            <b-col cols="12" md="6" lg="4">              
              <ThailandAutoComplete v-model="form.tmbpart" type="district" @select="select" label="ตำบล" placeholder="ตำบล..."/>              
            </b-col>            
            <b-col cols="12" md="6" lg="4">              
              <ThailandAutoComplete v-model="form.amppart" type="amphoe" @select="select" label="อำเภอ"  placeholder="อำเภอ..."/>
            </b-col>            
            <b-col cols="12" md="6" lg="4">              
              <ThailandAutoComplete v-model="form.chwpart" type="province" @select="select" label="จังหวัด" placeholder="จังหวัด..."/>                  
            </b-col>                                  
          </template>
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
            <b-form-group label="ประเภทการรักยา">
              <validation-provider
                #default="{ errors }"
                name="ประเภทการรักยา"
                rules="required"
              >
                <v-select
                  :clearable="false"
                  v-model="form.department"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"                    
                  :options="obDepartment"
                  :state="errors.length > 0 ? false:null"
                  :class="{
                    'border rounded-lg border-danger': !!errors.length,
                  }"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="6" lg="4">
            <b-form-group label="ประเภทการตรวจ">
              <v-select
                :clearable="false"
                v-model="form.swabtype"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"                    
                :options="obSwabType"
              />
            </b-form-group>
          </b-col>
          <!-- Field: Country -->
          <b-col cols="12" md="6" lg="4">
            <b-form-group label="วันที่ตรวจพบเชื้อ">
              <flat-pickr
                class="form-control"
                :config="{ dateFormat: 'Y-m-d' }"
                placeholder="YYYY-MM-DD"
                v-model="form.swabdate"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12" md="6" lg="4">
            <b-form-group label="น้ำหนัก(kg)">
              <b-form-input type="number" v-model="form.weight" />
            </b-form-group>
          </b-col>
          <b-col cols="12" md="6" lg="4">
            <b-form-group label="ส่วนสูง(cm)">
              <b-form-input type="number" v-model="form.height" />
            </b-form-group>
          </b-col>

          <!-- Field: City -->
          <b-col cols="12" md="6" lg="4">
            <b-form-group label="ความดัน(ตัวบน/ตัวล่าง)">
              <b-form-input type="number" v-model="form.bp" />
            </b-form-group>
          </b-col>

          <!-- Field: State -->
          <b-col cols="12" md="6" lg="4">
            <b-form-group label="อัตราการหายใจ(ครั้งต่อนาที)">
              <b-form-input type="number" v-model="form.pr" />
            </b-form-group>
          </b-col>

          <!-- Field: Country -->
          <b-col cols="12" md="6" lg="4">
            <b-form-group label="วันที่รับบริการ">
              <flat-pickr
                class="form-control"
                :config="{ dateFormat: 'Y-m-d' }"                
                v-model="form.vstdate"
              />
            </b-form-group>
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
          <b-col cols="12" md="6" lg="4">
            <b-form-group label="หน่วยการบริการที่ดูแล">
              <v-select
                v-model="form.hospcode"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"                
                :options="ob_hospital"
                label="hosname"
                @input="(value)=>{form.hospcode = value.hosname}"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12" md="6" lg="4">
            <b-form-group label="เลข Authen">
              <b-form-input v-model="form.authen_number" />
            </b-form-group>
          </b-col>          
          <b-col cols="12" md="6" lg="4">
            <b-form-group label="LineID">
              <b-form-input v-model="form.line_id" />
            </b-form-group>
          </b-col>
          <b-col cols="12" md="6" lg="4">
            <b-form-group label="ต้องการ favi หรือไม่ ?">
              <b-form-checkbox v-model="form.need_favi" />
            </b-form-group>
          </b-col>
          <b-col cols="12" md="6" lg="4">
            <b-form-group label="Stapdown ?">
              <b-form-checkbox v-model="form.stapdown" />
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
              อัพเดทข้อมูล
            </b-button>
            <b-button
              variant="outline-secondary"
              @click="()=>{$router.push(`/covid19-hi-detail/${uId}`)}"
              :block="$store.getters['app/currentBreakPoint'] === 'xs'"
            >
              ยกเลิก
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
import {Thai} from 'flatpickr/dist/l10n/th.js';
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
  BFormCheckbox,
  BFormDatepicker
} from "bootstrap-vue";
import flatPickr from "vue-flatpickr-component";
import { ref } from "@vue/composition-api";
import vSelect from "vue-select";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import bulma_calendar from "bulma-calendar/dist/components/vue/bulma_calendar.vue";

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
    ValidationProvider, ValidationObserver, BFormCheckbox, BFormDatepicker,bulma_calendar

  },
  data() {
    return {     
      userOrgan: getUserData().organigation,
      obSwabType:["ATK","RT-PCR"],
      obDepartment:["HI_CI","SI"],
      file: null,
      url: null,
      form: {
        cid: "",
        fullname: "",        
        sex: "",
        image: "",
        birthday: null,
        pttype_name: "",
        mobile: "",
        addrpart: "",
        pttype:"",
        tmbpart: "",
        amppart: "",
        chwpart: "",
        age:null,
        weight: null,
        height: null,
        bp: null,
        pr: null,
        cur_dep: "",
        vstdate: null,
        dcdate: null,
        department:"",
        hospcode: "",
        swabtype:"",
        swabdate: null,
        need_favi:"",
        stapdown: "",
        authen_number: "",
        line_id: "",
      },
      ob_sex: [{name: 'ชาย',sexcode: '1'},{name: 'หญิง',sexcode: '2'}],
      ob_tmbpart: [],
      ob_amppart: [],
      ob_chwpart: [],
      ob_pttype_name: [],
      ob_hospital: [],      
    };
  },
  computed: {
    displayDate() {
      if (!this.date[0] || !this.date[1]) return '- n/a -';
      return this.date[0] + ' to ' + this.date[1];
    }
  },
  mounted() {
    
    
    this.getHospital()
    this.$http.get("api/v1/forms/ptt-type").then((res) => {
      this.ob_pttype_name = res.data.result      
    });   
  },
  methods: {  
    getHospital(){
      this.$http.get(`api/v1/forms/c_hospital/27`).then((res) => {
        this.ob_hospital = res.data.result
      })
    },   
    select (address) {
      this.form.tmbpart = address.district
      this.form.amppart = address.amphoe
      this.form.chwpart = address.province            
    },
    onFileChange(e) {
      const file = e.target.files[0];
      this.file = file;
      this.url = URL.createObjectURL(file);
    },
    async handleSubmit() {      
      this.$refs.simpleRules.validate().then(async success => {        
        if (success) {
          this.form.need_favi = this.form.need_favi == false ? 0:1
          this.form.stapdown = this.form.stapdown == false ? 0:1
          let data = this.form      
          let formData = new FormData();      
          await this.$http.post(`api/v1/forms/vue-address`,{tmbpart:this.form.tmbpart,amppart:this.form.amppart,chwpart:this.form.chwpart})
          .then((res)=>{                       
            data = {            
              ...this.form,          
              tmbpart: res.data.result.tamboncodefull,
              amppart: res.data.result.ampurcodefull,
              chwpart: res.data.result.changwatcode,                    
            }                                                      
          })              
          if(data.hospcode != null){
            await this.$http.post(`api/v1/forms/find-hoscode`,{hosname: data.hospcode})
            .then((res)=>{            
              data.hospcode = res.data.result.hoscode                
            })        
          }      
          if(data.pttype_name != null){
            await this.$http.post(`api/v1/forms/find-pttype`,{pttype_name: data.pttype_name})
            .then((res)=>{       
              console.log(data) 
              console.log(res.data) 
              if(res.data.result.pttype){
                data.pttype = res.data.result.pttype                            
              }            
              else{
                data.pttype = null
              }
            })       
          }
          data.department == 'HI_CI' ? data.cur_dep = '075':data.cur_dep = '076'
          // return console.log(data)       
          formData.append("file", this.file);
          formData.append("data", JSON.stringify(data)); 
          console.log(data)
          await this.$http.post(`/api/v1/covid/hi-add-patient-avatar`, formData)
            .then((res) => {          
              if (res.data.status == 200) {
                this.$swal({              
                  icon: "success",
                  title: "สำเร็จ",
                  showConfirmButton: false,
                  timer: 1000,
                }).then((res) => {                  
                  this.$router.push(`/covid19-personal-account`)
                });
              } else{
                console.log(res.data)
                this.$swal({              
                  icon: "error",
                  title: "แก้ไขข้อมูลไม่สำเร็จ",
                  showConfirmButton: false,
                  timer: 1000,
                })
              }
              
            })
            .catch((err) => {});
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
