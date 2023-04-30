'use client';
import { Comment, JournalEntry, Props } from "@/app/Types";
import axiosWithAuth from "@/app/lib/AxiosAuth";
import { use, useEffect, useState } from "react";

const JournalEntryView = ({ params }: Props) => {
    const id = params.id;
    const [journalEntry, setJournalEntry] = useState<JournalEntry | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [userId, setUserId] = useState<number>();
    const [userImage, setUserImage] = useState<string>();
    const [editComment, setEditComment] = useState<Number | null>();

    const [commentBody, setCommentBody] = useState("")

    const [commentError, setCommentError] = useState("");
    const [commentUpdateError, setCommentUpdateError] = useState("");


    useEffect(() => {
        const username = sessionStorage.getItem("username");
        if (!username) {
            window.location.href = "/login";
            return;
        }
        axiosWithAuth
            .get(`/journalEntry/${id}`)
            .then((response) => {
                setJournalEntry(response.data);
                setUserImage(response.data.user.image);
            })
            .catch((error) => {
                console.error(error);
            });
        axiosWithAuth.get(`/user/${username}`).then((response) => {
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
        if (formData.get("body") === "") {
            setCommentError("Comment is required");
            return;
        } else {
            setCommentError("");
        }
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

    const handleCommentUpdate = (commentId: number, commentBody: string) => {
        if (commentBody === "") {
            setCommentUpdateError("Comment is required");
            return;
        } else {
            setCommentUpdateError("");
        }
        axiosWithAuth.put(`/journal-comments`, {
            id: commentId,
            body: commentBody,
            journal_entry_id: id,
            user_id: userId,
        }).then((response) => {
            window.location.reload();
        });
    }



    if (!journalEntry) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col w-1/2 mx-auto mt-5">
            <div className="flex items-center">
                <div className="w-12 h-12 ml-2 overflow-hidden rounded-lg">
                    <img src={userImage} alt={journalEntry.user.name} className="object-cover object-center w-full h-full" />
                </div>
                <h1 className="px-3 text-xl font-bold">{journalEntry.title}</h1>
            </div>
            <p className="px-3 mt-3 text-sm text-gray-500">
                Written by {journalEntry.user.name} on{" "}
                {new Date(...journalEntry.createdAt).toLocaleDateString()}
            </p>
            <p className="p-3 my-2 border border-gray-200">{journalEntry.body}</p>
            <form className="flex flex-col w-1/2 mx-auto my-5" onSubmit={handleCommentSubmit}>
                <label className="text-gray-700">Add a comment:</label>
                <textarea name="body" className="w-full h-24 p-2 mt-2 text-gray-700 border border-gray-400 resize-none"></textarea>
                {commentError && <p className="text-sm text-red-500">{commentError}</p>}
                <button type="submit" className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600 focus:bg-blue-700 focus:outline-none">
                    Comment
                </button>
            </form>
            <h2 className="px-3 mt-5 mb-3 text-lg font-bold">Comments</h2>
            {comments.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                    {comments.map((comment) => (
                        <li key={comment.id} className="py-4">
                            <div className="flex space-x-3">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 overflow-hidden rounded-lg">
                                        <img src={comment.userImage} alt="" className="object-cover object-center w-full h-full" />
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900">{comment.username}</p>
                                    {comment.username === sessionStorage.getItem("username") && (
                                        <div>
                                            <button type="button" className="float-right text-sm text-red-500 hover:font-bold" onClick={() => handleCommentDelete(comment.id)}>
                                                Delete
                                            </button>
                                            <button type="button" className="float-right mr-2 text-sm text-gray-500 hover:text-gray-700" onClick={() => setEditComment(comment.id)}>
                                                Edit
                                            </button>
                                        </div>
                                    )}

                                    {comment.created_at && <p className="text-sm text-gray-500">{new Date(...comment.created_at).toLocaleDateString()}</p>}
                                    {editComment === comment.id ? (
                                        <input
                                            type="text"
                                            name="body"
                                            className="w-full p-1 my-1 border border-gray-300 rounded"
                                            defaultValue={comment.body}
                                            onChange={(e) => setCommentBody(e.target.value)}
                                        />

                                    ) : (
                                        <p className="mt-1 text-sm text-gray-700">{comment.body}</p>
                                    )}
                                    {editComment === comment.id ? (
                                        <div>
                                            {commentUpdateError && <p className="text-sm text-red-500">{commentUpdateError}</p>}
                                            <button type="button" className="px-2 text-sm text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-black " onClick={() =>
                                                handleCommentUpdate(comment.id, commentBody)}>
                                                Update
                                            </button>
                                            <button type="button" className="ml-2 text-sm text-gray-500 hover:text-gray-700" onClick={() => setEditComment(null)}>
                                                Cancel
                                            </button>
                                        </div>
                                    ) : null}


                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No comments yet.</p>
            )
            }

        </div >
    );
};

export default JournalEntryView;
