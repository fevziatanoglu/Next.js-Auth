"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function ProfilePage(){

    const router = useRouter();

    const [user , setUser] = useState();

    const logout = async () => {

        try{
            const response = await axios.get("/api/users/logout")
            console.log(response.data);
            router.push("/login");

        }catch(error : any){
            console.log(error.message);
        }

    }

    const getUserDetails = async () => {

        const response = await axios.get("/api/users/getUserData");
        console.log(response.data);
        setUser(response.data.user);

    }

    useEffect(()=>{
        getUserDetails();
    } , [])

    return <div>
        Profile Page
        <button className="bg-blue-500 p-5" onClick={logout}>Logout</button>
    </div>
}