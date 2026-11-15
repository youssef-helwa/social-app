import { Types } from "mongoose"





export interface IPost {
        title: string
        content : string
        userId : Types.ObjectId
        comments : string[]
        createdAt : Date
        likes : string
        tags : string[]
        deletedAt : Date
        restoredAt : Date
}