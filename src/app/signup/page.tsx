"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignUpPage() {
  const router = useRouter();
  const [signupForm, setSignupForm] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);

  const onSignup = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await axios.post("/api/users/signup", signupForm).then((response) => {
        toast.success(response.data.message);
        router.push("/profile");
      });
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (
      signupForm.email.length > 0 &&
      signupForm.password.length > 0 &&
      signupForm.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [signupForm]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-2 text-black">
      <form
        onSubmit={(e) => onSignup(e)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        {/* header */}
        <h1 className="text-blue-500 text-center text-2xl font-bold mb-6 ">
          LET'S CREATE AN ACCOUNT
        </h1>

        {/* username */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>

          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            value={signupForm.username}
            onChange={(e) =>
              setSignupForm({ ...signupForm, username: e.target.value })
            }
          />
        </div>

        {/* email */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>

          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            value={signupForm.email}
            onChange={(e) =>
              setSignupForm({ ...signupForm, email: e.target.value })
            }
          />
        </div>

        {/* password */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            value={signupForm.password}
            onChange={(e) =>
              setSignupForm({ ...signupForm, password: e.target.value })
            }
          />
        </div>

        {/* sign up */}
        <button
          className="min-w-full bg-blue-500 hover:bg-blue-700 disabled:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          disabled={buttonDisabled}
        >
          {isLoading ? "LOADING..." : "SIGN UP"}
        </button>

        <div className="text-sm flex flex-row justify-center mt-4">
          <p>Already have an account?</p>
          <Link
            className="ml-1 inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 hover:cursor-pointer"
            href="/login"
          >
            Let's Sign in
          </Link>
        </div>
      </form>
    </div>
  );
}
