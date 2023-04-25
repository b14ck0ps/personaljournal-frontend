'use client'
import { useState } from 'react';
import { axiosForGuest } from '../lib/AxiosGuest';

export default function Register() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        name: '',
        address: '',
        email: '',
        image: ''
    });
    const [message, setMessage] = useState('');

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        axiosForGuest
            .post('/register', formData)
            .then((response) => {
                window.location.href = '/login';
            })
            .catch((error) => {
                setMessage('Registration failed. Please try again.');
            });
    };

    return (
        <div className="flex items-center justify-center mt-5">
            <form onSubmit={handleSubmit} className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
                <h2 className="mb-6 text-2xl font-bold">Register</h2>
                {message && <p className="mb-4 text-red-500">{message}</p>}
                <div className="mb-4">
                    <label className="block mb-2 font-bold text-gray-700" htmlFor="username">
                        Username
                    </label>
                    <input
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="username"
                        name="username"
                        type="text"
                        value={formData.username}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-bold text-gray-700" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-bold text-gray-700" htmlFor="name">
                        Name
                    </label>
                    <input
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-bold text-gray-700" htmlFor="address">
                        Address
                    </label>
                    <input
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="address"
                        name="address"
                        type="text"
                        value={formData.address}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-bold text-gray-700" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="email"
                        name="email"
                        type="text"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-bold text-gray-700" htmlFor="image">
                        Image
                    </label>
                    <input
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="image"
                        name="image"
                        type="text"
                        value={formData.image}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
}
