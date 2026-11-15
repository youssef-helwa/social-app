import { GraphQLError } from "graphql"



interface AError {
    message : string,
    status : number,
    cause?: unknown
}

export class ApplicationException extends Error implements AError{
        constructor(message :string , public status: number , cause?:unknown){
            super(message , {cause})
            this.message = message
            this.cause = cause
        }
}


export const MapGQLExeptions = (error : ApplicationException) =>{
    throw new GraphQLError(error.message , {extensions: {statusCode : error.status , cause : error.cause || {}}})
}


export class BadRequestException extends ApplicationException {
    constructor(message : string = "Bad Request" , cause ?: unknown){
        {
            super(message , 400 , cause)
        }
    }
}

export class NotFoundException extends ApplicationException{

    constructor(message:string = "Not Found" , cause?:unknown ){
        super(message , 404 , cause)
    }
}

export class confilictException extends ApplicationException{
    constructor(message : string = "confilict error" , cause ?: unknown){
        super(message , 409 , cause)
    }
}


export class UnAuthorizeException extends ApplicationException{
    constructor(message : string = "UnAuthorize error" , cause?: unknown){
        super(message , 401 , cause)
    }
}

export class ForbiddenExeption extends ApplicationException{
    constructor(message : string = "Forbidden error" , cause?: unknown){
        super(message , 403 , cause)
    }
}