import {
  getToken,
  setToken,
  removeToken,
  setUser,
  removeUser
} from "@/utils/auth";

const state = {
  token: "",
  username: "",
  role: ""
};

const getters = {
  getToken: state => state.token
};

const mutations = {
  SET_TOKEN: (state, data) => {
    state.token = data;
  },
  DELETE_TOKEN: state => {
    state.token = "";
  },
  SET_USERNAME: (state, data) => {
    state.username = data;
  },
  DELETE_USERNAME: state => {
    state.username = "";
  }
};

const actions = {
  setToken({ commit }, value) {
    commit("SET_TOKEN", value);
    setToken(value);
  },
  deleteToken({ commit }, value) {
    commit("DELETE_TOKEN");
    removeToken();
  },
  login({ commit }, value) {
    commit("SET_TOKEN", value.token);
    commit("SET_USERNAME", value.userName);
    setToken(value.token);
    setUser(value.userName);
  },
  logout({ commit }) {
    commit("DELETE_TOKEN");
    commit("DELETE_USERNAME");
    removeToken();
    removeUser();
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
