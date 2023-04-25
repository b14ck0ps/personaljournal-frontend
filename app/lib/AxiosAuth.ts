import axios from "axios";

let authHeader = '';

if (typeof localStorage !== 'undefined') {
    authHeader = localStorage.getItem('authHeader');
}

export const axiosWithAuth = axios.create({
    baseURL: 'http://localhost:8081/api',
    headers: {
        'Authorization': authHeader
    }
});
