"use client"

import axios from "axios";
import { useRouter } from "next/navigation";


export default function ProfilePage(){

    const router = useRouter();

    const logout = async () => {

        try{
            const response = await axios.get("/api/users/logout")
            console.log(response.data);
            router.push("/login");

        }catch(error : any){
            console.log(error.message);
        }

    }

    return <div>
        Profile Page

        <button className="bg-blue-500 p-5" onClick={logout}>Logout</button>
    </div>
}