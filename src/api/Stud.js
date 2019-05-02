import axios from "axios";
const BaseUrl = "http://localhost:5000";
const config = { 
                 headers: {'Content-Type' : 'application/json'},
                 withCredentials: true
               }
               
export default {
    classEnter(classCode){
      return axios.post(`${BaseUrl}/stud/enter`,{classCode: classCode}, config);
    },
    classAdd(classCode){
      alert(classCode);
      return axios.get(`${BaseUrl}/stud/${classCode}/classAdd`, config);
    },
};
