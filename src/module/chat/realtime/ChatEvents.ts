import { IChat } from "../../../common/interfaces/chat.interface"
import { redisService } from "../../../common/service/redis.service"
import { ChatModel } from "../../../database/model/chat.model"
import { chatService, ChatService } from "../chat.service"




export class ChatEvent{
    private chatService : ChatService
    constructor() { 
        this.chatService = chatService
    }


    sayHi(socket : any){
        let message = this.chatService.message()
        return socket.on("sayHi" , (data : any) =>{
            console.log(data)
        })
    }


    addMessage(socket : any , io : any){
        return socket.on("sendMessage" , async(data: any)=>{
            let { content , sendTo} = data
            let senderSocketId = await redisService.getSocket(socket.data.id)
            let reseverSocketId = await redisService.getSocket(sendTo)
            let socketIds = [ ...senderSocketId , ...reseverSocketId]
            let chat = await this.chatService.addChat(content , socket.data.id , sendTo)
            io.to(senderSocketId).emit("successMessage" ,{ content , sendTo} )
            if(reseverSocketId.length > 0){
                io.to(reseverSocketId).emit("newMessage" , {content , from : socket.data.id})
            }
            
        })
    }

    joinRoom(socket: any, io: any) {

    socket.on("join_room", async (data: any, callback: any) => {

        try {
            await socket.join(data.roomId);

            const members = await io.in(data.roomId).fetchSockets();

            console.log("JOIN SUCCESS:", {
                socketId: socket.id,
                roomId: data.roomId,
                members: members.length
            });

            callback?.({
                success: true,
                roomId: data.roomId,
                members: members.length
            });

        } catch (error) {
            console.log("JOIN ROOM ERROR:", error);

            callback?.({
                success: false,
                error: String(error)
            });
        }
    });
}

    addGroupMessage(socket : any , io : any){
        return socket.on("sendGroupMessage" , async(data: any)=>{

            // console.log(data , "from Group socket")
            let { content , groupId} = data
            let chat = await this.chatService.addChatGroup(content , socket.data.id , groupId)
            
            const group = await ChatModel.findById(groupId).select("roomId")

            if (!group) {
                return socket.emit("messageError", {
                    message: "Group not found"
                });
            }

            const roomId = group.roomId

            const sockets = await io.in(roomId).fetchSockets();

            io.to(roomId).emit("newGroupMessage", {content,groupId,from: socket.data.id});
        })
    }


}