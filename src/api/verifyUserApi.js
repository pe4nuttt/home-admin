import request from "@/utils/request.js";

export function getVerifyUser(data = {}) {
  return request({
    url: "VerifyUserForm/AdminGetVerifyUserForms",
    method: "get",
    params: data
  });
}

export function acceptVerify(data) {
  return request({
    url: "VerifyUserForm/AdminAcceptVerifyForm",
    method: "post",
    data
  });
}

export function denyVerify(data) {
  return request({
    url: "VerifyUserForm/AdminDenyVerifyForm",
    method: "post",
    data
  });
}

export function deleteVerifyUser(data = {}) {
  return request({
    url: `VerifyUserForm/DeleteVerifyUserForm?id=${data.id}`,
    method: "delete"
  });
}
