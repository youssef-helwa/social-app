import { NextFunction, Request, Response } from "express"
import { ZodType } from "zod"
import { BadRequestException, MapGQLExeptions } from "../exceptions/error.responce"


type validationKey = keyof Request

type validationschema = Partial<Record<validationKey , ZodType>>


export const Validation = (schema : validationschema) =>{
    return (req : Request , res : Response , next : NextFunction) =>{
        let ValidationError = []
        for (const key of Object.keys(schema) as validationKey[]) {
            if(!schema[key]){
                throw new BadRequestException("validation Error")
            }

            let value = schema[key].safeParse(req[key])
            // console.log(value , "from validation value")
            // console.log(schema[key] , "from validation schema[key")
            if(!value.success){
                ValidationError.push({
                    key, 
                    issue : value.error.issues
                })
                if(ValidationError.length > 0){
                    throw new BadRequestException("validation Error" , ValidationError)
                }
            }
            next()
            
        }
    }
}


export const GQLValidation = (schema : ZodType , args : any) =>{
    const validationResulte = schema.safeParse(args)
    console.log(validationResulte.error?.issues , "from vaildation")
    let errorMessage = []

    if(!validationResulte.success){
        errorMessage.push(validationResulte.error?.issues)
        throw MapGQLExeptions(new BadRequestException("validation error" , {error : errorMessage}))  
    }
    return true
}