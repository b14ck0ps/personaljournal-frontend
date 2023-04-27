'use client';
import { useEffect, useState } from "react";
import axiosWithAuth from "@/app/lib/AxiosAuth";

interface Tag {
    id: number;
    name: string;
}

const JournalEntryField = () => {
    const [userId, setUserId] = useState<number | null>(null);
    const [tags, setTags] = useState<Tag[]>([]);
    const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
    const username = sessionStorage.getItem("username");

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    useEffect(() => {
        axiosWithAuth
            .get(`/user/${username}`)
            .then((response) => {
                setUserId(response.data.id);
            })
            .catch((error) => {
                console.error(error);
            });

        axiosWithAuth
            .get("/tags")
            .then((response) => {
                setTags(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        axiosWithAuth.post("/journalEntry", {
            username: username,
            title: title,
            body: body,
            tagId: selectedTag?.id ?? 1,
        });

        window.location.href = "/";
    }

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

            <label htmlFor="tag">Tag:</label>
            <select
                id="tag"
                name="tag"
                value={selectedTag?.id ?? ""}
                onChange={(e) => {
                    const tagId = parseInt(e.target.value);
                    const tag = tags.find((t) => t.id === tagId) ?? null;
                    setSelectedTag(tag);
                }}
                className="p-1 my-2 border rounded-md"
            >
                <option value="">Select a tag</option>
                {tags.map((tag) => (
                    <option key={tag.id} value={tag.id}>{tag.name}</option>
                ))}
            </select>

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