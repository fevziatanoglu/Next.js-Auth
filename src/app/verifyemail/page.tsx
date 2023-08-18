"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";


export default function VerifyEmailPage() {

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    const [isLoading , setIsLoading] = useState(false);

    const verifyUserEmail = async () => {
        try {
            setIsLoading(true);
            await axios.post('/api/users/verifyemail', {token}).then(response =>{
                toast.success(response.data.message)
            })
            setVerified(true);
        } catch (error:any) {
            toast.error(error.response.data.message)
            setError(true);            
        }finally{
            setIsLoading(false);
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);


    useEffect(() => {
        if(token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    return(
        <div className="flex flex-col items-center justify-center min-h-screen gap-5 py-2">

            <h1 className="text-4xl text-blue-500 font-bold">{isLoading ? "Loading..." : "Verify Your Email"}</h1>
            {/* <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2> */}

            {verified && (
                <div className="bg-white p-5 flex flex-col justify-center items-center rounded gap-2 font-semibold">
                    <h2 className="text-2xl text-green-500">Your Email Verified Succesfully!</h2>
                    <Link className="text-blue-500" href="/login">
                        Go Back to Login
                    </Link>
                </div>
            )}
            {error && (
                <div>
                    <h2 className="text-2xl bg-red-500 text-black rounded p-2">Please Check Your Email And Try Again</h2>
                </div>
            )}
        </div>
    )

}