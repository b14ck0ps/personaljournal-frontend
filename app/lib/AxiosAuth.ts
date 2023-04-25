import axios from "axios";

let authHeader: string = '';

if (typeof sessionStorage !== 'undefined' && authHeader !== null) {
    authHeader = sessionStorage.getItem('authHeader') || '';
}

const axiosWithAuth = axios.create({
    baseURL: 'http://localhost:8081/api',
    headers: {
        'Authorization': authHeader
    }
});

export default axiosWithAuth;