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
  BCardText
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
    vSelect
  },
  data() {
    return {
      form:{
        hospcode: {
          hoscode:"",
          hosname:"",
        },
        mobile: "",
        swabdate:""  
      },
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
        // { key: "swabdate", label: "วันที่พบเชื้อ", sortable: true },
        // { key: "dcdate", label: "วันที่สิ้นสุดบริการ", sortable: true },
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
    this.getHiNew();
    this.getHospital();
  },
  methods: {   
    myRowClickHandler(record, index) {
        console.log(record)
        this.$swal({
            icon: "question",
            title: `ยืนยัน คุณ ${record.fullname}`,
            text:`ต้องการยืนยัน HI หรือไม่ ?`,
            showConfirmButton: true,  
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                this.$http.get(`api/v1/covid/confirme-hi/${record.id}`).then((res)=>{
                    if(res.data.status == 200){
                        this.$bvToast.toast('สำเร็จ', {
                            title: `แจ้งเตือน`,
                            variant:'success',
                            solid: true,
                        })
                        this.getHiNew()
                    } else{
                        this.$bvToast.toast('ผิดพลาด', {
                            title: `แจ้งเตือน`,
                            variant:'danger',
                            solid: true,
                        })
                    }
                })
            } 
        });
    },
    getHiNew() {
      this.$http
        .get(`api/v1/covid/hi_new/${getUserData().organigation}`, {
          headers: {
            Authorization: `Bearer ${useJwt.getToken()}`,
          },
        })
        .then((res) => {
          this.items = res.data;
          this.totalRows = res.data.length;          
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
 
