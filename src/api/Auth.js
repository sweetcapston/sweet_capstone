/* eslint-disable */
import axios from "axios";
import {URL} from "../plugins/api.config.js"
const BaseUrl = `http://${URL}:5000`;
const config = { 
                 headers: {'Content-Type' : 'application/json'},
                 withCredentials: true
               }
export default {
  auth() {
    return axios.get(`${BaseUrl}/users`, config);
  },
  login(params) {
    return axios.post(`${BaseUrl}/users/login`, params, config);
  },
  logout(){
    return axios.get(`${BaseUrl}/users/logout`, config)
  },
  SignUp(params) {
    return axios.post(`${BaseUrl}/users/signup`, params);
  },
  duplicate(params) {
    return axios.get(`${BaseUrl}/users/duplicate/${params}`);
  }
};
