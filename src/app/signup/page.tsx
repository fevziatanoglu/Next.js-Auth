"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignUpPage() {
  const router = useRouter();
  const [signupForm, setSignupForm] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/users/signup", signupForm);
      console.log(response.data);
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }};

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
      <h1 className="text-white">Sign Up</h1>

      <input
        placeholder="username"
        type="text"
        value={signupForm.username}
        onChange={(e) =>
          setSignupForm({ ...signupForm, username: e.target.value })
        }
      ></input>

      <input
        placeholder="email"
        type="text"
        value={signupForm.email}
        onChange={(e) =>
          setSignupForm({ ...signupForm, email: e.target.value })
        }
      ></input>

      <input
        placeholder="password"
        type="password"
        value={signupForm.password}
        onChange={(e) =>
          setSignupForm({ ...signupForm, password: e.target.value })
        }
      ></input>

      <button
        className="bg-white text-orange-500"
        onClick={onSignup}
        disabled={buttonDisabled}
      >
        {buttonDisabled ? "Enter your info" : "Sign Up"}
      </button>
    </div>
  );
}
