import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

import { connect } from "@/dbConfig/db-connect"


connect();
export async function POST(request: NextRequest) {

    try {  // get token from request
        const reqBody = await request.json();
        const { token, newPassword } = reqBody;

        // find user by forgot password token and expiry is bigger than now's date
        const user = await User.findOne({ forgotPasswordToken: token });
        if (!user) {
            throw new Error("Invalid token");
        }

        // hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hashSync(newPassword, salt);

        // change and save user
        user.password = newPassword;
        await user.save();

        return NextResponse.json({ message: "Password changed successfully." }, { status: 200});

    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: error.status || 500 });
    }
}