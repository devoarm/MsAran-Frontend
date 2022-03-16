<template>
  <b-col cols="21" xl="6" class="d-flex justify-content-between flex-column">

 <!-- User Avatar & Action Buttons -->
        <div class="d-flex justify-content-start">
          <b-avatar
            :src="$store.state.service.urlImage + form.image"
            :text="avatarText(this.fullName)"
            size="104px"
            rounded
          />
          <div class="d-flex flex-column ml-1">
            <div class="mb-1">
              <h4 class="mb-0">
                {{ this.fullName }}
              </h4>
            </div>
            <div class="d-flex flex-wrap">
              <b-button
                :to="{ name: 'covid19-hi-view', params: { id: this.id } }"
                variant="primary"
              >
                Edit
              </b-button>
              <b-button
                variant="outline-danger"
                class="ml-1"
              >
                Delete
              </b-button>
            </div>
          </div>
        </div>




  </b-col>
</template>

<script>
import { BCard, BButton, BAvatar, BRow, BCol } from "bootstrap-vue";

export default {
  component: {
    BCard,
    BButton,
    BRow,
    BCol,
    BAvatar,
  },
  data() {
    return {
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
    };
  },
  mounted() {
    this.uId = this.$route.params.id;
    this.$http.get(`api/v1/covid/hi-by-id/${this.uId}`).then((res) => {
      this.form = res.data;
    });
  },
};
</script>
