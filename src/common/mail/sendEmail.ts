import nodemailer, { Mail } from "nodemailer";
import { env } from "../../config/env.service";


const transporter = nodemailer.createTransport({
    service : "gmail",
    auth :{
        user:env.EmailAppAccount,
        pass:env.EmailAppPassword
    }
})



export const SendEmail = async ({ to , subject , html } : Mail.Options) =>{
    const info =  await transporter.sendMail({
        from: `"social media app" <${env.EmailAppAccount}>`,
        to,
        subject,
        html
    })
    console.log("emai send" , info.messageId)
}