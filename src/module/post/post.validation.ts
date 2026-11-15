import z from "zod";





export const PostValidation = z.strictObject({
    title : z.string().min(5 , {error : "Title lesa than 5 words"}),
    content : z.string().min(5 , {error : "Title lesa than 5 words"})
})