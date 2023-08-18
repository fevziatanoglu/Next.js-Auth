import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

import { connect } from "@/dbConfig/db-connect"


connect();
export async function POST(request: NextRequest) {

    try {

        // get token from request
        const reqBody = await request.json();
        const { token } = reqBody;
  

        // find user by verifyToken and expiry is bigger than now's date
        const user = await User.findOne({ verifyToken: token });
        if (!user) {
            return NextResponse.json({message : "Invalid token"} , {status : 500})
        }

        // change user datas and save
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();
        
        return NextResponse.json({message : " Verified email successfully." , success : true} , {status : 200})


    } catch (error: any) {
    return NextResponse.json({ message: error.message , page : "verifyemail" }, { status: error.status || 500 })
}

}