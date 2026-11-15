import { ChatEvent } from "./ChatEvents"




export class ChatGetway {
    private chatEvent : ChatEvent
    constructor(){
        this.chatEvent = new ChatEvent()
    }

    register(socket : any , io :any){
        socket.onAny((event: string, ...args: any[]) => {
        console.log("SERVER RECEIVED:", event, args);
    });

        // this.chatEvent.sayHi(socket)
        this.chatEvent.addMessage(socket , io)
        this.chatEvent.addGroupMessage(socket , io)
        this.chatEvent.joinRoom(socket , io)
    }
}


export const realTimeChatGetway = new ChatGetway()