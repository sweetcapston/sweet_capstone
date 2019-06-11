/* eslint-disable */
import axios from "axios";
import {URL} from "../plugins/api.config.js"
const BaseUrl = `${URL}:5000/admin`;
const config = { 
                  headers: {'Content-Type' : 'application/json'},
                  withCredentials: true
                }

export default {
  getBlackData() {
    return axios.get(`${BaseUrl}`, config);
  }
};
