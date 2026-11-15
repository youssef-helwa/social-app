import {Router , type Request , type Response} from "express"
import { successResponce } from "../../common/exceptions/success.responce"
import Authservice from "./auth.service"
import { auth, UserRequest } from "../../middleware/auth.middelware"
import { CheckRole } from "../../middleware/checkRole.middelware"
import { uploadFile } from "../../common/utils/multer/cloud"
import { multerStorageEnums } from "../../common/enums/multer.enum"
import { Validation } from "../../common/service/vaildation"
import { SignupSchema } from "./auth.validation"


const router: Router = Router()


router.get('/alluser' ,auth , CheckRole(['0']) , async (req :UserRequest , res : Response) =>{
    let data = await Authservice.GetAllUser()
    successResponce({res , message:"all User successfully" , data})
})

router.post('/signup' ,uploadFile({}).single("file") , Validation(SignupSchema) , async (req :Request , res : Response) =>{
    console.log(req.body)
    let data = await Authservice.signup(req.body , req.file as Express.Multer.File)
    successResponce({res , message:"signup successfully" , data})
})

router.post('/login' ,async (req :Request , res : Response) =>{
    let data = await Authservice.login(req.body)
    successResponce({res , message:"login successfully" , data})
})


router.put("/verify-user-account" , async (req :Request , res : Response) =>{
    let data = await Authservice.VerifyAccount(req.body)
    successResponce({res , message:"login successfully" , data})
})






export default router