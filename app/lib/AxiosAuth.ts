import axios from "axios";

const username = 'johndoe';
const password = 'mypassword';
const authHeader = 'Basic ' + btoa(username + ':' + password);

export const axiosWithAuth = axios.create({
    baseURL: 'http://localhost:8081/api',
    headers: {
        'Authorization': authHeader
    }
});