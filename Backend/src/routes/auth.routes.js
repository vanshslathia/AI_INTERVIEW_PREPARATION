const express=require("express")
const authController=require("../controllers/auth.controller")
const {authUser}=require("../middlewares/auth.middleware")
const authRouter=express.Router()

/** 
 * @routes POST/api/auth/register
 * @description register a new user
 * @access Public 
*/
authRouter.post("/register",authController.registerUserController)

/** 
 * @routes POST/api/auth/login
 * @description login a  user
 * @access Public 
*/
authRouter.post("/login",authController.loginUserController)

/** 
 * @routes GET/api/auth/logout
 * @description  clear token from user cookie and token in the black list 
 * @access Public 
*/

authRouter.get("/logout",authController.logoutUserController)

/** 
 * @routes GET/api/auth/get-me
 * @description  get the current login user details
 * @access Private 
*/
//middleware bi aa rha hoga jo identify karega req kis user ne kari h.
authRouter.get("/get-me",authUser,authController.getMeController)

module.exports=authRouter