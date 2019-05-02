import axios from "axios";
const BaseUrl = "http://localhost:5000/prof";
const config = { 
                 headers: {'Content-Type' : 'application/json'},
                 withCredentials: true
               }
               
export default {
    classCreate(className){
      return axios.post(`${BaseUrl}/classCreate`,{className: className}, config);
    },
    classDelete(classCode){
      return axios.delete(`${BaseUrl}/${classCode}/delete`, config);
    },
};
