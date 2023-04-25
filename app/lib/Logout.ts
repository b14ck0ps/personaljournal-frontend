'use client';
function logout() {
    sessionStorage.removeItem('authHeader');
    window.location.href = '/login';
}
export default logout;