'use client'
import { useState, useEffect } from "react";
import axiosWithAuth from "@/app/lib/AxiosAuth";
import { UserProfile } from "@/app/Types";

export default function EditProfilePage() {
    const [id, setId] = useState();
    const [username, setUsername] = useState("");
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [nameError, setNameError] = useState("");
    const [addressError, setAddressError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    useEffect(() => {
        const username = sessionStorage.getItem("username");

        if (!username) {
            window.location.href = "/login";
            return;
        }

        axiosWithAuth
            .get(`/user/${username}`)
            .then((response) => {
                setUserProfile(response.data);
                setName(response.data.name);
                setAddress(response.data.address);
                setEmail(response.data.email);
                setImage(response.data.image);
                setId(response.data.id);
                setPassword(response.data.password);
                setUsername(response.data.username);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        let validationError = false;

        // Validate name field
        if (!name) {
            setNameError("Name field is required.");
            validationError = true;
        } else {
            setNameError("");
        }

        // Validate address field
        if (!address) {
            setAddressError("Address field is required.");
            validationError = true;
        } else {
            setAddressError("");
        }

        // Validate email field
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            setEmailError("Email field is required.");
            validationError = true;
        } else if (!emailRegex.test(email)) {
            setEmailError("Please enter a valid email address.");
            validationError = true;
        } else {
            setEmailError("");
        }

        // Validate password field
        if (!password) {
            setPasswordError("Password field is required.");
            validationError = true;
        } else if (password.length < 8) {
            setPasswordError("Password must be at least 8 characters long.");
            validationError = true;
        } else {
            setPasswordError("");
        }

        // Validate confirm password field
        if (!confirmPassword) {
            setConfirmPasswordError("Confirm Password field is required.");
            validationError = true;
        } else if (password !== confirmPassword) {
            setConfirmPasswordError("Passwords do not match.");
            validationError = true;
        } else {
            setConfirmPasswordError("");
        }

        if (validationError) {
            return;
        }

        const username = sessionStorage.getItem("username");

        if (!username) {
            // handle missing username
            return;
        }

        axiosWithAuth
            .put(`/user/`, { name, address, email, image, id, password, username })
            .then(() => {
                window.location.href = "/profile";
            })
            .catch((error) => {
                console.error(error);
            });
        const authHeader = 'Basic ' + btoa(username + ':' + password);
        sessionStorage.setItem('authHeader', authHeader);
    }


    if (!userProfile) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col items-center mt-5">
            <div className="w-24 h-24 overflow-hidden rounded-full">
                <img src={image} alt="dp" className="object-cover object-center w-full h-full" />
            </div>
            <form onSubmit={handleSubmit} className="w-64">
                <label htmlFor="name" className="block mb-2 font-bold text-gray-700">
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
                {nameError && <p className="text-red-500">{nameError}</p>}

                <label htmlFor="address" className="block mt-4 mb-2 font-bold text-gray-700">
                    Address
                </label>
                <input
                    type="text"
                    id="address"
                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                />
                {addressError && <p className="text-red-500">{addressError}</p>}

                <label htmlFor="email" className="block mt-4 mb-2 font-bold text-gray-700">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                {emailError && <p className="text-red-500">{emailError}</p>}

                <label htmlFor="image" className="block mt-4 mb-2 font-bold text-gray-700">

                    Image URL
                </label>
                <input
                    type="text"
                    id="image"
                    value={image}
                    onChange={(event) => setImage(event.target.value)}
                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                />

                <label htmlFor="password" className="block mt-4 mb-2 font-bold text-gray-700">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                {passwordError && <p className="text-red-500">{passwordError}</p>}
                <label
                    htmlFor="confirmPassword"
                    className="block mt-4 mb-2 font-bold text-gray-700"
                >
                    Confirm Password
                </label>
                <input

                    type="password"
                    id="confirmPassword"
                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                />
                {confirmPasswordError && (<p className="text-red-500">{confirmPasswordError}</p>)}

                <button
                    type="submit"
                    className="px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                >
                    Save
                </button>
            </form>
        </div>
    );
}
