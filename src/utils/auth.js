import Cookies from "js-cookie";

const TOKEN_KEY = "auth_token";
const USER_KEY = "username";

export function getToken() {
  return Cookies.get(TOKEN_KEY);
}
export function setToken(token) {
  return Cookies.set(TOKEN_KEY, token, { expires: 1 });
}
export function removeToken() {
  return Cookies.remove(TOKEN_KEY);
}
export function getUser() {
  return Cookies.get(USER_KEY);
}
export function setUser(value) {
  return Cookies.set(USER_KEY, value, { expires: 1 });
}
export function removeUser() {
  return Cookies.remove(USER_KEY);
}
