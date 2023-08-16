import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";




export const getDataFromToken = (request : NextRequest) => {

    try {

        const token : string = request.cookies.get("token")?.value || "";
        const tokenData : any = jwt.verify(token , process.env.TOKEN_SECRET!);

        return tokenData;

    } catch (error : any) {
        throw new Error(error.message);
    }

}