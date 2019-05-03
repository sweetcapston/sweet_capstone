import axios from "axios";
const BaseUrl = "http://localhost:5000/stud";
const config = { 
                 headers: {'Content-Type' : 'application/json'},
                 withCredentials: true
               }
               
export default {
    classEnter(classCode){
      return axios.post(`${BaseUrl}/enter`,{classCode: classCode}, config);
    },
    classAdd(classCode){
      alert(classCode);
      return axios.get(`${BaseUrl}/${classCode}/classAdd`, config);
    },
    classDelete(classCode){
      return axios.delete(`${BaseUrl}/${classCode}/delete`, config);
    }
};
