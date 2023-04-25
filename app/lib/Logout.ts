'use client';
function logout() {
    sessionStorage.removeItem('authHeader');
    sessionStorage.removeItem('username');
    window.location.href = '/login';
}
export default logout;