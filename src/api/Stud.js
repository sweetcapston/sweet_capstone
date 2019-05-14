import axios from "axios";
import {URL} from "../plugins/api.config.js"
const BaseUrl = `http://${URL}:5000/stud`;
const config = { 
                 headers: {'Content-Type' : 'application/json'},
                 withCredentials: true
               }
               
export default {
    classEnter(classCode){
      return axios.post(`${BaseUrl}/enter`,{classCode: classCode}, config);
    },
    classAdd(classCode){
      return axios.get(`${BaseUrl}/${classCode}/classAdd`, config);
    },
    classDelete(classCode){
      return axios.delete(`${BaseUrl}/${classCode}/delete`, config);
    },
    loadQuestion(classCode){
      return axios.post(`${BaseUrl}/${classCode}/question`, config);
    }
};