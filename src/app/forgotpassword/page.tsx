"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [isLoading , setIsLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const resetPassword = async ( e : React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await axios.post("/api/users/forgotpassword", {token,newPassword,}).then(response =>{
      toast.success(response.data.message);
      })
    } catch (error: any) {
     
      toast.error(error.response.data.message);
    }finally{
      setIsLoading(false);
    }
  };

  // get token from url
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-5 py-2">
      
      {/* <h2 className="p-2 bg-blue-500 text-white rounded-md">
        {token ? `token : ${token}` : "no token"}
      </h2> */}

      <form 
      onSubmit={(e)=>resetPassword(e)}
      className="bg-white shadow-md rounded flex flex-col justify-center gap-2 px-8 pt-6 pb-8 mb-4">
        <h1 className="text-3xl font-bold text-blue-500 mb-6">
          Reset Your Password
        </h1>

        {/* password */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            New Password
          </label>
          <input
            className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Enter Your Password"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
          />
        </div>

        {/* sign in */}
        <button
          disabled={(newPassword.length < 5)}
          className=" bg-blue-500 hover:bg-blue-700 text-white disabled:bg-gray-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          {isLoading ? "Loading..." : "Reset Password"}
        </button>


        <div className="text-black flex justify-center gap-2 mt-3 font-semibold">
            <p>Go back to</p> <Link className="text-blue-500" href={"/login"}>Sign in Page</Link>
        </div>


      </form>
    </div>
  );
}
