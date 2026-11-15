import multer, { diskStorage, memoryStorage } from "multer";
import { multerStorageEnums } from "../../enums/multer.enum";
import {tmpdir} from "os"







export const uploadFile = ({storageKey = multerStorageEnums.memoryStorage} : {
    storageKey ?: multerStorageEnums
}) =>{
    const storage = storageKey == multerStorageEnums.memoryStorage ? multer.memoryStorage() : multer.diskStorage({
        destination: function(req , file , cb){
            cb(null , tmpdir() )
        },
        filename : function(req , file , cb){
            let fileName = Date.now() + `-` + file.originalname
            cb(null , fileName)
        }
    })
    return multer({ storage })
}