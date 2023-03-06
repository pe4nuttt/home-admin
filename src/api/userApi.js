import request from "@/utils/request.js";

export function getUser(data = {}) {
  return request({
    url: "/User/GetUserInformation",
    method: "get",
    params: data
  });
}

export function updateUser(data) {
  return request({
    url: "/User/UpdateUserInformation",
    method: "post",
    data
  });
}

export function deleteUser(data) {
  return request({
    url: "/User/DeleteUser",
    method: "delete",
    data
  });
}
