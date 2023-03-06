const state = {
  drawer: true,
  isActiveLoading: false,
  gradient: "rgba(0, 0, 0, .7), rgba(0, 0, 0, .7)",
  items: [
    { title: "Dashboard", icon: "mdi-view-dashboard", to: "/" },
    {
      title: "User Manage",
      icon: "mdi-account-multiple-outline",
      items: [
        { title: "Users", to: "/users/user-list" },
        { title: "Verification Account", to: "/users/verification-account" }
      ]
    },
    { title: "Apartments", icon: "mdi-home-outline", to: "/apartments" },
    {
      title: "Indoor Devices",
      icon: "mdi-tablet-cellphone",
      to: "/indoor-devices/list"
    }
  ]
};

const getters = {
  getDrawer: state => state.drawer
};

const mutations = {
  setDrawer(state, data) {
    state.drawer = data;
  },
  SET_LOADING(state, isActiveLoading) {
    state.isActiveLoading = isActiveLoading;
  }
};

const actions = {
  toggleDrawer({ commit }, value) {
    commit("setDrawer", value);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
