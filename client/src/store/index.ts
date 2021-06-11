import { createStore } from 'vuex';
import api from '../api';

export default createStore({
  state: {
    me: null,
    isLogin: false,
  },
  mutations: {
    setLoggedIn(state, payload) {
      state.isLogin = true;
      state.me = payload;
    },
    setNotLoggedIn(state) {
      state.isLogin = false;
      state.me = null;
    },
  },
  actions: {
    async checkLoggedIn({ commit }) {
      try {
        const { data } = await api.Users.getMe();
        commit('setLoggedIn', data);
      } catch (error) {
        commit('setNotLoggedIn');
      }
    },
    async logout({ commit }) {
      await api.Auth.logout();
      commit('setNotLoggedIn');
    },
  },
  modules: {
  },
});
