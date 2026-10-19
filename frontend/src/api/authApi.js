import axios from "axios";

const apiOrigin = "https://job-application-tracker-rho-seven.vercel.app";

const API = axios.create({
  baseURL: `${apiOrigin}/api/auth`,
  withCredentials: true,
});

export const signUp = (data) => API.post("/signup", data);
export const signIn = (data) => API.post("/login", data);
export const getCurrentUser = () => API.get("/me");
export const updateProfile = (data) => API.patch("/profile", data);
export const signOut = () => API.post("/logout");

export default API;
