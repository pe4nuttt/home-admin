import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import store from "./store";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import "./plugins";

Vue.config.productionTip = false;
Vue.use(Toast);

new Vue({
  router,
  vuetify,
  store,
  Toast,
  render: h => h(App)
}).$mount("#app");
