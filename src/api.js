import axios from "axios";

export default axios.create({
  baseURL: "https://hrms-backend-l5xj.onrender.com/api/"
//   baseURL: "http://127.0.0.1:8000/api/"
});