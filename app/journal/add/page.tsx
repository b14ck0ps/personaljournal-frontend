'use client';
import { useEffect, useState } from "react";
import axiosWithAuth from "@/app/lib/AxiosAuth";

const JournalEntryField = () => {
    const [userId, setUserId] = useState<number | null>(null);

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    useEffect(() => {
        const username = sessionStorage.getItem("username");
        axiosWithAuth
            .get(`/user/${username}`)
            .then((response) => {
                setUserId(response.data.id);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);



    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        axiosWithAuth.post("/journalEntry", {
            title: title,
            body: body,
            user: { id: userId }
        });

        window.location.href = "/";
    };

    return (
        <form className="flex flex-col w-1/2 mx-auto mt-5"
            onSubmit={handleSubmit}>
            <label htmlFor="title">Title:</label>
            <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="p-1 my-2 border rounded-md"
            />

            <label htmlFor="body">Body:</label>
            <textarea
                id="body"
                name="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="p-1 my-2 border rounded-md"
            ></textarea>

            <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded w-52">
                Post
            </button>
        </form>
    );
};

export default JournalEntryField;