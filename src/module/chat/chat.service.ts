import { Types } from "mongoose"
import { ChatEnum } from "../../common/enums/chat.enum"
import { BadRequestException, NotFoundException } from "../../common/exceptions/error.responce"
import { IChat } from "../../common/interfaces/chat.interface"
import { ChatModel } from "../../database/model/chat.model"
import { DataBaseReposatory } from "../../database/reposatory/DB.Repo"
import { ChatEvent } from "./realtime/ChatEvents"
import { IUser } from "../../common/interfaces/user.interface"
import { userModel } from "../../database/model/user.model"
import {randomUUID} from "crypto"






export class ChatService {
    private chatReposatory : DataBaseReposatory<IChat>
    private userReposatory : DataBaseReposatory<IUser>
    constructor(){ 
        this.chatReposatory = new DataBaseReposatory<IChat>(ChatModel)
        this.userReposatory = new DataBaseReposatory<IUser>(userModel)
    }


    message(){
        return true
    }


    async getChat(participatId : string , userId : string){
        // participatID that have (Reseviver ID)
        let chat = await this.chatReposatory.findone({
            filter : {
                participats:{
                    $all : [participatId , userId]
                }
            },
            populate : "participats"
        })
        if(!chat){
            throw new NotFoundException("No chat Found")
        }
        return chat
    }


    async addChat(content : string ,  userId : string , participatId : string){
        
        // participats that have (Sender and Reseviver IDs)

        console.log(participatId , userId , "for Addchat")
        let chat = await this.chatReposatory.updateOne({
            filter :{
                participats : {
                    $all : [new Types.ObjectId(participatId) , new Types.ObjectId(userId)]
                },
                type : ChatEnum.ovo
            },
        data : {
            $push : {
                message : {
                    content,
                    createdBy : new Types.ObjectId(userId)
                }
            }
        }
        })
        console.log(chat)
        
        if(!chat.modifiedCount) {
            let addChat = await this.chatReposatory.create({
                participats : [new Types.ObjectId(participatId) ,new Types.ObjectId(userId)],
                createdBy : new Types.ObjectId(userId),
                type: ChatEnum.ovo,
                message : [{
                    content,
                    createdBy : new Types.ObjectId(userId)
                }]
            })
            return addChat
        }
        return chat
    }


    async CreateGroupe(userId : string , body : any){
        let {group , participats} = body
        let participatIds = [...new Set(participats.map((ele: string) =>{
            return new Types.ObjectId(ele)
        }))]

        let users = await this.userReposatory.findAll({
            filter: {
                _id : { $in : participatIds },
                friends : {$in : [ new Types.ObjectId(userId) ]}
            }})

            if(participatIds.length != users.length){
                throw new BadRequestException("Invalid participants")
            }else{
                let roomId = randomUUID()

                let groupParticipants = [
                    ...participatIds,
                    new Types.ObjectId(userId)
                ];

                let chattingGroup = await this.chatReposatory.create({
                    participats : groupParticipants as Types.ObjectId[],
                    createdBy : new Types.ObjectId(userId) ,
                    message : [],
                    type : ChatEnum.ovm,
                    group,
                    roomId
                })
                return chattingGroup
            }

    }

    async getGroups(userId: string) {
    let groups = await this.chatReposatory.findAll({
        filter: {
            participats: {
                $in: [new Types.ObjectId(userId)]
            },
            type: ChatEnum.ovm  
        }
    });

    return groups;
}

    async GetChatGroup(groupId : string , userId : string){
        let chatGroup = await this.chatReposatory.findone({
            filter : {
                _id : new Types.ObjectId(groupId),
                participats : {$in : [new Types.ObjectId(userId)]},
                type :ChatEnum.ovm
            },
            populate : "participats"
        })
        if(!chatGroup){
            throw new NotFoundException("Chat group not found")
        }
        return chatGroup
    }

    async addChatGroup(content : string ,  userId : string , groupId : string){
        
        // participats that have (Sender and Reseviver IDs)

        console.log(userId , "for Addchat")
        let chat = await this.chatReposatory.updateOne({
            filter :{
                participats : {
                    $all : [new Types.ObjectId(userId)]
                },
                type : ChatEnum.ovm
            },
        data : {
            $push : {
                message : {
                    content,
                    createdBy : new Types.ObjectId(userId)
                }
            }
        }
        })
        console.log(chat)
        
        if(!chat.modifiedCount) {
            throw new NotFoundException("Chat Group Not Found")
        }
        return chat
    }
}


export const chatService = new ChatService()