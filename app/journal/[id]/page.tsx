'use client';
import { Comment, JournalEntry, Props } from "@/app/Types";
import axiosWithAuth from "@/app/lib/AxiosAuth";
import { useEffect, useState } from "react";

const JournalEntryView = ({ params }: Props) => {
    const id = params.id;
    const [journalEntry, setJournalEntry] = useState<JournalEntry | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [userId, setUserId] = useState<number>();

    useEffect(() => {
        axiosWithAuth
            .get(`/journalEntry/${id}`)
            .then((response) => {
                setJournalEntry(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
        axiosWithAuth.get(`/user/${sessionStorage.getItem("username")}`).then((response) => {
            setUserId(response.data.id);
        });
    }, []);

    useEffect(() => {
        axiosWithAuth
            .get(`/journal-comments/${id}`)
            .then((response) => {
                setComments(...comments, response.data.reverse());
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleCommentSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const newComment = {
            body: formData.get("body") as string,
            journal_entry_id: id,
            user_id: userId,
        };
        axiosWithAuth
            .post("/journal-comments", newComment)
            .then((response) => {
                setComments([...comments, response.data]);
                //reset form
                event.currentTarget.reset();
                window.location.reload();
            })
            .catch((error) => {
                window.location.reload();
                console.error(error);
            });
    };

    const handleCommentDelete = (commentId: number) => {
        if (!window.confirm("Are you sure you want to delete this comment?")) {
            return;
        }
        axiosWithAuth.delete(`/journal-comments/${commentId}`).then((response) => {
            setComments(comments.filter((comment) => comment.id !== commentId));
        });
    };


    if (!journalEntry) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col w-1/2 mx-auto mt-5">
            <h1 className="px-3 text-xl font-bold">{journalEntry.title}</h1>
            <p className="px-3 mt-3 text-sm text-gray-500">
                Written by {journalEntry.user.name} on{" "}
                {new Date(...journalEntry.createdAt).toLocaleDateString()}
            </p>
            <p className="p-3 my-2 border border-gray-200">{journalEntry.body}</p>
            <form className="flex flex-col w-1/2 mx-auto my-5" onSubmit={handleCommentSubmit}>
                <label className="text-gray-700">Add a comment:</label>
                <textarea name="body" className="w-full h-24 p-2 mt-2 text-gray-700 border border-gray-400 resize-none" required></textarea>
                <button type="submit" className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600 focus:bg-blue-700 focus:outline-none">
                    Submit
                </button>
            </form>
            <h2 className="px-3 mt-5 mb-3 text-lg font-bold">Comments</h2>
            {comments.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                    {comments.map((comment) => (
                        <li key={comment.id} className="py-4">
                            <div className="flex space-x-3">
                                <div className="flex-shrink-0">
                                    <img className="w-10 h-10 rounded-full" src={comment.userImage} alt="" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900">{comment.username}</p>
                                    {comment.username === sessionStorage.getItem("username") && (
                                        <div>
                                            <button type="button" className="float-right text-sm text-red-500 hover:font-bold" onClick={() => handleCommentDelete(comment.id)}>
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                    {comment.created_at && <p className="text-sm text-gray-500">{new Date(...comment.created_at).toLocaleDateString()}</p>}
                                    <p className="mt-1 text-sm text-gray-700">{comment.body}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No comments yet.</p>
            )}

        </div>
    );
};

export default JournalEntryView;
