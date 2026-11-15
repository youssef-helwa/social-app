import dotenv from "dotenv"

dotenv.config({path : './.env.dev'})

const port : string | undefined = process.env.PORT
const DB_URL = process.env.DB_URL 
const salt = process.env.SALT
const EmailAppPassword = process.env.EMAIL_APP_PASS
const EmailAppAccount = process.env.EMAIL_APP_ACCOUNT
const Admin_Signeture = process.env.ADMIN_SIGNETURE
const User_Signeture = process.env.USER_SIGNETURE
const Admin_refresh_Signeture = process.env.ADMIN_REFRESH_SIGNETURE
const User_refresh_Signeture = process.env.USER_REFRESH_SIGNETURE
const AWS_Access_Key = process.env.AWS_ACCESS_KEY
const AWS_Secrit_Access_Key = process.env.AWS_SECRIT_ACCESS_KEY
const Redis_URL = process.env.REDIS_URL



export const env = {
    port,
    DB_URL,
    salt,
    EmailAppAccount,
    EmailAppPassword,
    Admin_Signeture,
    User_Signeture,
    Admin_refresh_Signeture,
    User_refresh_Signeture,
    AWS_Access_Key,
    AWS_Secrit_Access_Key,
    Redis_URL
}