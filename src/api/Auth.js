import axios from "axios";
const BaseUrl = "http://localhost:5000";
export default {
  auth(token) {
    return axios.get(`${BaseUrl}/users`, {
      headers:{
        'Authorization': token
      }
    });
  },
  login(params) {
    return axios.post(`${BaseUrl}/users/login`, params);
  },
  SingUp(params) {
    return axios.post(`${BaseUrl}/users/signup`, params);
  },
  duplicate(params) {
    return axios.get(`${BaseUrl}/users/duplicate/${params}`);
  }
};
