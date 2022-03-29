import Vue from "vue";
import VueRouter from "vue-router";
import { canNavigate } from "@/libs/acl/routeProtection";
import {
  isUserLoggedIn,
  getUserData,
  getHomeRouteForLoggedInUser,
} from "@/auth/utils";
Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/Home.vue"),
      meta: {
        pageTitle: "Home",
        breadcrumb: [
          {
            text: "Home",
            active: true,
          },
        ],
      },
    },
    {
      path: "/second-page",
      name: "second-page",
      component: () => import("@/views/SecondPage.vue"),
      meta: {
        pageTitle: "Second Page",
        breadcrumb: [
          {
            text: "Second Page",
            active: true,
          },
        ],
      },
    },
    {
      path: "/audit/audit-page",
      name: "audit-page",
      component: () => import("@/views/audit/AuditPage.vue"),
      meta: {
        pageTitle: "Audit Page",
        breadcrumb: [
          {
            text: "Audit Page",
            active: true,
          },
        ],
      },
    },
    {
      path: "/audit/visit-check",
      name: "visit-check",
      component: () => import("@/views/audit/VisitCheckPage.vue"),
      meta: {
        pageTitle: "Audit Data",
        breadcrumb: [
          {
            text: "OPD",
            active: true,
          },
        ],
      },
    },
    {
      path: "/audit/error-page",
      name: "error-page",
      component: () => import("@/views/audit/ErrorPage.vue"),
      meta: {
        pageTitle: "Error Page",
        breadcrumb: [
          {
            text: "Error Page",
            active: true,
          },
        ],
      },
    },
    {
      path: "/butget/butget-page",
      name: "butget-page",
      component: () => import("@/views/budget/BudgetPage.vue"),
      meta: {
        pageTitle: "Budget Page",
        breadcrumb: [
          {
            text: "Budget Page",
            active: true,
          },
        ],
      },
    },
    {
      path: "/authen/authen-page",
      name: "authen-page",
      component: () => import("@/views/authen/AuthenPage.vue"),
      meta: {
        pageTitle: "Authen Page",
        breadcrumb: [
          {
            text: "Authen Page",
            active: true,
          },
        ],
      },
    },
    {
      path: "/budget/ipd-page",
      name: "bud-ipd-page",
      component: () => import("@/views/budget/IpdPage.vue"),
      meta: {
        pageTitle: "IPD Page",
        breadcrumb: [
          {
            text: "IPD Page",
            active: true,
          },
        ],
      },
    },
    {
      path: "/covid19/butget-page",
      name: "covid19-page",
      component: () => import("@/views/covid19/CovidPage.vue"),
      meta: {
        pageTitle: "Covid Page",
        breadcrumb: [
          {
            text: "Covid Page",
            active: true,
          },
        ],
      },
    },
    {
      path: "/covid19/lab-page",
      name: "lab-page",
      component: () => import("@/views/covid19/LabPage.vue"),
      meta: {
        pageTitle: "Lab-Covid",
        breadcrumb: [
          {
            text: "Lab-Covid",
            active: true,
          },
        ],
      },
    },
    {
      path: "/covid19/lab-page",
      name: "vaccine-page",
      component: () => import("@/views/covid19/VaccinePage.vue"),
      meta: {
        pageTitle: "Vaccine-Covid",
        breadcrumb: [
          {
            text: "Vaccine-Covid",
            active: true,
          },
        ],
      },
    },
    {
      path: "/import/import-statment",
      name: "import-statment",
      component: () => import("@/views/import/ImportStatment.vue"),
      meta: {
        pageTitle: "Import Statment",
        breadcrumb: [
          {
            text: "Import Statment",
            active: true,
          },
        ],
      },
    },
    {
      path: "/import/import-rep",
      name: "import-rep",
      component: () => import("@/views/import/ImportRep.vue"),
      meta: {
        pageTitle: "Import REP",
        breadcrumb: [
          {
            text: "Import REP",
            active: true,
          },
        ],
      },
    },
    {
      path: "/meeting/meet-calendar",
      name: "meet-calendar",
      component: () => import("@/views/meeting/MeetCalendar.vue"),
      meta: {
        pageTitle: "Meeting Page",
        breadcrumb: [
          {
            text: "Meeting Page",
            active: true,
          },
        ],
      },
    },
    {
      path: "/car/car-calendar",
      name: "car-calendar",
      component: () => import("@/views/car/CarCalendar.vue"),
      meta: {
        pageTitle: "Car Page",
        breadcrumb: [
          {
            text: "Car Page",
            active: true,
          },
        ],
      },
    },
    {
      path: "/users",
      name: "users",
      component: () => import("@/views/users/Users.vue"),
      meta: {
        pageTitle: "จัดการบัญชีผู้ใช้",
      },
    },
    {
      path: "/detail-user/:id",
      name: "detail-user",
      component: () => import("@/views/users/ReadUser.vue"),
      meta: {
        pageTitle: "ข้อมูลบัญชีผุ้ใช้",
      },
    },
    {
      path: "/users-edit-user/:id",
      name: "edit-user",
      component: () => import("@/views/users/EditUser.vue"),
      meta: {
        pageTitle: "ข้อมูลบัญชีผุ้ใช้",
      },
    },
    {
      path: "/covid19-si",
      name: "covid19-si",
      component: () => import("@/views/covid19/personal/SiHome.vue"),
      meta: {
        pageTitle: "ระบบจัดการ SI",
      },
    },
    {
      path: "/covid19-personal-account",
      name: "covid19-personal-account",
      component: () => import("@/views/covid19/personal/HiHome.vue"),
      meta: {
        pageTitle: "ระบบจัดการ HI",
      },
    },
    {
      path: "/covid19-hi-detail/:id",
      name: "covid19-personal-account",
      component: () => import("@/views/covid19/personal/DetailHi.vue"),
      meta: {
        pageTitle: "รายละเอียดผู้ป่วย HI",
      },
    },
    {
      path: "/covid19-hi-view/:id",
      name: "covid19-personal-account",
      component: () => import("@/views/covid19/personal/view.vue"),
      meta: {
        pageTitle: "รายละเอียดผู้ป่วย HI",
      },
    },
    {
      path: "/covid19-personal-add",
      name: "covid19-personal-add",
      component: () => import("@/views/covid19/personal/AddPersonal.vue"),
      meta: {
        pageTitle: "เพิ่มข้อมูลผู้ป่วย HI",
      },
    },
    // {
    //   path: "/covid19-visit-add",
    //   name: "covid19-visit-add",
    //   component: () => import("@/views/covid19/personal/AddVisit.vue"),
    //   meta: {
    //     pageTitle: "บันทึกข้อมูลติดตามอาการผู้ป่วย HI",
    //   },
    // },
    {
      path: "/covid19-visit-add/:hiId",
      name: "covid19-visit-add",
      component: () => import("@/views/covid19/personal/AddVisit.vue"),
      meta: {
        pageTitle: "บันทึกข้อมูลติดตามอาการผู้ป่วย HI",
      },
    },
    {
      path: "/covid19-edit-hi/:id",
      name: "covid19-personal-add",
      component: () => import("@/views/covid19/personal/EditHi.vue"),
      meta: {
        pageTitle: "แก้ไขข้อมูลผู้ป่วย HI",
      },
    },

    {
      path: "/login",
      name: "auth-login",
      component: () => import("@/views/Login.vue"),
      meta: {
        layout: "full",
      },
    },
    {
      path: "/forgot-password",
      name: "forgot-password",
      component: () => import("@/views/authentication/ForgotPassword.vue"),
      meta: {
        layout: "full",
      },
    },
    {
      path: "/reset-password/:token",
      name: "reset-password",
      component: () => import("@/views/authentication/ResetPassword.vue"),
      meta: {
        layout: "full",
      },
    },
    {
      path: "/error-404",
      name: "error-404",
      component: () => import("@/views/error/Error404.vue"),
      meta: {
        layout: "full",
      },
    },
    {
      path: "/*",
      redirect: "error-404",
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = isUserLoggedIn();
  if (to.name == "forgot-password") return next();
  if (to.name == "reset-password") return next();
  if (to.name !== "auth-login" && !isLoggedIn) next({ name: "auth-login" });
  if (to.name == "auth-login" && isLoggedIn) next({ name: "home" });
  // Redirect if logged in
  return next();
});
// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById("loading-bg");
  if (appLoading) {
    appLoading.style.display = "none";
  }
});

export default router;
