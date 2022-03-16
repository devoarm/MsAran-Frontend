import { $themeConfig } from "@themeConfig";
import navMenuItems from '@/navigation/vertical'
export default {
  namespaced: true,
  state: {
    isVerticalMenuCollapsed: $themeConfig.layout.menu.isCollapsed,
    adminMenu: [
      {
        title: "Home",
        route: "home",
        icon: "HomeIcon",
      },
      {
        title: "AUDIT-DATA",
        route: "audit",
        icon: "PieChartIcon",
        children: [
          {
            title: "16 FILE",
            icon: "CheckCircleIcon",
            route: "audit-page",
          },
          {
            title: "AuthentCode",
            route: "authen-page",
            icon: "KeyIcon",
          },
          {
            title: "IPD",
            icon: "CodepenIcon",
            route: "meet-calendar",
          },
          {
            title: "OPD",
            icon: "FileTextIcon",
            route: 'visit-check',
          },
          {
            title: "PP",
            icon: "FileTextIcon",
            route: "pp",
          },
          {
            title: "Error Code",
            icon: "AlertCircleIcon",
            route: "error-page",
          },
        ],
      },
      {
        title: "COVID-19",
        route: "covid19-page",
        icon: "ShieldIcon",
        children: [
          {
            title: "Ward",
            icon: "PackageIcon",
            route: "covid19-page",
          },
          {
            title: "LAB",
            icon: "ThermometerIcon",
            route: "lab-page",
          },
          {
            title: "Vaccine",
            icon: "ShieldIcon",
            route: "vaccine-page",
          },
        ],
      },

      {
        title: "BUDGETS",
        route: "butget-page",
        icon: "DollarSignIcon",
        children: [
          {
            title: "IPD",
            icon: "CodepenIcon",
            route: "bud-ipd-page",
          },
        ],
      },
      {
        title: "Import",
        route: "import-page",
        icon: "ServerIcon",
        children: [
          {
            title: "Statment",
            icon: "CodepenIcon",
            route: "import-statment",
          },
          {
            title: "REP",
            icon: "FileTextIcon",
            route: "import-rep",
          },
        ],
      },
      {
        title: "Backoffice",
        route: "",
        icon: "SlackIcon",
        children: [
          {
            title: "Meetings",
            icon: "MonitorIcon",
            route: "meet-calendar",
          },
          {
            title: "Cars",
            icon: "TruckIcon",
            route: "car-calendar",
          },
        ],
      },
      {
        title: "Users",
        route: "users",
        icon: "UsersIcon",
      },
    ],
    userMenu: [
      {
        title: "Home",
        route: "home",
        icon: "HomeIcon",
      },
      {
        title: "AUDIT-DATA",
        route: "audit-page",
        icon: "PieChartIcon",
        children: [
          {
            title: "16 FILE",
            icon: "CheckCircleIcon",
            route: "audit-page",
          },
          {
            title: "AuthentCode",
            route: "authen-page",
            icon: "KeyIcon",
          },
          {
            title: "IPD",
            icon: "CodepenIcon",
            route: "meet-calendar",
          },
          {
            title: "OPD",
            icon: "FileTextIcon",
            route: 'visit-check',
          },
          {
            title: "PP",
            icon: "FileTextIcon",
            route: "import-rep",
          },
          {
            title: "Error Code",
            icon: "AlertCircleIcon",
            route: "error-page",
          },
        ],
      },
      {
        title: "COVID-19",        
        icon: "ShieldIcon",
        children: [
          {
            title: "HI",
            icon: "PackageIcon",
            route: "covid19-personal-account",
          },
          {
            title: "Ward",
            icon: "PackageIcon",
            route: "covid19-page",
          },
          {
            title: "LAB",
            icon: "ThermometerIcon",
            route: "lab-page",
          },
          {
            title: "Vaccine",
            icon: "ShieldIcon",
            route: "vaccine-page",
          },
        ],
      },

      {
        title: "BUDGETS",
        route: "butget-page",
        icon: "DollarSignIcon",
        children: [
          {
            title: "IPD",
            icon: "CodepenIcon",
            route: "bud-ipd-page",
          },
        ],
      },
      {
        title: "Import",
        route: "import-page",
        icon: "ServerIcon",
        children: [
          {
            title: "Statment",
            icon: "CodepenIcon",
            route: "import-statment",
          },
          {
            title: "REP",
            icon: "FileTextIcon",
            route: "import-rep",
          },
        ],
      },
      {
        title: "Backoffice",
        route: "",
        icon: "SlackIcon",
        children: [
          {
            title: "Meetings",
            icon: "MonitorIcon",
            route: "meet-calendar",
          },
          {
            title: "Cars",
            icon: "TruckIcon",
            route: "car-calendar",
          },
        ],
      },
    ],
    mainMenu: [],
  },
  getters: {},
  mutations: {
    UPDATE_VERTICAL_MENU_COLLAPSED(state, val) {
      state.isVerticalMenuCollapsed = val;
    },
    UPDATE_ROLE_MENU(state, val) {
      if (val === "Admin") {
        state.mainMenu = state.adminMenu;
      } else {
        state.mainMenu = state.userMenu;
      }
    },
  },
  actions: {
    getRole({ commit }) {
      if(JSON.parse(localStorage.getItem("userData"))){
        var role = JSON.parse(localStorage.getItem("userData"));
        commit("UPDATE_ROLE_MENU", role.role);
      }
    },
  },
};
