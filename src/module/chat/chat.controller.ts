import { Request, Response, Router } from "express";
import { chatService } from "./chat.service";
import { auth } from "../../middleware/auth.middelware";
import { successResponce } from "../../common/exceptions/success.responce";



const router = Router()

router.get("/Get-Groups" , auth , async(req : any , res :any ) =>{
    let data = await chatService.getGroups(req.user.id)
    successResponce({res , message : "Get Groups" , data})
})

router.get("/:participatId" , auth , async(req : any , res :any ) =>{
    let data = await chatService.getChat(req.params.participatId , req.user.id)
    successResponce({res , message : "Chat conversation" , data})
})

router.post("/group"  , auth ,async (req: any , res : any) =>{
    let data =  await chatService.CreateGroupe(req.user.id , req.body)
    successResponce({res , message : "Group created" , data})
})

router.get("/group/:groupId"  , auth ,async (req: any , res : any) =>{
    let data =  await chatService.GetChatGroup(req.params.groupId , req.user.id)
    successResponce({res , message : "Group found" , data})
})



export default router