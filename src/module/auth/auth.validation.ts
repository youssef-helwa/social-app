import {z} from "zod"
import { GenderEnum, providerEnum, RoleEnum } from "../../common/enums/user.enum"



export const SignupSchema = {
    body : z.strictObject({
            userName : z.string().min(3 , {error : "user name mut be at least 3 characters"}),
            email : z.email(),
            phone : z.string(),
            password : z.string(),
            confirmpassword : z.string(),
            profilePic :z.string().optional(),
            confirmEmail : z.boolean().optional(),
            gender: z.enum(GenderEnum).optional(),
            provider: z.enum(providerEnum).optional(),
            role: z.enum(RoleEnum).optional(),
    }).superRefine((data , ctx)=>{
        if(data.password as string !== data.confirmpassword as string){
            ctx.addIssue({code : "custom" , message : "password not matched"})
        }
    }),
}