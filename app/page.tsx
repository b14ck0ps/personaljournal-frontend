"use client";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { JournalEntry } from './Types';
import { axiosWithAuth } from './lib/AxiosAuth';


export default function Home() {
  const router = useRouter();

  const [entries, setEntries] = useState<JournalEntry[]>([]);
  useEffect(() => {
    axiosWithAuth.get('/journalEntry')
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
      <h1 className="mb-4 text-xl font-bold">Journal Entries</h1>
      <ul>
        {entries.map(entry => (
          <li key={entry.id} className="p-4 mb-2 bg-gray-100 rounded-lg">
            <h2 className="text-lg font-bold">{entry.title}</h2>
            <p className="mb-2 text-sm text-gray-500">Created on {new Date(entry.createdAt).toLocaleDateString()}</p>
            <p className="text-gray-700">{entry.body}</p>
            <p className="mt-2 text-sm text-right text-gray-500">By {entry.user.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
