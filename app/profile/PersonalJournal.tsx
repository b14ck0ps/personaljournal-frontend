"use client";
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import axiosWithAuth from '../lib/AxiosAuth';
import { JournalEntry } from '../Types';
import Link from "next/link";

export default function PersonalJournalEntries() {
    const router = useRouter();

    const [entries, setEntries] = useState<JournalEntry[]>([]);

    useEffect(() => {
        axiosWithAuth.get(`/journalEntry/username/${sessionStorage.getItem('username')}`)
            .then(response => {
                if (response.status === 200) {
                    const formattedEntries = response.data.map((entry: JournalEntry) => ({
                        ...entry,
                        createdAt: new Date(...entry.createdAt),
                        updatedAt: new Date(...entry.updatedAt)
                    }));
                    setEntries(formattedEntries);
                } else {
                    router.push('/login'); // Redirect to login page
                }
            })
            .catch(error => {
                console.error(error);
                router.push('/login'); // Redirect to login page on error
            });
    }, []);

    return (
        <div className="p-4">
            <div className='flex justify-between mx-2'>
                <h1 className="mb-4 text-xl font-bold">Personal Journal Entries</h1>
                <a
                    href='/journal/add'
                    className='px-3 m-2 border border-amber-400 hover:bg-amber-400 '
                >Add new</a>
            </div>
            <ul>
                {entries.map(entry => (
                    <li key={entry.id} className="p-4 mb-2 bg-gray-100 rounded-lg : hover:bg-gray-200">
                        <Link href={`/journal/edit/${entry.id}`} className="block w-full">
                            <h2 className="text-lg font-bold">{entry.title}</h2>
                            <p className="mb-2 text-sm text-gray-500">Created on {new Date(entry.createdAt).toLocaleDateString()}</p>
                            <p className="text-gray-700">{entry.body}</p>
                            <p className="mt-2 text-sm text-right text-gray-500">By {entry.user.name}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
