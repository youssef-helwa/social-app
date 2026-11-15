import { JwtPayload } from "jsonwebtoken"
import { TokenService } from "../../../common/service/token.service"
import  {postService}  from "../post.service"
import { GQLValidation } from "../../../common/service/vaildation"
import { PostValidation } from "../post.validation"
import { BadRequestException, MapGQLExeptions } from "../../../common/exceptions/error.responce"





class PostResolver {

    private PostService : postService
    constructor(){
        this.PostService = new postService()
    }


    postList = async(parent : any , args : any , context : any) =>{
        let tokenHeaders  = context.req.headers.authorization
        let [flag , token] = tokenHeaders.split(" ")
        let decoded = TokenService.decodedToken(token)
        // console.log(decoded)
        let {id} = decoded as JwtPayload

        GQLValidation(PostValidation , args)
        throw MapGQLExeptions(new BadRequestException("errorrrrrrrrrr"))
        // let decodedData
        // let postData = await this.PostService.getAllPost()
        // return {message : postData}

    }


    createPost = async (parent : any , args :any , context : any) => {
        let tokenHeaders  = context.req.headers.authorization
        let [flag , token] = tokenHeaders.split(" ")
        let decoded = TokenService.decodedToken(token)
        console.log(decoded)
        let {id} = decoded as JwtPayload
        
        let addedpost = await this.PostService.CreatePost({...args , userId : id , comments: id })
        return addedpost
    }
}


export const postResolver = new PostResolver()