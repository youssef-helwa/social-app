import mongoose from "mongoose";
import { IUser } from "../../common/interfaces/user.interface";
import { GenderEnum, providerEnum, RoleEnum } from "../../common/enums/user.enum";



const userSchema = new mongoose.Schema<IUser>({
        firstName : String,
        lastName : String,
        email : {
                type :String,
                unique : true
        },
        phone : String,
        password : String,
        confirmEmail:{
                type:Boolean,
                default : false
        },
        gender : {
                type :Number,
                default : GenderEnum.male
        },
        provider : {
                type :Number,
                default : providerEnum.system
        },
        role : {
                type :Number,
                default : RoleEnum.user
        },
        profilePic: {
                type :String,
        },
        friends: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
                default: []
        }],
        friendRequests: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
                default: []
        }]
} , {
        timestamps : true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
})


userSchema.virtual("userName").set(function(value){
        let [firstName , ...rest] = value.trim().split(" ")

        this.firstName = firstName
        this.lastName = rest.join(" ")
}).get(function () {
        return `${this.firstName} ${this.lastName}`
})

export const userModel = mongoose.model("user" , userSchema)