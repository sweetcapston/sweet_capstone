/* eslint-disable */
import axios from "axios";
import {URL} from "../plugins/api.config.js"
const BaseUrl = `${URL}:5000/admin`;
const config = { 
                  headers: {'Content-Type' : 'application/json'},
                  withCredentials: true
                }
export default {
  loadBlackList() {
    return axios.get(`${BaseUrl}`, config);
  },
  acceptBlack(userID, classCode) {
    alert(userID);
    return axios.post(`${BaseUrl}/userBlock`, {userID: userID, classCode: classCode}, config);
  },
  denyBlack(userID, classCode) {
    return axios.post(`${BaseUrl}/userRelease`, {userID: userID, classCode: classCode},config);
  },
  deleteBlack(userID, classCode) {
    return axios.post(`${BaseUrl}/userDelete`, {userID: userID, classCode: classCode},config);
  }
};
