<template>
  <b-card-code title="แก้ไขข้อมูล">
    <validation-observer ref="simpleRules">
      <b-form @submit.prevent="updateUser">
        <b-row>
          <b-col cols="12">
            <b-form-group label="บัญชีผู้ใช้" label-cols-md="3">
              <validation-provider
                #default="{ errors }"
                name="บัญชีผู้ใช้"
                rules="required"
              >
                <b-form-input
                  v-model="user.username"
                  :state="errors.length > 0 ? false : null"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              label="ชื่อ"
              label-for="h-first-name"
              label-cols-md="3"
            >
              <validation-provider
                #default="{ errors }"
                name="ชื่อ"
                rules="required"
              >
                <b-form-input
                  v-model="user.firstname"
                  :state="errors.length > 0 ? false : null"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group label="นามสกุล" label-cols-md="3">
              <validation-provider
                #default="{ errors }"
                name="นามสกุล"
                rules="required"
              >
                <b-form-input
                  v-model="user.lastname"
                  :state="errors.length > 0 ? false : null"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group label="อีเมล" label-for="h-email" label-cols-md="3">
              <validation-provider
                #default="{ errors }"
                name="อีเมล"
                rules="required"
              >
                <b-form-input
                  v-model="user.email"
                  :state="errors.length > 0 ? false : null"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              label="เบอร์โทรศัพท์"
              label-for="h-number"
              label-cols-md="3"
            >
              <validation-provider
                #default="{ errors }"
                name="เบอร์โทรศัพท์"
                rules="required"
              >
                <b-form-input
                  v-model="user.phone"
                  type="number"
                  :state="errors.length > 0 ? false : null"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group label="สถานะ" label-cols-md="3">
              <v-select
                v-model="user.role"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="optRole"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12" v-if="user.role == 'User'">
            <b-form-group label="หน่วยบริการ" label-cols-md="3">
              <validation-provider
                #default="{ errors }"
                name="เบอร์โทรศัพท์"
                rules="required"
              >
                <v-select
                  v-model="user.organigation"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  label="hosname"
                  :options="optHos"
                  :state="errors.length > 0 ? false : null"
                  :class="{
                    'border rounded-lg border-danger': !!errors.length,
                  }"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- submit and reset -->
          <b-col offset-md="4">
            <b-button variant="primary" class="mr-1" type="submit">
              อัพเดท
            </b-button>
            <b-button
              variant="outline-secondary"
              type="button"
              @click.prevent="$router.go(-1)"
            >
              ย้อนกลับ
            </b-button>
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>
  </b-card-code>
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
  BFormCheckbox,
} from "bootstrap-vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import useJwt from "@/auth/jwt/useJwt";
import vSelect from "vue-select";
import { required, email } from "@validations";

import "vue-select/dist/vue-select.css";
export default {
  components: {
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
    BFormCheckbox,
    vSelect,
    BCardCode,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      uId: "",
      edit: true,
      user: {
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        role: "",
        organigation: "",
      },
      optHos: [],
      optRole: ["User", "Admin"],
    };
  },
  mounted() {
    this.uId = this.$route.params.id;
    this.getUser();
    this.$http.get("api/v1/forms/c_hospital/27").then((res) => {
      this.optHos = res.data.result;
    });
  },
  methods: {
    updateUser() {
      this.$refs.simpleRules.validate().then((success) => {        
        if (success) {
          if(this.user.role == "User"){
            this.user.organigation = this.user.organigation.hoscode
          } else{
            this.user.organigation = "0"
          }
          let data = {
            username: this.user.username,
            firstname: this.user.firstname,
            lastname: this.user.lastname,
            email: this.user.email,
            phone: this.user.phone,
            role: this.user.role,
            organigation: this.user.organigation,
          };
          this.$http.put(`api/v1/auth/${this.uId}`, data).then((res) => {
            if (res.data.status == 200) {
              this.$swal({
                icon: "success",
                title: "สำเร็จ",
                showConfirmButton: false,
                timer: 1000,
              }).then(() => {
                this.$router.push("/users");
              });
            } else {
              this.$swal({
                icon: "error",
                title: "อัพเดทข้อมูลไม่สำเร็จ",
                showConfirmButton: false,
                timer: 1000,
              });
            }
          });
        }
      });
    },
    getUser() {
      this.$http
        .get(`api/v1/auth/users-by-id/${this.uId}`, {
          headers: {
            Authorization: `Bearer ${useJwt.getToken()}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.user = res.data;
        });
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-flatpicker.scss";
@import "@core/scss/vue/libs/vue-select.scss";
</style>
