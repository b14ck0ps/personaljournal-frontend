import axios from "axios";

export const axiosForGuest = axios.create({
    baseURL: 'http://localhost:8081/guest'
});