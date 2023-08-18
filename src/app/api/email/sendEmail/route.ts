
import { sendEmail } from "@/helpers/mailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

    try {
        const reqBody = await request.json();
        const { email, emailType, userId } = reqBody;

        const response = await sendEmail( email, emailType , userId);

        return NextResponse.json({ message: "Email sent successfully", response }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({ message: error.message, page: "sendEmail-route" }, { status: error.status || 500 })
    }

}