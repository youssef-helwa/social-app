import { Types } from "mongoose";
import { IUser } from "./user.interface";
import { ChatEnum } from "../enums/chat.enum";



export interface IMessage{
    content : string,
    createdBy : Types.ObjectId | IUser,
    attachments ?: string[],
    likes ?: Types.ObjectId[] | IUser[],
    tags ?: Types.ObjectId[] | IUser[],
    createdAt ?: Date,
    updatedAt ?: Date,
    DeletedAt ?: Date,
    restoredAt ?: Date

}



export interface IChat {
    participats : Types.ObjectId[] | IUser[],
    createdBy : Types.ObjectId | IUser,
    message : IMessage[],
    type : ChatEnum ,
    group  ?: string,
    groupImage ?: string,
    roomId ?: string,
    createdAt ?: Date,
    updatedAt ?: Date,
    DeletedAt ?: Date,
    restoredAt ?: Date
}