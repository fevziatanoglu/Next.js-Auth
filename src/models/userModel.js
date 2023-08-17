import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username :  {
        type : String,
        required : [true , "Please enter a username"],
        unique : [true , "This username is already taken."]
    },
    email : {
        type : String,
        required : [true , "Please enter a email address"],
        unique : [true , "This email address is already taken."]
    },
    password :  {
        type : String,
        required : [true , "Please enter a password"],
    },
    // verify from email message
    isVerified : {
        type : Boolean,
        default : false,
    },
    isAdmin : {
        type : Boolean,
        default : false,
    },
    forgotPasswordToken : String,
    forgotPasswordTokenExpiry : Date,
    verifyToken : String,
    verifyTokenExpiry : Date
});

const User = mongoose.models.users || mongoose.model('users', userSchema);

export default User;