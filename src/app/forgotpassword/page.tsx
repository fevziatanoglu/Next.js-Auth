"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [error, setError] = useState(false);
  const [newPassword, setNewPassword] = useState("newpassword");

  const resetPassword = async () => {
    try {
      const response = await axios.post("/api/users/forgotpassword", { token, newPassword });
      console.log(response);
    } catch (error: any) {
      setError(true);
      console.log(error);
    }
  };

  // get token from url
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  // useEffect(() => {
  //     if(token.length > 0) {
  //         verifyUserEmail();
  //     }
  // }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Reset Your Password</h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? `${token}` : "no token"}
      </h2>

      <input
        className="text-black"
        type="password"
        value={newPassword}
        onChange={(e) => {
          setNewPassword(e.target.value);
        }}
      ></input>

      <button className="bg-orange-500 p-2" onClick={resetPassword}>Reset password</button>

      {/* {verified && (
                <div>
                    <h2 className="text-2xl">Email Verified</h2>
                    <Link href="/login">
                        Login
                    </Link>
                </div>
            )} */}
      {error && (
        <div>
          <h2 className="text-2xl bg-red-500 text-black">Error</h2>
        </div>
      )}
    </div>
  );
}
