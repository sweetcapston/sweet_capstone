import axios from "axios";
const BaseUrl = "http://localhost:5000";
const config = { 
                 headers: {'Content-Type' : 'application/json'},
                 withCredentials: true
               }
               
export default {
    classCreate(className){
      return axios.post(`${BaseUrl}/prof/classCreate`,{className:className}, config);
    },
    classDelete(classCode){
      return axios.get(`${BaseUrl}/prof/:${classCode}/delete`, config);
    },
};
