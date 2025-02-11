import mongoose, { Schema, Types } from "mongoose";

const tweetSchema = new mongoose.Schema({
    content : {
        type : String,
        required : true,
    },
    Owner : {
        type : Schema.Types.ObjectId,
        ref : "User"
    }
},{
    timestamps : true
})

export const Tweet = mongoose.model('Tweet',tweetSchema)