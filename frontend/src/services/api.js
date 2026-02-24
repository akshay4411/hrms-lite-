import axios from "axios";

const api = axios.create({
  baseURL: "https://hrms-lite-1-k9gr.onrender.com/"
});

export default api;
