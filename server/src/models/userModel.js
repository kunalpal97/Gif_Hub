import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    providerId : {
        type : String,
        required : true,
        unique : true,
    },
    name : String,
    email : {
        type : String,
        required : true,
        unique : true,
    },
    avatar : String,
    createdAt : {
        type : Date,
        default : Date.now,
    },
});

export default mongoose.model("User" , userSchema);