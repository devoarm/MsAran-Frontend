<template lang="">
  <div>
    <b-modal
      id="modal-select2"
      title="เพิ่มผู้ใช้งาน"
      ok-title="เพิ่มผู้ใช้งาน"
      cancel-title="ยกเลิก"
      cancel-variant="outline-secondary"
      @ok="addUser"
    >
      <b-form>
        <b-form-group label="บัญชีผู้ใช้" label-for="name">
          <b-form-input
            id="username"
            v-model="userFrom.username"
            placeholder="กรอกบัญชีผู้ใช้"
          />
        </b-form-group>
        <b-form-group label="รหัสผ่าน" label-for="name">
          <b-form-input
            id="password"
            type="password"
            placeholder="กรอกรหัสผ่าน"
            v-model="userFrom.password"
          />
        </b-form-group>
        <b-form-group label="ชื่อ" label-for="name">
          <b-form-input
            id="firstname"
            v-model="userFrom.firstname"
            placeholder="กรอกชื่อ"
          />
        </b-form-group>
        <b-form-group label="นามสกุล" label-for="name">
          <b-form-input
            id="lastname"
            placeholder="กรอกนามสกุล"
            v-model="userFrom.lastname"
          />
        </b-form-group>
        <b-form-group label="อีเมล" label-for="name">
          <b-form-input
            id="email"
            placeholder="กรอกอีเมล"
            v-model="userFrom.email"
          />
        </b-form-group>
        <b-form-group label="เบอร์โทรศัพท์" label-for="name">
          <b-form-input
            id="phone"
            placeholder="กรอกเบอร์โทรศัพท์"
            v-model="userFrom.phone"
          />
        </b-form-group>
        <b-form-group label="ประเภทผู้ใช้งาน" label-for="vue-select">
          <v-select
            id="vue-select"
            v-model="selected"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :options="option"
          />
        </b-form-group>
      </b-form>
    </b-modal>
  </div>
</template>
<script>
import {
  BButton,
  BModal,
  VBModal,
  BForm,
  BFormInput,
  BFormGroup,
} from "bootstrap-vue";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { mapActions, mapState } from "vuex";
export default {
  name: "ModelAddUser",
  components: {
    BButton,
    BModal,
    BForm,
    BFormInput,
    BFormGroup,
    vSelect,
  },
  directives: {
    "b-modal": VBModal,
  },
  data() {
    return {
      userFrom: {
        username: "",
        password: "",
        email: "",
        firstname: "",
        lastname: "",
        phone: "",
      },
      selected: "User",
      option: ["User", "Admin"],
    };
  },
  methods: {
    ...mapActions({
      getUsers: "getUsers",
    }),
    addUser() {
      var data = { ...this.userFrom, role: this.selected };
      this.$http.post("api/v1/auth/register", data).then((res) => {
        router.push({ path: '/users' })
      });
    },
  },
};
</script>
<style lang=""></style>
