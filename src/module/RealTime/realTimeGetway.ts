import { Server } from "socket.io";
import { TokenService } from "../../common/service/token.service";
import { BadRequestException } from "../../common/exceptions/error.responce";
import { redisService } from "../../common/service/redis.service";
import { realTimeChatGetway } from "../chat/realtime/RealTimeChat.Getway";




export class RealTimeGetway {
    constructor(){ 
    }

    async authonticat(socket : any  , next :any){
        try {
            let decoded = TokenService.decodedToken(socket.handshake.auth.token)
        if(!decoded){
            throw new BadRequestException("invaild Token")
        }
        let userId = (typeof decoded === "object" && decoded.id)
        socket.data = decoded
        // console.log(`socketId: => ${socket.id} , userId : => ${userId}`)
        next()
        } catch (error) {
            next(error as Error)
        }
    }


    initializer = (httpServer : any) =>{
        const io = new Server(httpServer , {
            cors : {
                origin : "*"
            }
        } )

        io.use(this.authonticat.bind(this))

        

        io.on("connection" , async(socket) =>{
            try {

                let userId = socket.data.id
                // console.log(`socketId: =>${socket.id}`)
                // console.log(socket.handshake.auth.token)
                // console.log(`userId : => ${userId}` , await redisService.getSocket(userId) , "from redis in app.controller")
                // console.log(`SokcetId: => ${socket.id}  , userId :=> ${userId}`)
                realTimeChatGetway.register(socket , io)

                await redisService.addSocket(userId , socket.id)

                socket.on("disconnect" , async(reason  :any) =>{
                    // console.log(`socketId disconnected: => ${socket.id}` )
                    console.log("SOCKET DISCONNECTED:", {socketId: socket.id,userId,reason})
                    await redisService.removeSocket(userId , socket.id)
            })

            // socket.on("sayHi" , (data , callback)=>{
            //     console.log(data)
            //     // callback("backend recived the message")
            //     socket.emit("send" , "typing..........")
            // })
        } catch (error) {
            console.log("SOCKET CONNECTION ERROR:", error);
            socket.emit("custom_error" , error)
        }

    })
    }
}