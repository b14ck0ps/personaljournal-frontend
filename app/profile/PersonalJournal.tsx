"use client";
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import axiosWithAuth from '../lib/AxiosAuth';
import { JournalEntry } from '../Types';
import Link from "next/link";

interface JournalEntryWithTag extends JournalEntry {
    tag: Tag;
}

export default function JournalEntries() {
    const router = useRouter();

    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(5);
    const [entries, setEntries] = useState<JournalEntryWithTag[]>([]);
    const [tags, setTags] = useState<Tag[]>([]);

    useEffect(() => {
        axiosWithAuth.get(`/journalEntry/username/${sessionStorage.getItem('username')}`)
            .then(response => {
                if (response.status === 200) {
                    const formattedEntries = response.data.map((entry: JournalEntry) => ({
                        ...entry,
                        createdAt: new Date(...entry.createdAt),
                        updatedAt: new Date(...entry.updatedAt),
                        tag: null // add null tag to each entry initially
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

        axiosWithAuth.get('/tags')
            .then(response => {
                if (response.status === 200) {
                    setTags(response.data);
                } else {
                    console.error('Failed to fetch tags:', response);
                }
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        // map the tags with each entry
        const entriesWithTag = entries.map(entry => {
            const tag = tags.find(tag => tag.id === entry.tagId);
            return {
                ...entry,
                tag: tag || null
            };
        });
        setEntries(entriesWithTag);
    }, [tags]);

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
                <h1 className="mb-4 text-xl font-bold">Journal Entries</h1>
                <a
                    href='/journal/add'
                    className='px-3 m-2 border border-amber-400 hover:bg-amber-400 '
                >Add new</a>
            </div>
            <ul>
                {currentEntries.map(entry => (
                    <Link href={`/journal/edit/${entry.id}`} key={entry.id}>
                        <li className="p-4 mb-2 bg-gray-100 rounded-lg : hover:bg-gray-200">
                            <h2 className="text-lg font-bold">{entry.title}</h2>
                            <p className="mb-2 text-sm text-gray-500">Created on {new Date(entry.createdAt).toLocaleDateString()}</p>
                            <p className="text-gray-700">{entry.body.length > 60 ? entry.body.substring(0, 120) + " ...see more" : entry.body}</p>
                            <div className='p-2'>
                                <p className="float-right mx-4 text-sm text-gray-500">Posted by: {entry.username ?? 'None'}</p>
                                <p className="float-right text-sm text-gray-500">Tag: {entry.tagName ?? 'None'}</p>
                            </div>
                        </li>
                    </Link>
                ))}
            </ul>
            <div className="flex justify-center">
                <nav className="flex items-center justify-between w-2/3 p-4 mx-auto mt-4 bg-white border border-gray-200 rounded-lg shadow">
                    <div className="flex justify-between flex-1 sm:hidden">
                        <a href="#" className="relative inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-gray-500 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-500">
                            Previous
                        </a>
                        <a href="#" className="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-500">
                            Next
                        </a>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm leading-5 text-gray-700">
                                Showing <span className="font-medium">{indexOfFirstEntry + 1}</span> to <span className="font-medium">{indexOfLastEntry}</span> of <span className="font-medium">{entries.length}</span> results
                            </p>
                        </div>
                        <div>
                            <span className="relative z-0 inline-flex shadow-sm">
                                {pageNumbers.map(number => (
                                    <button
                                        key={number}
                                        onClick={() => handlePaginationClick(number)}

                                        className={`-ml-px relative inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 ${currentPage === number ? 'bg-gray-200' : 'hover:text-gray-400'} focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500`}
                                    >
                                        {number}
                                    </button>
                                ))}
                            </span>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
};