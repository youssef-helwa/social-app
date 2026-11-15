import mongoose from "mongoose";
import { env } from "../../config/env.service";


export const DBconnection = async() =>{
    await mongoose.connect(env.DB_URL as string).then(() =>{
        console.log("BD connected💾")
    }).catch((err) =>{
        console.log("DB Went Wrong😥" , err)
    })
}