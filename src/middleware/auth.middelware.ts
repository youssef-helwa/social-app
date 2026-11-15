import { NextFunction, Request, Response } from "express";
import { BadRequestException } from "../common/exceptions/error.responce";
import {TokenService} from "../common/service/token.service";




export interface UserRequest extends Request{
    user?: any
} 

export const auth = (req : UserRequest , res : Response , next : NextFunction) =>{
    
    if(!req.headers.authorization){
        throw new BadRequestException("Token Not found")
    }

    let [flag , token] = req.headers.authorization.split(" ")
    let decodedData =  TokenService.decodedToken(token as string)

    if(!decodedData){
        throw new BadRequestException("Token Not vaild")
    }

    req.user = decodedData
    next()
}