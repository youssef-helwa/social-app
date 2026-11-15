import { env } from "../../config/env.service";
import jwt, { JwtPayload }  from "jsonwebtoken";
import { BadRequestException } from "../exceptions/error.responce";



export class tokenService {
    
    constructor(){}


    generateToken(user : any) {
        let signature = undefined
        let audience  =undefined
        let refreashsigneture = undefined

        switch (user.role) {
            case 0:
                signature = env.Admin_Signeture
                audience = "Admin"
                refreashsigneture = env.Admin_refresh_Signeture
                break;
        
            default:
                signature = env.User_Signeture
                audience = "User"
                refreashsigneture = env.User_refresh_Signeture
                break;
        }
        let accessToken = jwt.sign({id:user.id} , signature as string , {audience , expiresIn : "30m"} )
        let refreshToken = jwt.sign({id:user.id} , refreashsigneture as string , {audience , expiresIn : "1y"} )

        return {accessToken , refreshToken}
    }


    decodedToken (token : string) {
        let decoded = jwt.decode(token) as JwtPayload
        // console.log(decoded , "from decodedToken")
        if(!decoded){
            throw new BadRequestException("Token not valid")
        }
        let signeture = undefined
        switch (decoded.aud as string) {
            case "Admin":
                signeture = env.Admin_Signeture
                break;
        
            default:
                signeture = env.User_Signeture
                break;
        }
        let decodedData = jwt.verify(token , signeture as string)
        // console.log(decodedData , "from decodedData")
        if(!decodedData)
            throw new BadRequestException("Token not Vaild")
        return decodedData
    }

    decodedRefreshToken(refreshToken : string){
        let decoded = jwt.decode(refreshToken) as JwtPayload
        if(!decoded){
            throw new BadRequestException("token not vaild")
        }

        let signeture = undefined
        switch (decoded.aud) {
            case "Admin":
                signeture = env.Admin_refresh_Signeture
                break;
        
            default:
                signeture = env.User_refresh_Signeture
                break;
        }

        let decodedData = jwt.verify(refreshToken , signeture as string)
        return decodedData
    }
}





export const TokenService = new tokenService