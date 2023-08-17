import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const sendEmail = async (email: string, emailType: string, userId: any) => {

    try {

        // hash user id as token
        const userIdToken = await bcryptjs.hash(userId, 10);



        // verify email 
        if (emailType === "VERIFY") {

            // create 2 hours verifytoken for user
            await User.findByIdAndUpdate
                (userId,
                    { verifyToken: userIdToken, verifyTokenExpiry: Date.now() + 7200000 },
                    { new: true, runValidators: true })

        }else if (emailType === "RESET"){

             // create 2 hours forgot password token for user
             await User.findByIdAndUpdate
             (userId,
                 { forgotPasswordToken: userIdToken, forgotPasswordTokenExpiry: Date.now() + 7200000 },
                 { new: true, runValidators: true })

        }

        // transporter mail from Mailtrap
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.TRANSPORT_USER,
              pass: process.env.TRANSPORT_PASSWORD
            }
          });

        // mail datas
        const mailDatas = {
            from : "nextjsapp@gmail.com",
            to: email,
            subject : (emailType === "VERIFY") ? "Verify Your Account" : "Reset Your Password",
            html : `<p> Click <a href="${process.env.DOMAIN}/verifyemail?token=${userIdToken}">Here</a> to verify email </p>`
        }

        // send
        const sendMailResponse = await transport.sendMail(mailDatas);
        return sendMailResponse;

    } catch (error: any) {
        console.log("mailer error!");
        throw new Error(error.message );
    }

}

