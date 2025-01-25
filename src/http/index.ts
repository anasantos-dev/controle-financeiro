import axios from "axios";

const http = axios.create({
  baseURL: "https://projeto-aprofunda-template-1.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default http;