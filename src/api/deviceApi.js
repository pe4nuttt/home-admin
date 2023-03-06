import request from "@/utils/request.js";

export function GetIndoorDevices(data = {}) {
  return request({
    url: "/IndoorDevice/GetIndoorDevices",
    method: "get",
    params: data
  });
}

export function CreateIndoorDevice(data) {
  return request({
    url: "/IndoorDevice/CreateOrUpdateIndoorDevice",
    method: "post",
    data
  });
}

export function UpdateIndoorDevice(data) {
  return request({
    url: "/IndoorDevice/CreateOrUpdateIndoorDevice",
    method: "post",
    data
  });
}

export function DeleteIndoorDevice(data) {
  return request({
    url: `/IndoorDevice/DeleteIndoorDevice?id=${data.id}`,
    method: "delete"
  });
}
