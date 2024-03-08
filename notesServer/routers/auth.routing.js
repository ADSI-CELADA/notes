import { Router } from "express";
import { signUp, sigIn, getData } from "../controllers/auth.js";

export const userRouter = Router()

userRouter.post('/signUp', signUp)
userRouter.post('/sigIn', sigIn )
userRouter.get('/userData', getData)