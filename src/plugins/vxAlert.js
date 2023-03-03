let vxAlertPlugin = {};

vxAlertPlugin.install = function(Vue) {
  function alert(type, message, timeout = 3000, showClose = true) {}

  Vue.prototype.$vxAlert = alert;
};
