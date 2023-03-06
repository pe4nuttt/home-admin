import request from "@/utils/request.js";

export function getUserApartList(data) {
  return request({
    url: "/UserApartment/AdminGetUserApartmentList",
    method: "get",
    params: data
  });
}

export function getApartsOfUser(data) {
  return request({
    url: "/UserApartment/UserGetApartments",
    method: "get",
    params: data
  });
}

export function getAnApartOfUser(data) {
  return request({
    url: "/UserApartment/UserGetAnApartment",
    method: "get",
    params: data
  });
}

export function deleteUserApartment(data) {
  return request({
    url: "/UserApartment/DeleteUserApartment",
    method: "delete",
    params: data
  });
}
