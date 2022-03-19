<template>
  <b-card>
    <b-row>
      <!-- User Info: Left col -->
      <b-col
        cols="21"
        xl="6"
        class="d-flex justify-content-between flex-column"
      >
        <!-- User Avatar & Action Buttons -->
        <div class="d-flex justify-content-start">
          <b-avatar
            src="@/assets/images/avatars/person.png"
            size="104px"
            variant="white"
            rounded
          />
          <div class="d-flex flex-column ml-1">
            <div class="mb-1">
              <h4 class="mb-0">
                {{ user.firstname + " " + user.lastname }}
              </h4>
              <span class="card-text">{{ user.email }}</span>
            </div>
            <div class="d-flex flex-wrap">
              <b-button
                :to="{ name: 'edit-user', params: { id: uId } }"
                variant="primary"
              >
                แก้ไข
              </b-button>
              <b-button variant="outline-danger" @click="delUser" class="ml-1">
                ลบ
              </b-button>
            </div>
          </div>
        </div>
      </b-col>

      <!-- Right Col: Table -->
      <b-col cols="12" xl="6">
        <table class="mt-2 mt-xl-0 w-100">
          <tr>
            <th class="pb-50">
              <feather-icon icon="UserIcon" class="mr-75" />
              <span class="font-weight-bold">Username</span>
            </th>
            <td class="pb-50">
              {{ user.username }}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <feather-icon icon="MailIcon" class="mr-75" />
              <span class="font-weight-bold">email</span>
            </th>
            <td>
              {{ user.email }}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <feather-icon icon="PhoneIcon" class="mr-75" />
              <span class="font-weight-bold">phone</span>
            </th>
            <td>
              {{ user.phone }}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <feather-icon icon="StarIcon" class="mr-75" />
              <span class="font-weight-bold">สถานะ</span>
            </th>
            <td class="pb-50 text-capitalize">
              {{ user.role }}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <feather-icon icon="StarIcon" class="mr-75" />
              <span class="font-weight-bold">หน่วยงาน</span>
            </th>
            <td class="pb-50 text-capitalize">
              {{ user.organigation }}
            </td>
          </tr>
        </table>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import { BCard, BButton, BAvatar, BRow, BCol } from "bootstrap-vue";
import useJwt from "@/auth/jwt/useJwt";
export default {
  components: {
    BCard,
    BButton,
    BRow,
    BCol,
    BAvatar,
  },
  data() {
    return {
      uId: this.$route.params.id,
      user: {
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        role: "",
        organigation: "",
      },
    };
  },
  mounted() {
    this.getUser();
  },
  methods: {
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
    delUser() {
      this.$swal({
        icon: "info",
        title: "คุณต้องการลบหรือไม่ ?",
        showConfirmButton: true,
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.$http
            .delete(`api/v1/auth/${this.uId}`, {
              headers: {
                Authorization: `Bearer ${useJwt.getToken()}`,
              },
            })
            .then((res) => {
              if (res.data.status == 200) {
                this.$swal({
                  icon: "success",
                  title: "ลบสำเร็จ",
                  showConfirmButton: false,
                  timer: 1000,
                }).then(() => {
                  this.$router.push("/users");
                });
              } else {
                this.$swal({
                  icon: "error",
                  title: "ลบข้อมูลไม่สำเร็จ",
                  showConfirmButton: false,
                  timer: 1000,
                });
              }
              console.log(res.data);
            });
        } else if (result.isDenied) {
        }
      });
    },
  },
};
</script>

<style></style>
