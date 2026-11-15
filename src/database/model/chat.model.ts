import mongoose, { Types } from "mongoose";
import { ChatEnum } from "../../common/enums/chat.enum";
import { IChat, IMessage } from "../../common/interfaces/chat.interface";




export const MessageSchema = new mongoose.Schema<IMessage>({
        content : {
            type : String,
            required : function(this){
                return !this.attachments?.length
            }
        },

        attachments : {
            type : [String],
        },
        likes : [{
            type : Types.ObjectId,
            ref : "user"
        }],
        tags : [{
            type : Types.ObjectId,
            ref : "user"
        }],

        createdBy : {
            type : Types.ObjectId,
            ref : "user"
        },

        createdAt : {
            type : Date,
            default : Date.now()
        },
        updatedAt :{
            type : Date,
            default : Date.now()
        },
        DeletedAt : {
            type : Date,
            default : null
        },
        restoredAt : {
            type : Date,
            default : null
        },
})



export const ChatSchema = new mongoose.Schema<IChat> ({
        participats :[{type : Types.ObjectId , ref : "user"}],
        createdBy :{type : Types.ObjectId , ref : "user"},
        message : {
            type : [MessageSchema],
            required : true
        },
        type : {
            type : String,
            enum : ChatEnum,
            default  :ChatEnum.ovo
        },
        group  : {
            type : String,
            required : function(this) {
                return this.type == "ovm"
            }
        },
        groupImage : {
            type : String,
            required: false
        },
        roomId : {
            type : String,
        },
        createdAt : {
            type : Date,
            default : Date.now()
        },
        updatedAt :{
            type : Date,
            default : Date.now()
        },
        DeletedAt : {
            type : Date,
            default : null
        },
        restoredAt : {
            type : Date,
            default : null
        },
})


export const ChatModel = mongoose.model<IChat>("chat" , ChatSchema)