import axios from "axios";
import {URL} from "../plugins/api.config.js"
const BaseUrl = `${URL}:5000/prof`;
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
    surveyCreate(survey){
      return axios.post(`${BaseUrl}/${survey.classCode}/surveyAdd`, {survey:survey}, config);
    },
    surveyActive(survey){
      return axios.put(`${BaseUrl}/${survey.classCode}/survey/active`, {SID:survey.SID, active:survey.active}, config);
    },
    loadSurvey(classCode){
      return axios.post(`${BaseUrl}/${classCode}/survey`, config);
    },
    quizCreate(quiz){
      return axios.post(`${BaseUrl}/${quiz.classCode}/quizAdd`, {quiz:quiz}, config);
    },
    quizActive(quiz){
      return axios.put(`${BaseUrl}/${quiz.classCode}/quiz/active`, {SID:quiz.SID, active:quiz.active}, config);
    },
    loadQuiz(classCode){
      return axios.post(`${BaseUrl}/${classCode}/quiz`, config);
    }
};
