"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import UserHeader from "./userHeader";
import NonUserHeader from "./nonUserHeader";
import { usePathname } from "next/navigation";


export default function Header() {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const pathname = usePathname();

  const getUserDetails = async () => {
    try {
      setIsLoading(true);
      await axios.get("/api/users/getUserData").then((response) => {
        setUser(response.data.userId);
      });
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, [pathname]);

  if (isLoading) {
    return <div className="p-10 fixed min-w-full top-0  flex flex-row justify-between  items-center ">Loading...</div>;
  }

  return (
    <div className="fixed min-w-full top-0">
      {user ? <UserHeader></UserHeader> : <NonUserHeader></NonUserHeader>}
    </div>
  );
}
