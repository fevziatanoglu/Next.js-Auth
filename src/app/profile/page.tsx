"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState();

  const logout = async () => {
    try {
      const response = await axios.get("/api/users/logout").then((response) => {
        toast.success(response.data.message);
        router.push("/login");
      });
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const getUserDetails = async () => {
    try {
      const response = await axios.get("/api/users/getUserData");
      setUser(response.data.user);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div>
      Profile Page
      <button className="bg-blue-500 p-5" onClick={logout}>
        Logout
      </button>
    </div>
  );
}
