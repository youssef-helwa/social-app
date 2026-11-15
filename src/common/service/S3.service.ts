import {  DeleteObjectCommand, GetObjectCommand, ObjectCannedACL, PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { env } from "../../config/env.service"
import { multerStorageEnums } from "../enums/multer.enum"
import {createReadStream} from "fs"
import { Upload } from "@aws-sdk/lib-storage"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

// import { ObjectCannedACL, PutObjectAclCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
// import { env } from "../../config/env.service";
// import {multerStorageEnums} from "../enums/multer.enum"
// import {createReadStream} from "fs"



// class s3service {
//     private client : S3Client
//     constructor(){
//         this.client = new S3Client({
//             region : "us-east-1",
//             credentials : {
//                 accessKeyId : env.AWS_Access_Key as string,
//                 secretAccessKey : env.AWS_Secrit_Access_Key as string
//             }
//         })
//     }


//     async uploadFile({
//         storagekey = multerStorageEnums.memoryStorage,
//         Bucket = "c64",
//         path = "general",
//         file,
//         ACL = ObjectCannedACL.private,
//         contentType,
//     } : {
//         storagekey ?: multerStorageEnums,
//         Bucket ?: string,
//         path ?: string,
//         file : Express.Multer.File,
//         ACL ?: ObjectCannedACL,
//         contentType ?: string ,
//     }){

//         const key = `socialmedia/${path}/${Math.round(Date.now() / 1000)}-${file.originalname}`
//         const result = await this.client.send(
//             new PutObjectCommand({
//                 Bucket,
//                 Key: key,
//                 Body : storagekey ==  multerStorageEnums.memoryStorage ? file.buffer : createReadStream(file.path),
//                 ACL,
//                 ContentType:contentType

//             })
//         )

//     }
// }



export class S3Service {
    private client : S3Client
    constructor(){
        this.client = new S3Client({
            region:"us-east-1",
            credentials :{
                accessKeyId: env.AWS_Access_Key as string,
                secretAccessKey: env.AWS_Secrit_Access_Key as string
            }
        })
    }


    async uploadFile({
        storageKey = multerStorageEnums.memoryStorage,
        Bucket = "C46",
        path = "general" ,
        file ,
        ACL = ObjectCannedACL.private,
        contentType
    } :{
        storageKey ?: multerStorageEnums
        Bucket ?: string,
        path ?:string ,
        file:Express.Multer.File,
        ACL ?:ObjectCannedACL,
        contentType?: string
    }) {
        const key = `socialmedia/${path}/${Math.round(Date.now() / 1000)} - ${file.originalname}`
        const result = await this.client.send(
            new PutObjectCommand({
                Bucket,
                Key: key,
                Body : storageKey == multerStorageEnums.memoryStorage ? file.buffer : createReadStream(file.path) ,
                ACL,
                ContentType : contentType
            })
        )
        return result
    }

    async uploadBigFile({
        storageKey = multerStorageEnums.memoryStorage,
        Bucket = "C46",
        path = "general",
        file,
        ACL = ObjectCannedACL.private,
        contentType,
        partSize = 5
    } : {
        storageKey ?:multerStorageEnums,
        Bucket ?: string,
        path ?: string,
        file : Express.Multer.File,
        ACL ?: ObjectCannedACL,
        contentType ?: string,
        partSize ?: number
    }) {
        const key = `socialmedia/${path}/${Math.round(Date.now() / 1000)} - ${file.originalname}`
        const result = await new Upload({
            client: this.client,
            params:{
                Bucket,
                Key : key,
                Body : storageKey == multerStorageEnums.memoryStorage ? file.buffer : createReadStream(file.path),
                ContentType: contentType,
            },
            partSize : partSize * 1024 *1024
        })
    result.on("httpUploadProgress" , (process) =>{
        console.log(`${(process.loaded as number) / (process.total as number) * 100}%`)
    })
    return await result.done()
    }


    async getFile({
        Bucket = "c64",
        key,
    } :{
        Bucket?: string,
        key : string,
    }){
        const file = await new GetObjectCommand({
            Bucket,
            Key : key,
        })
        return await this.client.send(file)
    }

    async createPreSignUrl ({
        Bucket = "c64",
        path = "general",
        contentType , 
        Key ,
        Expire = 60 * 2,
        OriginalName,
    } : {
        Bucket ?: string,
        path ?: string,
        contentType ?: string , 
        Key ?: string ,
        Expire ?: number,
        OriginalName ?: string,

    }) {
        const key = `socialmedia/${path}/${Math.round(Date.now() / 1000)} - ${OriginalName}`
        const result = await new PutObjectCommand({
            Bucket,
            Key : key,
            ContentType : contentType
        })

        const url = await getSignedUrl(this.client , result , {
            expiresIn : Expire
        })
        return url

    }

    async DeleteFile({
        Bucket = "c64",
        Key
    } : {
        Bucket ?: string,
        Key : string
    }){
        const result = await new DeleteObjectCommand({
            Bucket,
            Key
        })
        return this.client.send(result)
    }
}


export const s3service = new S3Service()



