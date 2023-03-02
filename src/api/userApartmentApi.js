import request from "@/utils/request.js";

export function getUserApartList(data) {
  return {
    url: "/UserApartment/AdminGetUserApartmentList",
    methods: "get",
    params: data
  };
}

export function getApartsOfUser(data) {
  return {
    url: "/UserApartment/UserGetApartments",
    methods: "get",
    params: data
  };
}

export function getAnApartOfUser(data) {
  return {
    url: "/UserApartment/UserGetAnApartment",
    methods: "get",
    params: data
  };
}

export function deleteUserApartment(data) {
  return {
    url: "/UserApartment/DeleteUserApartment",
    methods: "get",
    params: data
  };
}
