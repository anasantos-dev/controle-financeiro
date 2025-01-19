import axios from "axios";

const http = axios.create({
  baseURL: "https://back-aprofunda-chat-despesa.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default http;