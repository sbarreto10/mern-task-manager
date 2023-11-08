import axios from "./axios.js"

export const getProfileRequest = () => axios.get(`/profile`)
export const changePasswordRequest = (id, password, newPassword) => axios.update(`/password`, {id, password, newPassword});
export const changeUsernameRequest = (id, newUsername) => axios.update("/username", {id, newUsername});