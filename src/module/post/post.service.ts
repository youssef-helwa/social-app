import { IPost } from "../../common/interfaces/post.interface";
import { DataBaseReposatory } from "../../database/reposatory/DB.Repo";
import { postModel } from "../../database/model/post.model";






export class postService {
    private PostRepo : DataBaseReposatory<IPost>

    constructor(){
        this.PostRepo = new DataBaseReposatory<IPost>(postModel)
    }


    async getAllPost() {
        let posts = await this.PostRepo.findAll()
        return posts
    }


    async CreatePost (data : IPost ) {
        let post = await this.PostRepo.create(data )
        return {message : "Post created"}
    }
    
}

