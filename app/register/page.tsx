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

    const [confirmPassword, setConfirmPassword] = useState("");

    const [usernameError, setUsernameError] = useState("");
    const [nameError, setNameError] = useState("");
    const [addressError, setAddressError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [usernameExistError, setUsernameExistError] = useState("");

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();

        let validationError = false;

        // Validate name field
        if (!formData.name) {
            setNameError("Name field is required.");
            validationError = true;
        } else {
            setNameError("");
        }

        // validate username field
        if (!formData.username) {
            setUsernameError("Username field is required.");
            validationError = true;
        } else {
            setUsernameError("");
        }

        // Validate address field
        if (!formData.address) {
            setAddressError("Address field is required.");
            validationError = true;
        } else {
            setAddressError("");
        }

        // Validate email field
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) {
            setEmailError("Email field is required.");
            validationError = true;
        } else if (!emailRegex.test(formData.email)) {
            setEmailError("Please enter a valid email address.");
            validationError = true;
        } else {
            setEmailError("");
        }

        // Validate password field
        if (!formData.password) {
            setPasswordError("Password field is required.");
            validationError = true;
        } else if (formData.password.length < 8) {
            setPasswordError("Password must be at least 8 characters long.");
            validationError = true;
        } else {
            setPasswordError("");
        }

        // Validate confirm password field
        if (!confirmPassword) {
            setConfirmPasswordError("Confirm Password field is required.");
            validationError = true;
        } else if (formData.password !== confirmPassword) {
            setConfirmPasswordError("Passwords do not match.");
            validationError = true;
        } else {
            setConfirmPasswordError("");
        }

        if (validationError) {
            return;
        }

        axiosForGuest
            .post('/register', formData)
            .then((response) => {
                window.location.href = '/login';
            })
            .catch((error) => {
                setUsernameExistError("username already exist");
            });
    };

    return (
        <div className="flex items-center justify-center mt-5">
            <form onSubmit={handleSubmit} className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
                <h2 className="mb-6 text-2xl font-bold">Register</h2>
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
                    {usernameError && <p className="text-xs italic text-red-500">{usernameError}</p>}
                    {usernameExistError && <p className="text-xs italic text-red-500">{usernameExistError}</p>}
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
                    {nameError && <p className="text-xs italic text-red-500">{nameError}</p>}
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
                    {addressError && <p className="text-xs italic text-red-500">{addressError}</p>}
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
                    {emailError && <p className="text-xs italic text-red-500">{emailError}</p>}
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-bold text-gray-700" htmlFor="image">
                        Image URL
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
                    {passwordError && <p className="text-xs italic text-red-500">{passwordError}</p>}
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-bold text-gray-700" htmlFor="confirmPassword">
                        Confirm Password
                    </label>
                    <input
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                    {confirmPasswordError && <p className="text-xs italic text-red-500">{confirmPasswordError}</p>}
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
