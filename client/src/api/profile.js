import axios from "./axios.js"

export const getProfileRequest = () => axios.get(`/profile`)
export const changePasswordRequest = (data) => axios.put(`/password`, data);
export const changeUsernameRequest = (data) => axios.put("/username", data);