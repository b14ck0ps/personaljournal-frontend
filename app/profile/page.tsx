'use client'
import { useState, useEffect } from "react";
import axiosWithAuth from "../lib/AxiosAuth";
import { UserProfile } from "../Types";
import PersonalJournalEntries from "./PersonalJournal";

export default function ProfilePage() {
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

    useEffect(() => {
        const username = sessionStorage.getItem("username");
        if (!username) {
            // handle missing username
            return;
        }

        axiosWithAuth
            .get(`/user/${username}`)
            .then((response: any) => {
                setUserProfile(response.data);
            })
            .catch((error: any) => {
                console.error(error);
            });
    }, []);

    if (!userProfile) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="flex flex-col items-center mt-5">
                <img src={userProfile.image} alt="Profile" className="object-cover w-24 h-24 rounded-full" />
                <h1 className="text-2xl font-bold">{userProfile.name}</h1>
                <p className="text-gray-500">{userProfile.address}</p>
                <p className="text-gray-500">{userProfile.email}</p>
                <div className="flex gap-5 mt-5">
                    <a href="/profile/edit" className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">Edit</a>
                </div>
            </div>
            <div className="w-3/4 m-auto">
                <PersonalJournalEntries />
            </div>
        </div>
    );
}
