import axios from "axios";

const baseUrl = "http://10.10.115.69:7000/api";

export const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiWithFile = axios.create({
  baseURL: baseUrl,
});
