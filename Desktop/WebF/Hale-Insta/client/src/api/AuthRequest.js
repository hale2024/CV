import axios from "axios";

// everytime we make a request it will call the baseURL
// this is the location of our database
const API = axios.create({baseURL: "http://localhost:5000"});

// http://localhost:5000/auth/login
export const logIn = (formData) => API.post('/auth/login', formData);

export const signUp = (formData) => API.post('/auth/register', formData);