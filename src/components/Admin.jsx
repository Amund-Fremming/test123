import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "./AuthContext";
import { AuthContextProvider } from './AuthContext';

const Admin = () => {

    const { user, logout, signIn } = UserAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signOutAuth = async () => {
        try {
            await logout();
            navigate("/");
            console.log("You are logged out");
        } catch(error) {
            console.log(error);
        }
    };

    const signInAuth = async (e) => {
        e.preventDefault();
        try {
            await signIn(email, password);
            setEmail("");
            setPassword("");
        } catch (error) {
            console.log(error);
        }
    }

    return(
    <>
        <AuthContextProvider>
            <Navbar bg={"[#E09A32]"} />
        </AuthContextProvider>
        <div className="justify-center items-center flex w-full h-screen">
            <form className="md:w-[400px] lg:w-[400px] xl:w-[400px] sm:w-[300px] w-[350px] mx-auto bg-white p-6 rounded shadow-md">
                <h2 className="text-2xl font-bold mb-4">{user !== null ? "Already logged in" : "Login"}</h2>
                <div className="mb-4">
                    <label className="block mb-2 font-bold" htmlFor="email">Email:</label>
                    <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-bold" htmlFor="password">Password:</label>
                    <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
                    onClick={user !== null ? e => signOutAuth(e) : e => signInAuth(e)}
                    >
                    {user !== null ? "Sign out" : "Login"}
                    </button>
                </div>
            </form>
        </div>
        <p>{user ? user.email : ""}</p>
    </>
    );
};

export default Admin;