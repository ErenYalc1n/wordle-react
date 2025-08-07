import axios from "axios";

const api = axios.create({
  baseURL: "https://wordle-webapi-production.onrender.com",
});

export default api;
