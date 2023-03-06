import request from "@/utils/request.js";

export function login(data) {
  return request({
    url: "/Account/Login",
    method: "post",
    data
  });
}

export function register(data) {
  return request({
    url: "/Account/Register",
    method: "post",
    data
  });
}
