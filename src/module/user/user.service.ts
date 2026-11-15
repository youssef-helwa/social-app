import { ParamsDictionary } from "express-serve-static-core";
import { BadRequestException } from "../../common/exceptions/error.responce";
import { IUser } from "../../common/interfaces/user.interface";
import { userModel } from "../../database/model/user.model";
import { DataBaseReposatory } from "../../database/reposatory/DB.Repo";



class UserService {
    private UserRepo : DataBaseReposatory<IUser>
    constructor(){
        this.UserRepo = new DataBaseReposatory<IUser>(userModel)
    }


    async GetAllUsers(){
        let users = await this.UserRepo.findAll()
        if(users.length == 0){
            throw new BadRequestException("thier is no users found")
        }
        return users
    }


    async GetUser(userId : string){
        let user = await this.UserRepo.findone({
            filter : {_id : userId},
            select: "firstName lastName email friends friendRequests",
            populate: "friends friendRequests",
        })
        if(!user) {
            throw new BadRequestException("No user found")
        }
        return user
    }



    async AddFriend (friendIdentifier: string , userId : string){
        let friend = await this.UserRepo.findone({filter : {email :friendIdentifier}})
        if(!friend){
            throw new BadRequestException("No user Found")
        }

        let currentUser = await this.UserRepo.findone({filter : {_id :userId}})
        if(!currentUser){
            throw new BadRequestException("Somthing went wrong on this user")
        }

        if(friend._id.toString() === userId.toString()){
            throw new BadRequestException("you can not added you again")
        }

        let alreadyFriends =  currentUser.friends?.find((r:any)=> r.toString() === friend._id.toString() )
        
        if(alreadyFriends){
            throw new BadRequestException("You are already friends");
        }

        const requestExists = friend.friendRequests?.find(
            (id: any) => id.toString() === userId.toString()
        );
        if (requestExists) {
            throw new BadRequestException("Friend request already sent");
        }
        
        await this.UserRepo.updateOne({
            filter: { _id: friend._id },
            data: {
                $addToSet: {
                    friendRequests: currentUser._id
                }
            }
        });

        return {message: "Friend request sent successfully"};
    }


    async AcceptFriend(friendId: string , userId : string){
        let currentUser = await this.UserRepo.findone({filter : {_id :userId}})
        if(!currentUser){
            throw new BadRequestException("Somthing went wrong on this user")
        }

        const friend = await this.UserRepo.findone({
        filter: { _id: friendId }
        });

        if (!friend) {
            throw new BadRequestException("Friend not found");
        }

        const requestExists = currentUser.friendRequests?.find(
        (id: any) => id.toString() === friendId.toString()
        );

        if (!requestExists) {
            throw new BadRequestException("No friend request found");
        }

        await this.UserRepo.updateOne({
            filter: { _id: userId },
            data: {
                $addToSet: {
                    friends: friend._id
                },
                $pull: {
                    friendRequests: friend._id
                }
            }
        });

        await this.UserRepo.updateOne({
            filter: { _id: friendId  },
            data: {
                $addToSet: {
                    friends: currentUser._id
                }
            }
        });

        return {message: "Friend request accepted successfully"};
    }



    async UpdateUser(id:string , data: IUser){
        let {email, phone ,userName , password} = data
        let UpdateUser = await this.UserRepo.updateOne({filter : {_id : id} , data: {email, phone ,userName , password}})
        if(!UpdateUser){
            throw new BadRequestException("Somthing went wrong")
        }
        return "user Updated"
    }
    

    async DeleteUser(id : string){
        let UserDeleted = await this.UserRepo.deleteOne({filter : {_id : id}})
        if(UserDeleted.deletedCount == 0){
            throw new BadRequestException("somthing went wrong")
        }
        return {UserDeleted ,message  : "user Deleted"}
    }
}


export const userService  = new UserService