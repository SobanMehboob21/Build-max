import express from 'express'
import {UserAuthSignUp,UserAuthLogin} from '../controllers/UserAuthControllers.js'

const router=express.Router()

router.post("/signup",UserAuthSignUp)
router.post("/login",UserAuthLogin)
export default router;


