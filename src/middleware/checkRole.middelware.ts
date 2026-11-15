import { NextFunction, Request, Response } from "express"
import { DataBaseReposatory } from "../database/reposatory/DB.Repo"
import { IUser } from "../common/interfaces/user.interface"
import { userModel } from "../database/model/user.model"
import { UserRequest } from "./auth.middelware"
import { UnAuthorizeException } from "../common/exceptions/error.responce"


let userReposatroy = new DataBaseReposatory<IUser>(userModel)

export const CheckRole = (roles : string[]) =>{
    return  async(req : UserRequest , res : Response, next: NextFunction) =>{
        let userData = await userReposatroy.findById({ id : req.user.id})
        if(roles.includes(String(userData.role))){
            next()
        }else{
            throw new UnAuthorizeException("unAthorized")
        }

    }
}