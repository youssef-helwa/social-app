import { graphql, GraphQLString } from "graphql";



export const HelloworldGqlArgs = {
    name : {type : GraphQLString},
    email : {type : GraphQLString},
    password : {type : GraphQLString}
}