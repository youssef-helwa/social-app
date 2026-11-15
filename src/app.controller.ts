import express from "express"
import type{Express ,Request , Response} from "express"
import { env } from "./config/env.service"
import { DBconnection } from "./database/DBconnection/connection"
import {redisService}  from "./common/service/redis.service"
import { globalErrorHandeler } from "./middleware/errorhandling"
import { BadRequestException } from "./common/exceptions/error.responce"
import { s3service } from "./common/service/S3.service"
import { promisify} from "util"
import { pipeline } from "stream"
import { createHandler } from 'graphql-http/lib/use/express';
import { schema } from "./module/gql/schema.gql"
import { RealTimeGetway } from "./module/RealTime/realTimeGetway"
import cors from "cors"

import authRouter from "./module/auth/auth.controller"
import UserRouter from "./module/user/user.controller"
import ChatRouter from "./module/chat/chat.controller"




export const bootstrap = async () =>{


    const app : Express = express()
    app.all("/graphQl" , createHandler({schema : schema , context : (req) =>({ req }) }))
    app.use(cors({
        origin : "*"
    }))


    const s3GetFile = promisify(pipeline)
    app.use(express.json())


    await DBconnection()

    await redisService.connection()
    app.get('/check' , (req : Request , res : Response) =>{
        res.json({
            message : "healthy👍"
        })
    })

    app.use('/auth',authRouter)
    app.use('/user',UserRouter)
    app.use("/chat" , ChatRouter)
    

    app.get("/uplaods/*path" , async (req : Request , res : Response) =>{

        let { path } = req.params as {path : string[]}

        if(path?.length == 0){
            throw new BadRequestException("path not found")
        }
        let key = path.join("/")
        // let data = await s3service.getFile({key})
        let {Body , ContentType} = await s3service.getFile({key})
        s3GetFile(Body as NodeJS.ReadableStream , res)
        res.setHeader("Content-Type" , ContentType || "application/octet-stream")
        res.set("Cross-Origin-Resource-Policy" , "ceoss-Origin")
        return res
    })

    app.use("*dummy" , (req:Request , res:Response) =>{
        throw new BadRequestException("URL is wrong")
    })

    app.use(globalErrorHandeler)
    console.log(env.port)

    const httpServer = app.listen(env.port , () =>{
        console.log("server is running👌")
    })

    const realTimeGetway = new RealTimeGetway()
    realTimeGetway.initializer(httpServer)
    
    
}