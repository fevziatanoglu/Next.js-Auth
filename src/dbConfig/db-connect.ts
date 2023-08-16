import mongoose from "mongoose";

export async function connect(){
    try{
        await mongoose.connect(process.env.DB_URI!);
        const connection = mongoose.connection;

        connection.on("connected" , ()=>{
            console.log("Connected to MongoDB")
        })

        connection.on("error", (error)=>{
            console.log("MongoDB connection error");
            console.log(error)
            process.exit();
        })
    }   
    catch(error){
        console.log(error);
        console.log("error!");
    }
}