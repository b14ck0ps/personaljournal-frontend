'use client';
import { useEffect, useState } from "react";
import axiosWithAuth from "@/app/lib/AxiosAuth";
import { Props } from "@/app/Types";

const JournalEntryField = ({ params }: Props) => {
    const id = params.id;
    const [userId, setUserId] = useState<number | null>(null);

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    useEffect(() => {
        const username = sessionStorage.getItem("username");
        if (!username) {
            window.location.href = "/login";
            return;
        }
        axiosWithAuth
            .get(`/user/${username}`)
            .then((response) => {
                setUserId(response.data.id);
            })
            .catch((error) => {
                console.error(error);
            });

        axiosWithAuth
            .get(`/journalEntry/${id}`)
            .then((response) => {
                setTitle(response.data.title);
                setBody(response.data.body);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [id]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        axiosWithAuth.put(`/journalEntry/`, {
            id: id,
            title: title,
            body: body,
            user: { id: userId }
        });

        window.location.href = "/profile";
    };

    const handleDelete = () => {
        const confirmed = window.confirm("Are you sure you want to delete this journal entry?");

        if (confirmed) {
            axiosWithAuth.delete(`/journalEntry/${id}`);
            window.location.href = "/profile";
        }
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
            <div className="flex justify-between">
                <button type="submit" className="px-4 py-2 text-white bg-green-500 rounded w-52 hover:bg-green-600">
                    Update
                </button>
                <button onClick={handleDelete} className="w-32 py-2 mt-4 text-white bg-red-500 rounded hover:bg-red-600">
                    Delete
                </button>
            </div>
        </form>
    );
};

export default JournalEntryField;
