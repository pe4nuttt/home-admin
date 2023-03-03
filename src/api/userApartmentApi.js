import request from "@/utils/request.js";

export function getUserApartList(data) {
  return request({
    url: "/UserApartment/AdminGetUserApartmentList",
    methods: "get",
    params: data
  });
}

export function getApartsOfUser(data) {
  return request({
    url: "/UserApartment/UserGetApartments",
    methods: "get",
    params: data
  });
}

export function getAnApartOfUser(data) {
  return request({
    url: "/UserApartment/UserGetAnApartment",
    methods: "get",
    params: data
  });
}

export function deleteUserApartment(data) {
  return request({
    url: "/UserApartment/DeleteUserApartment",
    methods: "get",
    params: data
  });
}
