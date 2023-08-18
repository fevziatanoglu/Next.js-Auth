import { connect } from "@/dbConfig/db-connect";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {

    try {
       
        // get datas from frontend
        const reqBody = await request.json();
        const { username, email, password } = reqBody;
        console.log(reqBody);
       
        // check user is exist
        const user = await User.findOne({ email });
        if (user) {
            throw new Error("User already exists");
        }

        // hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hashSync(password, salt);
        
        // create and save user
        const newUser = new User ({
            username, 
            email,
            password: hashedPassword
        });
        await newUser.save();
        // const savedUser = await newUser.save();
        // console.log(savedUser);


        // SEND VERİFY EMAIL
        await sendEmail(email , "VERIFY" , newUser._id.toString());

        return NextResponse.json({
            message : "User created successfully",
            success : true,
            // savedUser,
            // user : newUser
        } , {status : 201})



    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: error.status || 500 });
    }
}