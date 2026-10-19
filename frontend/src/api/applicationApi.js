import axios from "axios";

const apiOrigin = "https://job-application-tracker-rho-seven.vercel.app";

const API = axios.create({
  baseURL: `${apiOrigin}/api/application`,
  withCredentials: true,
});

export const getApplications = (page =1  ,limit = 10) => API.get(`/?page=${page}&limit=${limit}`); 
export const createApplication = (data) => API.post("/create", data);
export const deleteApplication = (id) => API.delete(`/delete/${id}`);
export const updateApplication = (id, data) => API.put(`/update/${id}`, data);

export default API;
