import api from '../api';

const state = {
  me: null,
  isLogin: false,
};

const getters = {};

const mutations = {
  setLoggedIn(state, payload) {
    state.isLogin = true;
    state.me = payload;
  },
  setNotLoggedIn(state) {
    state.isLogin = false;
    state.me = null;
  },
};

const actions = {
  checkLoggedIn: async ({ commit }) => {
    try {
      const { data } = await api.Users.getMe();
      commit('setLoggedIn', data);
    } catch (error) {
      commit('setNotLoggedIn');
    }
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
