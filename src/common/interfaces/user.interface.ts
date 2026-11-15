import { Types } from "mongoose"
import { GenderEnum, providerEnum, RoleEnum } from "../enums/user.enum"


export interface IUser {
    userName : string,
    firstName? : string,
    lastName? : string,
    email : string,
    phone : string,
    password : string,
    profilePic?:string
    confirmEmail?:boolean | undefined,
    gender?: GenderEnum | undefined ,
    provider?: providerEnum | undefined,
    role?: RoleEnum | undefined
    friends ?: Types.ObjectId
    friendRequests ?: string
}