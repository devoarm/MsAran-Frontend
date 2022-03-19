<template>
  <div>
    <div>
      <b-card-code title="" no-body>
        <div class="pl-3 pr-3 pb-2">
          <!-- User Info: Input Fields -->
          <b-form class="">
            <!-- Header: Personal Info -->
            <div class="d-flex">
              <feather-icon icon="UserIcon" size="19" />
              <h4 class="mb-2 ml-50">รายละเอียดข้อมูลส่วนบุคคล Information</h4>
            </div>
            <b-row>
              <b-col
                cols="21"
                xl="6"
                class="d-flex justify-content-between flex-column"
              >
                <div class="d-flex justify-content-start">
                  <b-avatar
                    class="mr-3"
                    rounded="sm"
                    size="120px"
                    :src="$store.state.service.urlImage + form.image"
                  />
                  <div class="d-flex flex-column ml-1">
                    <div class="mb-1">
                      <h4 class="mb-0">{{ form.fullname }}</h4>
                      <span class="card-text">{{ form.id_card }}</span>
                    </div>
                    <div class="mb-1">
                      <b-badge
                        :variant="
                          form.hi_type == 'กำลังรักษา' ? 'warning' : 'success'
                        "
                        ><h5 class="mb-0 text-white">{{ form.hi_type }}</h5>
                      </b-badge>
                      <br />
                      <br />
                      <span class="card-text">
                        น้ำหนัก : {{ form.weight }} ส่วนสูง : {{ form.height
                        }}<br />
                        ความดัน : {{ form.bp }} <br />
                        วันที่แรกเข้า : {{ form.vstdate }}</span
                      >
                    </div>
                  </div>
                </div>
              </b-col>

              <b-col cols="12" xl="6">
                <table class="mt-2 mt-xl-0 w-100">
                  <tr>
                    <th class="pb-50">
                      <feather-icon icon="UsersIcon" class="mr-75" />
                      <span class="font-weight-bold">เพศ</span>
                    </th>
                    <td class="pb-50">{{ form.sex }}</td>
                  </tr>
                  <tr>
                    <th class="pb-50">
                      <feather-icon icon="SunIcon" class="mr-75" />
                      <span class="font-weight-bold">วันเกิด</span>
                    </th>
                    <td class="pb-50">{{ form.birthday }}</td>
                  </tr>
                  <tr>
                    <th class="pb-50">
                      <feather-icon icon="PhoneIcon" class="mr-75" />
                      <span class="font-weight-bold">Mobile</span>
                    </th>
                    <td class="pb-50 text-capitalize">{{ form.mobile }}</td>
                  </tr>
                  <tr>
                    <th class="pb-50">
                      <feather-icon icon="StarIcon" class="mr-75" />
                      <span class="font-weight-bold">ที่อยู่รักษา</span>
                    </th>
                    <td class="pb-50 text-capitalize">
                      {{ form.addrpart }} ต.{{ form.tmbpart }} อ.{{
                        form.amppart
                      }}
                      จ.{{ form.chwpart }}
                    </td>
                  </tr>

                  <tr>
                    <th class="pb-50">
                      <feather-icon icon="CheckIcon" class="mr-75" />
                      <span class="font-weight-bold">สิทธิการรักษา</span>
                    </th>
                    <td class="pb-50">{{ form.pttype_name }}</td>
                  </tr>
                  <tr>
                    <th>
                      <feather-icon icon="FlagIcon" class="mr-75" />
                      <span class="font-weight-bold"
                        >หน่วยการบริการที่ดูแล</span
                      >
                    </th>
                    <td>{{ form.hospcode }}</td>
                  </tr>
                </table>
              </b-col>
              <div class="d-flex flex-wrap">
                <router-link :to="'/covid19-visit-add/' + uId" class="mx-1">
                  <b-button variant="outline-primary">
                    <feather-icon icon="EditIcon" class="mr-50" />
                    <span class="align-middle">บันทึกการรักษา</span>
                  </b-button>
                </router-link>
                <router-link :to="'/covid19-edit-hi/' + uId" class="mx-1">
                  <b-button variant="outline-warning">
                    <feather-icon icon="EditIcon" class="mr-50" />
                    <span class="align-middle">แก้ไขข้อมูล</span>
                  </b-button>
                </router-link>
                <b-button variant="outline-danger" @click="delHi" class="mx-1">
                  <feather-icon icon="Trash2Icon" class="mr-50" />
                  <span class="align-middle">ลบข้อมูล</span>
                </b-button>
                <b-button
                  variant="outline-success"
                  @click="createPDF"
                  class="mx-1"
                >
                  <feather-icon icon="FileTextIcon" class="mr-50" />
                  <span class="align-middle">พิมพ์ใบรับรองแพทย์</span>
                </b-button>
              </div>
            </b-row>
          </b-form>
        </div>
      </b-card-code>
    </div>
    <!-- ประวัติติดตาม -->
    <div>
      <b-card-code title="📣 ประวัติการติดตาม" no-body>
        <b-table responsive :items="itemes" :fields="fields" class="mb-0">
        </b-table>
      </b-card-code>
    </div>
    <!-- <b-img
      src="@/assets/images/covid/certiportCovid19.png"
      fluid
      alt="Responsive image"
    ></b-img> -->
  </div>
</template>

<script>
import BCardCode from "@core/components/b-card-code/BCardCode.vue";
import {
  BRow,
  BCol,
  BForm,
  BImg,
  BFormGroup,
  BFormInput,
  BFormRadioGroup,
  BFormCheckboxGroup,
  BButton,
  BFormFile,
  BAvatar,
  BFormSelect,
  BTable,
  BBadge,
} from "bootstrap-vue";
import flatPickr from "vue-flatpickr-component";
import { ref } from "@vue/composition-api";
import vSelect from "vue-select";
import useJwt from "@/auth/jwt/useJwt";
import jsPDF from "jspdf";
import font from "@/service/font";
import imageCertiport from "@/assets/images/covid/certiportCovid19.png";

export default {
  components: {
    BTable,
    BRow,
    BImg,
    BCol,
    BForm,
    BFormFile,
    BAvatar,
    BBadge,
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

      form: [],
      uId: "",
      file: "",
      url: null,
      form: {
        cid: "",
        fullname: "",
        id_card: "",
        sex: "",
        image: "",
        birthday: "",
        pttype_name: "",
        mobile: "",
        addrpart: "",
        tmbpart: "",
        amppart: "",
        chwpart: "",
        weight: "",
        height: "",
        bp: "",
        pr: "",
        vstdate: "",
        dcdate: "",
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
      itemes: [],
    };
  },
  mounted() {
    this.uId = this.$route.params.id;

    this.$http.get(`api/v1/covid/hi-by-id/${this.uId}`).then((res) => {
      this.form = res.data;
    });
    this.getHi();
  },
  methods: {
    async createPDF() {
      let pdfName = "test";
      var doc = new jsPDF("p", "mm", "a4");
      var width = doc.internal.pageSize.getWidth();
      var height = doc.internal.pageSize.getHeight();
      doc.addFileToVFS("THSarabunNew-normal.ttf", font);
      doc.addFont("THSarabunNew-normal.ttf", "THSarabunNew", "normal");
      doc.setFont("THSarabunNew");
      doc.setFontSize(12);
      //คนกรอก
      doc.text(this.form.fullname, 65, 37); //ชื่อ-นามสกุล
      doc.text(this.form.cid, 65, 46); //เลขบัตร
      doc.text(`${this.form.addrpart} ต.${this.form.tmbpart} อ.${this.form.amppart} จ.${this.form.chwpart}`, 62, 55); //สถานที่อยู่
      doc.text("", 120, 72); //ชื่อสถานพยาบาล
      doc.text(this.form.vstdate, 43, 79); //เมื่อวันที่
      doc.text(`${this.form.addrpart} ต.${this.form.tmbpart} อ.${this.form.amppart} จ.${this.form.chwpart}`, 123, 86); //Community isolation
      (this.form.dcdate!=null? doc.text(this.form.hospcode, 70, 92):doc.text("", 70, 92)) //ภายใต้การดูแล
      doc.text(this.form.vstdate, 120, 92); //ระหว่าง
      (this.form.dcdate!=null? doc.text(this.form.dcdate, 148, 92):doc.text("", 148, 92)) //ถึง
      doc.text("", 191, 92); //รวม
      doc.text("", 45, 99); // ประวัติอื่นที่สำคัญ
      //แพทย์กรอก
      // doc.text(this.form.hospcode, 50, 134); //สถานที่ตรวจ
      // doc.text("-", 134, 134); //วันที่
      // doc.text("-", 152, 134); //เดือน
      // doc.text("-", 188, 134); //ปี
      // doc.text(this.form.hospcode, 65, 147); //ปฏิบัติงานภายใต
      doc.text(this.form.fullname, 154, 147); //ขอรับรองวา


      doc.addImage(imageCertiport, "PNG", 0, 0, width, height);
      window.open(doc.output("bloburl", { pdfName: pdfName }), "_blank");
    },
    delHi() {
      this.$http.delete(`api/v1/covid/hi/${this.uId}`).then((res) => {
        if (res.data.status == 200) {
          console.log(res.data)
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
            title: "ลบข้อมูลไม่สำเร็จ",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      });
    },
    getHi() {
      this.$http
        .get(`api/v1/covid/visit-by-id/${this.uId}`, {
          headers: {
            Authorization: `Bearer ${useJwt.getToken()}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          // this.itemes = res.data;
          // this.totalRows = res.data.length;
        });
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
@import "@core/scss/vue/libs/vue-flatpicker.scss";
@import "@core/scss/vue/libs/vue-select.scss";
</style>
