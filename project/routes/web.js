import express from "express"
import studentController from "../controllers/studentController.js"
import {  requireAuth,checkuser} from "../middleware/authMiddleware.js"
const router=express.Router()


//verification of token
import cookieParser from "cookie-parser"
router.use(cookieParser())


router.get("*",checkuser)
router.get("/",studentController.home)
router.get("/courses",requireAuth,studentController.courses)

router.get("/signup",studentController.signup_get)
router.post("/signup",studentController.signup_post)
router.get("/login",studentController.login_get)
router.post("/login",studentController.login_post)

router.get("/logout",studentController.logout_get)

export default router