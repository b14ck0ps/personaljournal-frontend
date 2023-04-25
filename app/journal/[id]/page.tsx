'use client';
import { useEffect, useState } from "react";
import axiosWithAuth from "@/app/lib/AxiosAuth";
import { JournalEntry, Props } from "@/app/Types";

const JournalEntryView = ({ params }: Props) => {
    const id = params.id;
    const [journalEntry, setJournalEntry] = useState<JournalEntry | null>(null);

    useEffect(() => {
        axiosWithAuth
            .get(`/journalEntry/${id}`)
            .then((response) => {
                setJournalEntry(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [id]);

    if (!journalEntry) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col w-1/2 mx-auto mt-5">
            <h1 className="px-3 text-xl font-bold">{journalEntry.title}</h1>
            <p className="px-3 mt-3 text-sm text-gray-500">
                Written by {journalEntry.user.name} on{" "}
                {new Date(...journalEntry.updatedAt).toLocaleDateString()}
            </p>
            <p className="p-3 my-2 border border-gray-200">{journalEntry.body}</p>
        </div>
    );
};

export default JournalEntryView;
