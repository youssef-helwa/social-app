import z from "zod";
import {SignupSchema} from "./auth.validation"




export type SignupDTO = z.infer<typeof SignupSchema.body>