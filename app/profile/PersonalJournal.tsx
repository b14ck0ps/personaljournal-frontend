"use client";
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import axiosWithAuth from '../lib/AxiosAuth';
import { JournalEntry } from '../Types';
import Link from "next/link";

export default function PersonalJournalEntries() {
    const router = useRouter();

    const [entries, setEntries] = useState<JournalEntry[]>([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(3);

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

    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentEntries = entries.slice(indexOfFirstEntry, indexOfLastEntry);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(entries.length / entriesPerPage); i++) {
        pageNumbers.push(i);
    }

    const handlePaginationClick = (pageNumber: number) => setCurrentPage(pageNumber);

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
                {currentEntries.map(entry => (
                    <li key={entry.id} className="p-4 mb-2 bg-gray-100 rounded-lg : hover:bg-gray-200">
                        <Link href={`/journal/edit/${entry.id}`} className="block w-full">
                            <h2 className="text-lg font-bold">{entry.title}</h2>
                            <p className="mb-2 text-sm text-gray-500">Created on {new Date(entry.createdAt).toLocaleDateString()}</p>
                            <p className="text-gray-700">{entry.body.length > 60 ? entry.body.substring(0, 120) + "...see more" : entry.body}</p>
                            <p className="mt-2 text-sm text-right text-gray-500">By {entry.user.name}</p>
                        </Link>
                    </li>
                ))}
            </ul>
            <div className="flex justify-center mt-4">
                {pageNumbers.map(number => (
                    <button
                        key={number}
                        onClick={() => handlePaginationClick(number)}
                        className={`px-2 py-1 mx-1 border rounded ${currentPage === number ? 'bg-gray-200' : 'bg-white'}`}
                    >
                        {number}
                    </button>
                ))}
            </div>
        </div>
    );
}
