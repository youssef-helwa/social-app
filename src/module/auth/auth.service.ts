import { BadRequestException } from "../../common/exceptions/error.responce"
import { IUser } from "../../common/interfaces/user.interface"
import { CompareHash, GenerateHash } from "../../common/security/security"
import { redisService } from "../../common/service/redis.service"
import { s3service } from "../../common/service/S3.service"
import {TokenService} from "../../common/service/token.service"
import { userModel } from "../../database/model/user.model"
import { DataBaseReposatory } from "../../database/reposatory/DB.Repo"
import { SignupDTO } from "./auth.dto"



class Authservice {

    private userReposatory : DataBaseReposatory<IUser>
    constructor(){
        this.userReposatory = new DataBaseReposatory(userModel)
    }

    async GetAllUser() {
        let user = await this.userReposatory.findAll()
        return user
    }

    async signup (data : SignupDTO , file : Express.Multer.File){
        let {userName , email , phone , password , confirmEmail , gender , role } = data
        let existEmail = await this.userReposatory.findone({filter : {email}})
        if(existEmail){
            throw new BadRequestException("email is exist")
        }
        
        let hashpassword = await GenerateHash({plaintext : password})

        if(file){
            let pic = await s3service.uploadFile({file})
            console.log(pic , "from Pic")
        }

        const otp = Math.floor(100000 + Math.random() * 900000)
        console.log("userName before create:", userName)
        
        let user = await this.userReposatory.create({userName , email , phone , password : hashpassword , confirmEmail , gender , role })
        redisService.set({
            key: `otp::${user._id}`,
            value : otp,
            ttl : 60 * 5

        })

        return {user }
    }

    async login (data : IUser) {
        let {email , password} = data
        let userData = await this.userReposatory.findone({filter : {email}})
        if(!userData){
            throw new BadRequestException("Email is worng")
        }
        let verfiypass = await CompareHash({plaintext : password , cyphertext : userData.password})
        if(!verfiypass){
            throw new BadRequestException("password is not correct")
        }
        let {accessToken , refreshToken} = TokenService.generateToken(userData)
        return {userData, accessToken , refreshToken}
    }


    async VerifyAccount (data: any) {
        let {email , otp} = data
        let userData = await this.userReposatory.findone({filter :{email}})
        if(!userData){
            throw new BadRequestException("user not found")
        }
        let userOtp = await redisService.get(`otp::${userData._id}`) 
        if(otp === userOtp){
            let updateuser = await this.userReposatory.updateOne({filter : {_id: userData._id} , data : {confirmEmail : true}})
            return {message :"user verfied"}
        }else {
            throw new BadRequestException("OTP not matched")
        }
    }
    
}

export default new Authservice