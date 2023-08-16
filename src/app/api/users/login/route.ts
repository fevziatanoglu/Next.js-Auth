import { connect } from "@/dbConfig/db-connect";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {

    try {

        // get data from frontend
        const reqBody = await request.json();
        const { email, password } = reqBody;

        // check is user  exist
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "User not exists." }, { status: 400 });
        }

        // compare passwords
        const isPasswordCorrect = await bcryptjs.compare(password, user.password);
        if (!isPasswordCorrect) {
            return NextResponse.json({ message: "Wrong password or email.", status: 400 });
        }

        // create token
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1h" })
        // set response's cookies
        const response = NextResponse.json({ message: "Login successful.", success: true }, { status: 200 });
        response.cookies.set("token", token, { httpOnly: true });
        return response;


    } catch (error: any) {
        console.log("login error")
        console.log(error.message)
    }

}
