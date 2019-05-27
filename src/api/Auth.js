/* eslint-disable */
import axios from "axios";
import {URL} from "../plugins/api.config.js"
const BaseUrl = `${URL}:5000/users`;
const config = { 
                  headers: {'Content-Type' : 'application/json'},
                  withCredentials: true
                }

export default {
  auth() {
    return axios.get(`${BaseUrl}`, config);
  },
  login(params) {
    return axios.post(`${BaseUrl}/login`, params, config);
  },
  logout(){
    return axios.get(`${BaseUrl}/logout`, config)
  },
  SignUp(params) {
    return axios.post(`${BaseUrl}/signup`, params);
  },
  duplicate(params) {
    return axios.get(`${BaseUrl}/duplicate/${params}`);
  }
};
