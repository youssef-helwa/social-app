import { resolve } from "nodemailer/lib/shared/url.js"
import { HelloworldGqlArgs } from "./user.args.gql"
import { helloworldQueryTypes } from "./user.type.gql"
import { userresolver } from "./user.resolve.gql"



class UserGQLSchema {
    constructor(){ }


    registerQuery(){
        return {
            helloWorld : {
                type : helloworldQueryTypes,
                args : HelloworldGqlArgs,
                resolve:userresolver.helloWorldResolver
            }
        }
    }
}



export const userGqlSchema = new UserGQLSchema