import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_API;

export const loginAPI = async (formData) =>
  await axios.post(`${backendUrl}login`, formData);
export const registerAPI = async (formData) =>
  await axios.post(`${backendUrl}register`, formData);
