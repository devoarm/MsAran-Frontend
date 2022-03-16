import axiosIns from '../../libs/axios'
export default {
  namespaced: true,
  state: {
    op_tmbpart: [],
    op_amppart: [],
    op_chwpart: [],
  },
  getters: {},
  mutations: {
    SET_USER(state, data) {
      state.users = data;
    },
  },
  actions: {
    
  },
};
