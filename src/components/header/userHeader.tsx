import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

export default function UserHeader() {
  
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const logout = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/users/logout").then((response) => {
        toast.success(response.data.message);
        router.push("/login");
      });
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <nav className="bg-gray-300">
      <div className="p-5  flex flex-row justify-between  items-center ">
        {/* title */}
        <Link href={"/"}>
          <h1 className="font-bold text-2xl text-blue-800 hover:text-white">
            NEXTJS AUTH
          </h1>
        </Link>

        {/*buttons*/}
        <div>
          <button
          onClick={logout}
            type="button"
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            {isLoading ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>
    </nav>
  );
}
