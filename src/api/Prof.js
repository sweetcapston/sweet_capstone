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
    classHome(classCode,userID){
      return axios.post(`${BaseUrl}/${classCode}/home`,{userID:userID},config)
    },
    classEdit(classCode,userID,className){
      return axios.post(`${BaseUrl}/${classCode}/edit`, 
      {
        userID: userID,
        className: className
      }
      , config);
    },
    alarmActive(classCode,alarm){
        return axios.put(`${BaseUrl}/${classCode}/alarm`, {alarm: alarm}, config);
    },
    blackListAdd(classCode,blackList){
        return axios.post(`${BaseUrl}/${classCode}/black`,{blackList:blackList}, config);
    },
    surveyCreate(survey){
      return axios.post(`${BaseUrl}/${survey.classCode}/surveyAdd`, {survey:survey}, config);
    },
    surveyEdit(survey){
      return axios.post(`${BaseUrl}/${survey.classCode}/surveyEdit`, survey, config);
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
    quizEdit(quiz){
      return axios.post(`${BaseUrl}/${quiz.classCode}/quizEdit`, quiz, config);
    },
    loadQuiz(classCode){
      return axios.post(`${BaseUrl}/${classCode}/quiz`, config);
    },
    loadStatistics(classCode) {
      return axios.post(`${BaseUrl}/${classCode}/statistics`, config);
    },
    loadStatisticsQuiz(classCode, QID) {
      return axios.post(
        `${BaseUrl}/${classCode}/statistics/quiz`,
        { QID: QID },
        config
      );
    },
    getClassData(classCode){
        return axios.get(`${BaseUrl}/${classCode}/class`, config);
    }
};
