import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/db-connect";

connect();

export async function GET(request: NextRequest) {

    try {
        //  get user id from token
        const userId = getDataFromToken(request);
        // find user without password
        const user = await User.findOne({ _id: userId }).select("-password");

        return NextResponse.json({ message: "User found successfully ", success: true,  userId : user._id}, { status: 200 })
        
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: error.status })
    }
}
