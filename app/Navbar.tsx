'use client';
import { useState } from "react";
import logout from "./lib/Logout";
export default function Navbar() {
    const [isAuth, setIsAuth] = useState(false);

    useState(() => {
        setIsAuth(sessionStorage.getItem('authHeader') ? true : false);
    },);

    return (
        <nav>
            <ul className='flex items-center justify-center gap-5 p-3 mt-3'>
                <li>
                    <a href="/">Home</a>
                </li>
                {isAuth ? (
                    <div className="flex gap-5">
                        <li>
                            <a href="/profile">Profile</a>
                        </li>
                        <li>
                            <button onClick={logout}>
                                Logout
                            </button>
                        </li>

                    </div>
                ) : (
                    <div className="flex gap-5">
                        <li>
                            <a href="/login">Login</a>
                        </li>
                        <li>
                            <a href="/register">Register</a>
                        </li>
                    </div>
                )}

            </ul>
        </nav>
    );
}
