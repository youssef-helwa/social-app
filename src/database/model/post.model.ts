import mongoose, { Schema, Types } from "mongoose";
import { IPost } from "../../common/interfaces/post.interface";




const postSchema = new Schema<IPost>({
    title: {type: String , required : true},
    content : {type : String , required : true},
    userId : {type : Types.ObjectId , ref : "user"},
    comments : [{type : Types.ObjectId , ref : "comment"}],
    createdAt : {type : Date , default : Date.now()},
    likes : [{type : Types.ObjectId , ref : "user"}],
    tags : [{type : Types.ObjectId , ref : "user"}],
    deletedAt : {type : Date , default : null},
    restoredAt : {type : Date , default : null}
} , {
    timestamps:true,
    toJSON : { virtuals : true},
    strict : true
})



export const postModel = mongoose.model("post" , postSchema)