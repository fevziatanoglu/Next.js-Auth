"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();
  const [loginForm, setLoginForm] = React.useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/users/login", loginForm);
      console.log(response);
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-2 text-black">
      <h1 className="text-white">Login</h1>

      <input
        placeholder="email"
        type="text"
        value={loginForm.email}
        onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
      ></input>

      <input
        placeholder="password"
        type="password"
        value={loginForm.password}
        onChange={(e) =>
          setLoginForm({ ...loginForm, password: e.target.value })
        }
      ></input>

      <button className="bg-white text-orange-500" onClick={onLogin}>
        Login
      </button>
    </div>
  );
}
