import axios from "axios";
import {URL} from "../plugins/api.config.js"
const BaseUrl = `http://${URL}:5000/class`;
const config = { 
                 headers: {'Content-Type' : 'application/json'},
                 withCredentials: true
               }
export default {
    getclassList(){
        return axios.get(`${BaseUrl}/getclasscodeList`, config);
    },
};
