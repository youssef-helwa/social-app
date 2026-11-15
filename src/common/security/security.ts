import bcrypt from "bcrypt"
import { env } from "../../config/env.service"


export const GenerateHash =async ({plaintext , salt = env.salt} : {
    plaintext : string,
    salt?: string
}) : Promise<string> =>{
    return await bcrypt.hash(plaintext , Number(salt))
}



export const CompareHash = async({plaintext , cyphertext}:{
    plaintext :string,
    cyphertext:string
}) : Promise<boolean>=>{
    return await bcrypt.compare(plaintext , cyphertext)
} 