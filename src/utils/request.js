import axios from "axios";

const service = axios.create({
  baseURL: process.env.VUE_APP_HOST + process.env.VUE_APP_BASE_API,
  // baseURL: "http://65.108.79.164:7200/api/services/app",
  timeout: 30000
});

export default service;
