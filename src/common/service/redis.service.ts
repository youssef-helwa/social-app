import { createClient, RedisClientType } from "@redis/client"
import { env } from "../../config/env.service"
import { Types } from "mongoose"







export class RedisService{
    private client : RedisClientType

    constructor(){
        this.client = createClient({url : env.Redis_URL as string})
        this.handleconnection()
    }

    handleconnection(){
        this.client.on("error" , (error)=>{
            console.log("redis connection error" , error)
        })

        this.client.on("ready" , () =>{
            console.log("redis connected👌")
        })
    }

    async connection() {
        if (!this.client.isOpen) {
            await this.client.connect()
        }
    }

    createRevokeToken({
        userId,
        token
    } : {
        userId : Types.ObjectId,
        token : string
    }) : string{
        return `revokeToken::${userId}:${token}`
    }

    async set({key , value , ttl} : {
        key :string,
        value: any,
        ttl?: number
    }){
        if(typeof value == "object"){
            value = JSON.stringify(value)
        }
        return ttl? await this.client.set(key,value,{EX :ttl}) : await this.client.set(key,value)
    }

    async get(key: string){
        return await this.client.get(key)
    }

    async ttl(key: string){
        return await this.client.ttl(key)
    }

    async exists({key} : {key: string}){
        return await this.client.exists(key)
    }

    async redis_del({key} : {key: string}){
        return await this.client.del(key)
    }

    async mget(...keys : string[]){
        return await this.client.mGet(keys)
    }

    key(userId : Types.ObjectId){
        return `user:socket:${userId}`
    }

    async addSocket(userId : Types.ObjectId , socketId :string){
        return await this.client.sAdd(this.key(userId) , socketId)
    }
    
    async removeSocket(userId : Types.ObjectId , socketId :string){
        return await this.client.sRem(this.key(userId) , socketId)
    }

    async getSocket(userId : Types.ObjectId){
        return await this.client.sMembers(this.key(userId))
    }

    async hasSocket(userId : Types.ObjectId){ 
        return await this.client.sCard(this.key(userId))
    }

    async removeUser(userId : Types.ObjectId){
        return await this.client.del(this.key(userId))
    }
}


export const redisService = new RedisService()

