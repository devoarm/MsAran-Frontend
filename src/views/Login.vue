<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">
      <!-- Brand logo-->
      <b-link class="brand-logo">
        <vuexy-logo />
        <h2 class="brand-text text-primary ml-1">MSAranHos</h2>
      </b-link>
      <!-- /Brand logo-->

      <!-- Left Text-->
      <b-col lg="8" class="d-none d-lg-flex align-items-center p-5">
        <div
          class="w-100 d-lg-flex align-items-center justify-content-center px-5"
        >
          <b-img fluid :src="imgUrl" alt="Login V2" />
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Login-->
      <b-col lg="4" class="d-flex align-items-center auth-bg px-2 p-lg-5">
        <b-col sm="8" md="6" lg="12" class="px-xl-2 mx-auto">
          <b-card-title title-tag="h2" class="font-weight-bold mb-1">
            Welcome to MsAranhos! 👋
          </b-card-title>

          <!-- form -->
          <validation-observer ref="simpleRules">
            <b-form class="auth-login-form mt-2" @submit.prevent="isLogin">
              <!-- email -->
              <b-form-group label="บัญชีผู้ใช้" label-for="login-email">
                <validation-provider
                  #default="{ errors }"
                  name="บัญชีผู้ใช้"
                  rules="required"
                >
                  <b-form-input
                    id="login-email"
                    v-model="username"
                    :state="errors.length > 0 ? false : null"
                    name="username"
                    placeholder="กรอกบัญชีผู้ใช้"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- forgot password -->
              <b-form-group>
                <div class="d-flex justify-content-between">
                  <label for="login-password">รหัสผ่าน</label>
                  <b-link :to="{ name: 'auth-forgot-password-v2' }">
                    <small>Forgot Password?</small>
                  </b-link>
                </div>
                <validation-provider
                  #default="{ errors }"
                  name="Password"
                  vid="password"
                  rules="required|min:8"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid' : null"
                  >
                    <b-form-input
                      id="login-password"
                      v-model="password"
                      class="form-control-merge"
                      :state="errors.length > 0 ? false : null"
                      :type="passwordFieldType"
                      name="login-password"
                      placeholder="············"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        class="cursor-pointer"
                        :icon="passwordToggleIcon"
                        @click="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- checkbox -->
              <b-form-group>
                <b-form-checkbox
                  id="remember-me"
                  v-model="status"
                  name="checkbox-1"
                >
                  Remember Me
                </b-form-checkbox>
              </b-form-group>

              <!-- submit buttons -->
              <b-button type="submit" variant="primary" block>
                Sign in
              </b-button>
            </b-form>
          </validation-observer>
        </b-col>
      </b-col>
      <!-- /Login-->
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */

import VuexyLogo from "@core/layouts/components/Logo.vue";
import {
  BRow,
  BCol,
  BLink,
  BFormGroup,
  BFormInput,
  BInputGroupAppend,
  BInputGroup,
  BFormCheckbox,
  BCardText,
  BCardTitle,
  BImg,
  BForm,
  BButton,
} from "bootstrap-vue";
import { required, email, min } from "@validations";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import store from "@/store/index";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import router from "@/router";
import { getHomeRouteForLoggedInUser } from "@/auth/utils";
import useJwt from "@/auth/jwt/useJwt";
import { ValidationProvider, ValidationObserver } from "vee-validate";

export default {
  components: {
    BRow,
    BCol,
    BLink,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
    BFormCheckbox,
    BCardText,
    BCardTitle,
    BImg,
    BForm,
    BButton,
    VuexyLogo,
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      status: "",
      password: "",
      username: "",
      sideImg: require("@/assets/images/pages/login-v2.svg"),
      // validation rulesimport store from '@/store/index'
      required,
      email,
    };
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === "password" ? "EyeIcon" : "EyeOffIcon";
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === "dark") {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require("@/assets/images/pages/login-v2-dark.svg");
        return this.sideImg;
      }
      return this.sideImg;
    },
  },
  methods: {
    isLogin() {
      this.$refs.simpleRules.validate().then((success) => {
        if (success) {
          let data = {
            username: this.username,
            password: this.password,
          };
          this.$http.post("api/v1/auth/login", data).then((res) => {
            if (res.data.token) {
              const { userData } = res.data;
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("userData", JSON.stringify(userData));
              this.$store.dispatch("verticalMenu/getRole");
              this.$router
                .replace(getHomeRouteForLoggedInUser(userData.role))
                .then(() => {
                  this.$toast({
                    component: ToastificationContent,
                    position: "top-right",
                    props: {
                      title: `ยินดีต้อนรับ ${
                        userData.firstname || userData.username
                      }`,
                      icon: "CoffeeIcon",
                      variant: "success",
                      text: `คุณเข้าสู่ระบบสำเร็จแล้วในฐานะ ${userData.role}. ตอนนี้คุณสามารถเริ่มใช้งานเว็บได้แล้ว!`,
                    },
                  });
                });
            } else {
              if (res.data.message == "username not found") {
                this.$bvToast.toast("บัญชีผู้ใช้ไม่ถูกต้อง", {
                  title: `เข้าสู่ระบบไม่สำเร็จ`,
                  variant: "danger",
                  solid: true,
                });
              }
              if (res.data.message == "password not found") {
                this.$bvToast.toast("รหัสผ่านผู้ใช้ไม่ถูกต้อง", {
                  title: `เข้าสู่ระบบไม่สำเร็จ`,
                  variant: "danger",
                  solid: true,
                });
              }
            }
          });
        }
      });
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
</style>
