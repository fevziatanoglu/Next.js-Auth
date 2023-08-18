"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const [loginForm, setLoginForm] = React.useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = React.useState(false);

  const [isShowForgotPasswordForm, setIsShowForgotPasswordForm] =
    React.useState(false);

  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  // LOGIN SUBMIT
  const onLogin = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await axios.post("/api/users/login", loginForm).then((response) => {
        toast.success(response.data.message);
        router.push("/profile");
      });
    } catch (error: any) {
      // log by toast
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  // FORGOT PASSWORD SUBMIT
  const forgotPassword = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    // SEND VERİFY EMAIL
    try {
      await axios.post("/api/email/sendEmail", {
        email: loginForm.email,
        emailType: "RESET",
        userId: "empty",
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (loginForm.email.length > 0 && loginForm.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [loginForm]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-2 text-black">
      <div className="w-full max-w-sm">
        {!isShowForgotPasswordForm ? (
          // LOGIN FORM
          <form
            onSubmit={(e) => onLogin(e)}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            {/* header */}
            <h1 className="text-blue-500 text-center text-3xl font-bold mb-6 ">
              LOGIN
            </h1>

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
                value={loginForm.email}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, email: e.target.value })
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
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, password: e.target.value })
                }
              />
            </div>

            {/* buttons */}
            <div className="flex items-center justify-between">
              {/* sign in */}
              <button
                disabled={buttonDisabled}
                className="w-1/2 bg-blue-500 hover:bg-blue-700 text-white disabled:bg-gray-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                {isLoading ? "LOADING..." : "SIGN IN"}
              </button>

              {/* forgot password */}
              <div
                onClick={() => setIsShowForgotPasswordForm(true)}
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 hover:cursor-pointer"
              >
                Forgot Password?
              </div>
            </div>

            <div className="text-sm flex flex-row justify-center mt-4">
              <p>Don't you have an account?</p>
              <Link
                className="ml-1 inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 hover:cursor-pointer"
                href="/signup"
              >
                Let's Sign up
              </Link>
            </div>
          </form>
        ) : (
          // FORGOT PASSWORD FORM
          <form
            onSubmit={(e) => forgotPassword(e)}
            className="bg-white shadow-md rounded px-8 pt-8 pb-14 mb-4 flex flex-col gap-6 "
          >
            {/* header */}
            <h1 className="text-blue-500 text-center text-2xl font-bold mb-6 ">
              FORGOT PASSWORD
            </h1>

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
                value={loginForm.email}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, email: e.target.value })
                }
              />
            </div>

            {/* buttons */}
            <div className="flex items-center justify-between">
              {/* send email */}
              <button
                disabled={loginForm.email.length === 0}
                className="w-1/2 bg-blue-500 hover:bg-blue-700 text-white disabled:bg-gray-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                {isLoading ? "LOADING..." : "SEND EMAIL"}
              </button>
              {/* login form */}
              <div
                onClick={() => setIsShowForgotPasswordForm(false)}
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 hover:cursor-pointer"
              >
                Back to Login
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
