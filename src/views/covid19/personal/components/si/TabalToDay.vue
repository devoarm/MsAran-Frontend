<template>
  <b-card>
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
          @row-clicked="myRowClickHandler"
        >
          <template #cell(image)="data">
            <b-avatar
              class="mr-1"
              :src="$store.state.service.urlImage + data.value"
            />
          </template>          
          <template #cell(hospcode)="data">            
            <b-badge variant="warning" v-if="!data.value"> กรุณาระบุหน่วยบริการ </b-badge>
            <!-- basic modal -->            
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
    <b-modal
      id="modal-1"
      :title="'ชื่อ : '+HiModal.fullname"      
      ok-title="ยืนยัน"
      @ok.prevent="handleSubmit"      
      cancel-variant="outline-secondary"
      cancel-title="ยกเลิก"
      @hidden="handleCancle"
    >
      <b-card-text>
        <validation-observer ref="simpleRules">
          <b-form>
            <b-row>
              <b-col cols="12">
                <b-form-group
                  label="เลือกหน่วยบริการ"
                  label-for="hoscode"                  
                >
                  <v-select
                    :clearable="false"
                    v-model="form.hospcode"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    label="hosname"
                    :options="opHospital"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group
                  label="วันที่ตรวจพบโควิด"
                  label-for="swabdate"
                >
                  <flat-pickr
                    v-model="form.swabdate"
                    class="form-control"
                  />
                </b-form-group>
              </b-col>              
              <b-col cols="12">
                <b-form-group
                  label="เบอร์โทรศัพท์"
                  label-for="phone"                  
                >             
                    <b-form-input
                      v-model="form.mobile"
                      id="username"                                            
                      placeholder="00-0000-0000"
                    />                                      
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group
                  label="ประเภทการตรวจ"
                  label-for="hoscode"                  
                >
                  <v-select
                    :clearable="false"
                    v-model="form.swabtype"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"                    
                    :options="obSwabType"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group
                  label="ต้องการ favi หรือไม่ ?"
                  label-for="hoscode"                                   
                >
                  <b-form-checkbox v-model="form.need_favi" />
                </b-form-group>
              </b-col>              
              <h3 class="ml-1">ที่อยู่</h3>
              
              <b-col cols="12">
                <b-form-group
                  label="บ้านเลขที่"
                  label-for="address"                  
                >             
                    <b-form-input
                      v-model="form.addrpart"
                      id="address"                                                                  
                    />                                      
                </b-form-group>
              </b-col>
              <b-col cols="12">
                 <template>
                  <ThailandAutoComplete v-model="form.tmbpart" type="district" @select="select" label="ตำบล" placeholder="ตำบล..."/>
                  <ThailandAutoComplete v-model="form.amppart" type="amphoe" @select="select" label="อำเภอ"  placeholder="อำเภอ..."/>
                  <ThailandAutoComplete v-model="form.chwpart" type="province" @select="select" label="จังหวัด" placeholder="จังหวัด..."/>                  
                </template>
              </b-col>

              
            </b-row>
          </b-form>
        </validation-observer>
      </b-card-text>
    </b-modal>
  </b-card>
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
  BCard,
  BForm,
  BCardText,
  BFormCheckbox
} from "bootstrap-vue";
import useJwt from "@/auth/jwt/useJwt";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import flatPickr from 'vue-flatpickr-component'
import vSelect from 'vue-select'
import {  
  getUserData,  
} from "@/auth/utils";
export default {
  components: {
    BTable,
    BAvatar,
    BBadge,
    BRow,
    BCol,
    BForm,
    BFormGroup,
    BFormSelect,
    BPagination,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BButton,
    BCard,
    ValidationProvider, 
    ValidationObserver,
    BCardText,
    flatPickr,
    vSelect,
    BFormCheckbox
  },
  data() {
    return {
      form:{
        hospcode: {
          hoscode:"",
          hosname:"",
        },
        swabtype:"",
        need_favi:false,
        mobile: "",
        swabdate:null,
        addrpart:"",
        tmbpart: "",
        amppart: "",
        chwpart: ""
      },                 
      obSwabType:["ATK","RT-PCR"],
      ob_chwpart:[],
      ob_amppart:[],
      HiModal:"",
      opHospital:[],
      perPage: 10,
      pageOptions: [10, 50, 100],
      totalRows: 1,
      currentPage: 1,
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      idModal: "",
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
        { key: "cid", label: "เลขบัตรประชาชน", sortable: true },
        // { key: "sex", label: "เพศ", sortable: true },
        // { key: "birthday", label: "วันเกิด" },
        //{ key: "pttype_name", label: "สิทธ์การรักษา" },
        { key: "pttype_name", label: "สิทธิ", sortable: true },
        { key: "mobile", label: "เบอร์โทรศัพท์" },       
        { key: "vstdate", label: "วันที่เริ่มรับบริการ", sortable: true },
        { key: "dcdate", label: "วันที่สิ้นสุดบริการ", sortable: true },
        { key: "hospcode", label: "หน่วยบริการ", sortable: true },
        { key: "claim_code", label: "Authen" },
        // { key: "line_id", label: "ไอดีไลน์" },
      ],
      items: [],     
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
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
    this.getSiNew();    
  },
  methods: {
    select (address) {
      this.form.tmbpart = address.district
      this.form.amppart = address.amphoe
      this.form.chwpart = address.province            
    },
    handleCancle(){
      this.form = {
        hospcode: {
          hoscode:"",
          hosname:"",
        },
        swabtype:"",
        need_favi:false,
        mobile: "",
        swabdate:null,
        addrpart:"",
        tmbpart: "",
        amppart: "",
        chwpart: ""
      }
    },
    async handleSubmit(){                  
      await this.$http.post(`api/v1/forms/vue-address`,{tmbpart:this.form.tmbpart,amppart:this.form.amppart,chwpart:this.form.chwpart})
      .then((res) => {
        if(res.data.status == 200){                  
          let data = {
            hospcode: this.form.hospcode.hoscode,
            mobile: this.form.mobile,
            // swabdate: this.form.swabdate,     
            swabtype: this.form.swabtype,
            need_favi: this.form.need_favi,
            tmbpart: res.data.result.tamboncodefull,
            amppart: res.data.result.ampurcodefull,
            chwpart: res.data.result.changwatcode,
          }      
          // console.log(data);
          this.$http.post(`api/v1/covid/add-hoscode-personal/${this.HiModal.id}`,data).then((res) => {
            if (res.data.status == 200) {
              this.$bvModal.hide("modal-1");   
              this.$bvToast.toast('สำเร็จ', {
                title: `แจ้งเตือน`,
                variant:'success',
                solid: true,
              })
              this.getSiNew()
            } else {
              this.$bvToast.toast('ไม่สำเร็จ! เกิดควมผิดพลาด', {
                title: `แจ้งเตือน`,
                variant:'danger',
                solid: true,
              })
            }
          })
        } else{
          this.$bvToast.toast('ที่อยู่ไม่ถูกต้อง', {
              title: `แจ้งเตือน`,
              variant:'danger',
              solid: true,
          })           
        }
      })
      
    },
    async myRowClickHandler(record, index) {
      this.$bvModal.show("modal-1");   
      this.HiModal = record;
      this.form.addrpart = record.addrpart;
      this.getHospital();
      await this.$http.get(`api/v1/covid/hi-by-id/${this.HiModal.id}`).then((res)=>{        
        this.form.tmbpart = res.data.tmbpart
        this.form.amppart = res.data.amppart
        this.form.chwpart = res.data.chwpart
      })
    },
    getSiNew() {
      this.$http
        .get(`api/v1/covid/si-new/${getUserData().organigation}`, {
          headers: {
            Authorization: `Bearer ${useJwt.getToken()}`,
          },
        })
        .then((res) => {
          this.items = res.data;
          this.totalRows = this.items.length;          
        });
    },
    getHospital(){
      this.$http.get(`api/v1/forms/c_hospital/27`).then((res) => {
        this.opHospital = res.data.result
      })
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
<style lang="scss">
  @import '@core/scss/vue/libs/vue-flatpicker.scss';
  @import '@core/scss/vue/libs/vue-select.scss';
</style>
 



