import axiosIns from '../../libs/axios'
export default {
  namespaced: true,
  state: {
    users: [],
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
