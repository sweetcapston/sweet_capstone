import axios from "axios";
import { URL } from "../plugins/api.config.js";
const BaseUrl = `${URL}:5000/stud`;
const config = {
  headers: { "Content-Type": "application/json" },
  withCredentials: true
};
export default {
  classEnter(classCode) {
    return axios.post(`${BaseUrl}/enter`, { classCode: classCode }, config);
  },
  classAdd(classCode) {
    return axios.get(`${BaseUrl}/${classCode}/classAdd`, config);
  },
  classDelete(classCode) {
    return axios.delete(`${BaseUrl}/${classCode}/delete`, config);
  },
  classHome(classCode,userID){
    return axios.post(`${BaseUrl}/${classCode}/home`,{userID:userID},config)
  },
  loadQuestion(classCode) {
    return axios.post(`${BaseUrl}/${classCode}/question`, config);
  },
  loadSurvey(classCode, userID) {
    return axios.post(
      `${BaseUrl}/${classCode}/survey`,
      { userID: userID },
      config
    );
  },
  answerSurvey(classCode, answer_S) {
    return axios.post(
      `${BaseUrl}/${classCode}/surveyAnswer_S`,
      { answer_S: answer_S },
      config
    );
  },
  loadQuiz(classCode, userID) {
    return axios.post(
      `${BaseUrl}/${classCode}/quiz`,
      { userID: userID },
      config
    );
  },
  answerQuiz(classCode, answer_Q) {
    return axios.post(
      `${BaseUrl}/${classCode}/quizAnswer_Q`,
      { answer_Q: answer_Q },
      config
    );
  },
  loadStatistics(classCode, studentID) {
    return axios.post(
      `${BaseUrl}/${classCode}/statistics`,
      { studentID: studentID },
      config
    );
  },
  loadStatisticsQuiz(classCode, QID) {
    return axios.post(
      `${BaseUrl}/${classCode}/statistics/quiz`,
      { QID: QID },
      config
    );
  }
};
