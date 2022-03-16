<template>
  <b-card-code title="เลือกไฟล์ Excel STATMENT จาก สปสช. ที่ต้องการนำเข้า">
    <b-card-text>
      ไฟล์ Excel รูปแบบไฟล์ต้องเป็นแบบเดียวกันกับ สปสช. ทุกประการ
    </b-card-text>
    <div>
      <!-- Styled -->
      <b-form-file
        v-model="file"
        type="file"
        ref="file"
        @change="handleFileUpload($event)"
        placeholder="Choose a file or drop it here..."
        drop-placeholder="Drop file here..."
      />

      <!-- <b-card-text class="my-1">
        ไฟล์ที่เลือก : <strong>{{ file ? file.name : "" }}</strong>
      </b-card-text> -->
      <!-- <b-button variant="primary" v-b-modal.modal-scrollable>
        ตกลง
      </b-button> -->
      <model-custom></model-custom>
    </div>
    <div class="">
      <validation-observer ref="simpleRules">
        <b-form>
          <b-form-checkbox
            v-model="selected"
            class="custom-control-primary mt-2 mb-1"
          >
            กำหนดแถวเอง
          </b-form-checkbox>
          <b-row>
            <b-col md="12">
              <b-form-group label="เลือก Sheets">
                <b-form-select v-model="sheet" :options="obSelect" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row v-if="selected">
            <b-col md="6">
              <b-form-group label="เริ่มจาก">
                <validation-provider
                  #default="{ errors }"
                  name="แถวที่เริ่มบันทึกข้อมูล"
                  rules="required"
                >
                  <b-form-input
                    v-model="start"
                    :state="errors.length > 0 ? false : null"
                    placeholder="แถวที่"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group label="สิ้นสุด">
                <validation-provider
                  #default="{ errors }"
                  name="แถวที่สิ้นสุดการบันทึกข้อมูล"
                  rules="required"
                >
                  <b-form-input
                    v-model="end"
                    :state="errors.length > 0 ? false : null"
                    placeholder="แถวที่"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
          </b-row>
          <b-col cols="12">
            <b-button
              variant="primary"
              type="submit"
              @click.prevent="validationForm"
            >
              อัพโหลด
            </b-button>
            <b-button
              class="ml-1"
              variant="secondary"
              @click.prevent="previewData"
            >
               ดูตัวอย่างข้อมูล
            </b-button>
          </b-col>
        </b-form>
      </validation-observer>
    </div>
    <b-row class="mt-2">
      <b-col>
        <b-table responsive :items="dataPreview" class="mb-0">
        </b-table>
      </b-col>
    </b-row>
  </b-card-code>
</template>

<script>
import {
  BCardText,
  BFormFile,
  BButton,
  BFormInput,
  BFormGroup,
  BForm,
  BRow,
  BFormCheckbox,
  BTable,
  BCol,
  BFormSelect,
} from "bootstrap-vue";
import XLSX from "xlsx";
import ModelCustom from "./component/ModelCustom.vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { required, email } from "@validations";
import BCardCode from "@core/components/b-card-code";
import useJwt from "@/auth/jwt/useJwt";

export default {
  components: {
    BCardCode,
    BCardText,
    BFormFile,
    BButton,
    ModelCustom,
    BFormCheckbox,
    BFormInput,
    BFormGroup,
    BForm,
    BTable,
    BRow,
    BCol,
    ValidationProvider,
    ValidationObserver,
    BFormSelect,
  },
  data() {
    return {
      file: null,
      end: "0",
      start: "0",
      selected: true,
      dataPreview: [],
      sheet: "",
      obSelect: [],
      fields: [
        "req",
        "no",
        "TRAN_ID",
        "hn",
        "an",
        "pid",
        "fullname",
        "vsdate",
        "dcdate",
        "MAININSCL",
        "charge",
        "ip_act",
        "ipAdjRW",
        "ip_PS",
        "compe_percent",
        "CCUF",
        "AdjRW",
        "pay_rate",
        "compensate_act_sa",
        "compensate_s",
        "compensate_t",
        "compensate",
      ],
    };
  },
  mounted() {},
  methods: {
    validationForm() {
      var dataPreview = [];
      this.$refs.simpleRules.validate().then((success) => {
        if (success) {
          let formData = new FormData();
          formData.append("files", this.file);

          if (this.file) {
            this.$swal({
              title: "แน่ใจแล้วหรอ ?",
              text: "ข้อมูลของคุณจะถูกเพิ่มลงฐานข้อมูล!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "ยืนยัน",
              cancelButtonText: "ยกเลิก",
            }).then((result) => {
              if (result.isConfirmed) {
                const reader = new FileReader();

                reader.onload = (e) => {
                  /* Parse data */
                  const bstr = e.target.result;
                  const wb = XLSX.read(bstr, { type: "binary" });
                  /* Get first worksheet */
                  const ws = wb.Sheets[this.sheet];
                  /* Convert array of arrays */
                  const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

                  if (this.selected) {
                    data.forEach((element, index) => {
                      var current = index + 1;
                      if (
                        current >= parseInt(this.start) &&
                        current <= parseInt(this.end)
                      ) {
                        dataPreview.push(element);
                      }
                    });
                  } else {
                    dataPreview = data;
                  }
                  // this.dataPreview = dataPreview
                  console.log(dataPreview);

                  this.$http
                    .post("/api/v1/import/statement", dataPreview, {
                      headers: {
                        Authorization: `Bearer ${useJwt.getToken()}`,
                      },
                    })
                    .then((res) => {
                      if (res.data.status == 200) {
                        this.$bvToast.toast("import ข้อมูลสำเร็จ", {
                          title: "สำเร็จ",
                          variant: "success",
                          solid: true,
                        });
                      } else {
                        this.$bvToast.toast("import ข้อมูลไม่สำเร็จ", {
                          title: "ไม่สำเร็จ",
                          variant: "danger",
                          solid: true,
                        });
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                };
                reader.readAsBinaryString(this.file);
              }
            });
          } else {
            this.$bvToast.toast("กรุณาเลือกไฟล์", {
              title: `ไม่สำเร็จ`,
              variant: `danger`,
              solid: true,
            });
          }
        }
      });
    },
    previewData() {
      var dataPreview = [];
      this.$refs.simpleRules.validate().then((success) => {
        if (success) {
          let formData = new FormData();

          formData.append("files", this.file);

          if (this.file) {
            const reader = new FileReader();

            reader.onload = (e) => {
              /* Parse data */
              const bstr = e.target.result;
              const wb = XLSX.read(bstr, { type: "binary" });
              /* Get first worksheet */
              // const wsname = wb.SheetNames["รายละเอียด IP"];
              // console.log(wsname)
              const ws = wb.Sheets[this.sheet];
              /* Convert array of arrays */
              const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

              if (this.selected) {
                data.forEach((element, index) => {
                  var current = index + 1;
                  if (
                    current >= parseInt(this.start) &&
                    current <= parseInt(this.end)
                  ) {
                    dataPreview.push(element);
                  }
                });
              } else {
                dataPreview = data;
              }
              this.dataPreview = dataPreview;
              console.log(dataPreview);
            };
            reader.readAsBinaryString(this.file);
          } else {
            this.$bvToast.toast("กรุณาเลือกไฟล์", {
              title: `ไม่สำเร็จ`,
              variant: `danger`,
              solid: true,
            });
          }
        }
      });
    },

    handleFileUpload(event) {
      this.file = event.target.files[0];

      if (this.file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          /* Parse data */
          const bstr = e.target.result;
          const wb = XLSX.read(bstr, { type: "binary" });
          /* Get first worksheet */
          // const wsname = wb.SheetNames["รายละเอียด IP"];
          const sheetList = wb.SheetNames; //Array of sheet names.
          this.obSelect = sheetList;
          console.log(sheetList);
          // const ws = wb.Sheets[this.sheet];
          // const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
        };
        reader.readAsBinaryString(this.file);
      }
    },
  },
};
</script>
