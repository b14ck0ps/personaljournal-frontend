'use client';
import { useState } from "react";
import logout from "./lib/Logout";
export default function Navbar() {
    const [isAuth, setIsAuth] = useState(false);

    useState(() => {
        setIsAuth(localStorage.getItem('authHeader') ? true : false);
    },);

    return (
        <nav>
            <ul className='flex items-center justify-center gap-5 mt-3'>
                <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    {isAuth ? (
                        <button onClick={logout}>
                            Logout
                        </button>
                    ) : (
                        <a href="/login">Login</a>
                    )}
                </li>
            </ul>
        </nav>
    );
}
