import axios from "axios";
const BaseUrl = "http://localhost:5000";
export default {
  login(params) {
    return axios.post(`${BaseUrl}/users/login`, params);
  },
  SingUp(params) {
    return axios.post(`${BaseUrl}/users/signup`, params);
  },
  duplicate(params) {
    return axios.post(`${BaseUrl}/users/duplicate`, params);
  }
};
