import { createPostType, getAllPostsType} from "./post.type.gql"
import { addPostArgs, postListArgs } from "./post.args.gql"
import { postResolver } from "./post.resolve.gql"





class postGQLSchema {
    constructor(){}


    registerQuery () {
        return {
            postList: {
                name : "postListQuery" ,
                type : getAllPostsType ,
                args : postListArgs,
                resolve : postResolver.postList
            }
        }
    }

    registerMutation () {
        return {
            addpost : {
                name :" creaPostMutation",
                type : createPostType ,
                args : addPostArgs ,
                resolve : postResolver.createPost,

            }
        }
    }
}


export const postGqlSchema = new postGQLSchema