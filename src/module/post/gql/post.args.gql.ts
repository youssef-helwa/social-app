import { GraphQLID, GraphQLList, GraphQLString } from "graphql"



export const postListArgs = {
    
}


export const addPostArgs = {
            title: {type : GraphQLString},
            content : {type : GraphQLString},
            userId : {type : GraphQLID},
            comments : {type : new GraphQLList(GraphQLID)},
            likes : {type : new GraphQLList(GraphQLID)},
            tags : {type : new GraphQLList(GraphQLID)},
}