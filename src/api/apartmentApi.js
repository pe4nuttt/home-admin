import request from "@/utils/request.js";

export function getApartments(data = {}) {
  return request({
    url: "/Apartment/GetApartments",
    method: "get",
    params: data
  });
}

export function createOrUpdateApartment(data) {
  return request({
    url: "/Apartment/CreateOrUpdateApartment",
    method: "post",
    data
  });
}

export function deleteApartment(data) {
  return request({
    url: "/Apartment/CreateOrUpdateApartment",
    method: "delete",
    data
  });
}
