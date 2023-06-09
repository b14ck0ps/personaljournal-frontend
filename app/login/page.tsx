"use client"
import React, { useState } from 'react'
import { axiosForGuest } from '../lib/AxiosGuest'

export default function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")

    const [isLogged, setIsLogged] = useState(true)

    useState(() => {
        // Check if the user is already logged in
        if (sessionStorage.getItem('authHeader')) {
            window.location.href = '/'; // Redirect to home page
        }
        else {
            setIsLogged(false);
        }
    })

    const login = (e: any) => {
        e.preventDefault();
        axiosForGuest.post('/login', {
            username: username,
            password: password
        }).then(res => {
            if (res.status === 200) {
                const authHeader = 'Basic ' + btoa(username + ':' + password);
                // Save the authentication header in local storage
                sessionStorage.setItem('authHeader', authHeader);
                sessionStorage.setItem('username', username);

                window.location.href = '/'; // Redirect to home page
            } else {
                setMessage("Invalid username or password");
            }
        }).catch((err) => {
            setMessage("Invalid username or password");
        });
    }

    return (
        isLogged ? null : (
            <div>
                <div className="flex items-center justify-center min-h-screen bg-gray-100">
                    <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
                        <h3 className="text-2xl font-bold text-center">Login to your account</h3>
                        <form onSubmit={login} method='POST' className="mt-6">
                            {message && <div className="text-red-500">{message}</div>}
                            <div className="mt-4">
                                <div>
                                    <label className="block" htmlFor="Username">Username</label>
                                    <input type="text" placeholder="Username" name='username' onChange={(e: any) => { setUsername(e.target.value) }}
                                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                                </div>
                                <div className="mt-4">
                                    <label className="block">Password</label>
                                    <input type="password" placeholder="Password" name='password' onChange={(e: any) => { setPassword(e.target.value) }}
                                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                                </div>
                                <div className="flex items-baseline justify-between">
                                    <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Login</button>
                                    <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
                                </div>
                            </div>
                        </form >
                    </div>
                </div>
            </div>
        )
    )
}
