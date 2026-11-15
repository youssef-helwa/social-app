import { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { oneUserType } from "../../user/gql/user.type.gql";




export const postListTypes = new GraphQLObjectType({
    name : "postlistTypes",
    fields: {
        message : {type : GraphQLString}
    }
})




export const OnePostType = new GraphQLObjectType({
    name :"onePostType",
    fields :{
        title: {type : GraphQLString},
        content : {type : GraphQLString},
        userId : {type : GraphQLID},
        comments : {type :new GraphQLList(GraphQLString)},
        createdAt : {type : GraphQLString},
        likes : {type : new GraphQLList(oneUserType)},
        tags : {type : new GraphQLList(oneUserType)},
        deletedAt : {type : GraphQLString},
        restoredAt : {type : GraphQLString}
    }
})


export const getAllPostsType = new GraphQLObjectType({
    name :"GetAllPostsTypes",
    fields : {
        message : {type : new GraphQLList(OnePostType)}
    }
})



export const createPostType = new GraphQLObjectType({
    name : "createPostType",
    fields: {
        message : {type : GraphQLString}
    }
})