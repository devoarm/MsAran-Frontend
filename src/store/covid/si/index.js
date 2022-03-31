import axiosIns from '@/libs/axios'

export default{
    namespaced: true,
    state: {
        totalHiNew:0,
        totalHi:0,
        totalHiSuccess:0,
        totalSiNew:0,
        totalSi:0,
        totalSiSuccess:0,
    },
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
            if (JSON.parse(localStorage.getItem("userData"))) {
            var role = JSON.parse(localStorage.getItem("userData"));
            commit("UPDATE_ROLE_MENU", role.role);
            }
        },
        getTotalSiNew({ commit }) {
            axiosIns.get()
        }
    },
}