import { Request, Response, Router } from "express";
import { userService } from "./user.service";
import { successResponce } from "../../common/exceptions/success.responce";
import { auth, UserRequest } from "../../middleware/auth.middelware";



type AddFriend = {
    friendIdentifier : string
}


const router : Router = Router()
router.get('/' ,auth ,async (req : UserRequest , res : Response) =>{
    let data = await userService.GetUser(req.user.id)
    successResponce({res , message : "user Found" , data})
})

router.get('/users' ,async (req : Request , res : Response) =>{
    let data = await userService.GetAllUsers()
    successResponce({res , message : "Done All users" , data})
})

router.post("/friends/request/:friendIdentifier" ,auth ,async (req : UserRequest & Request<AddFriend> , res : Response) =>{
    let data = await userService.AddFriend(req.params.friendIdentifier , req.user.id)
    successResponce({res , message : "Friend request sent successfully" , data})
})


router.patch("/friends/accept/:friendIdentifier" ,auth ,async (req : UserRequest & Request<AddFriend> , res : Response) =>{
    let data = await userService.AcceptFriend(req.params.friendIdentifier , req.user.id)
    successResponce({res , message : "Friend request accepted successfully" , data})
})


router.put('/update', auth ,async (req : UserRequest , res : Response) =>{
    let data = await userService.UpdateUser(req.user.id , req.body)
    successResponce({res , message : "user updated" , data})
})


router.delete('/delete', auth ,async (req : UserRequest , res : Response) =>{
    console.log(req.user.id)
    let data = await userService.DeleteUser(req.user.id)
    successResponce({res , message : "user Deleted" , data})
})


export default router