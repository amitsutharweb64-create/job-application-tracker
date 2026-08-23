import axios from "axios";

const API = axios.create({
  baseURL: "/api/application",
});

export const getApplications = () => API.get("/"); 
export const createApplication = (data) => API.post("/create", data);
export const deleteApplication = (id) => API.delete(`/delete/${id}`);
export const updateApplication = (id, data) => API.put(`/update/${id}`, data);

export default API;



