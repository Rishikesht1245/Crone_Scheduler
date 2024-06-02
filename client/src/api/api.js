import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_API;

export const loginAPI = async (formData) =>
  await axios.post(`${backendUrl}login`, formData);
export const registerAPI = async (formData) =>
  await axios.post(`${backendUrl}register`, formData);

export const getSchedulesAPI = async (userId) =>
  await axios.get(`${backendUrl}${userId}/schedules`);
export const addScheduleAPI = async (formData, userId) =>
  await axios.post(`${backendUrl}${userId}/schedules`, formData);
export const updateScheduleAPI = async (formData, userId) =>
  await axios.put(
    `${backendUrl}${userId}/schedules/${formData?._id}`,
    formData
  );
export const deleteScheduleAPI = async (userId, scheduleId) => {
  await axios.delete(`${backendUrl}${userId}/schedules/${scheduleId}`);
};
