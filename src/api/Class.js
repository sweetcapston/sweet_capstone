import axios from "axios";
const BaseUrl = "http://localhost:5000/class";
const config = { 
                 headers: {'Content-Type' : 'application/json'},
                 withCredentials: true
               }
export default {
    getclassList(){
        return axios.get(`${BaseUrl}/getclasscodeList`, config);
    },
};
