import type{ NextFunction, Request, Response} from "express"

export const globalErrorHandeler = (err :any , req:Request , res:Response , next : NextFunction) =>{
    res.status(err.status || 500).json({
        message : err.message,
        stack : err.stack,
        cause : err.cause,
        err
    })
}