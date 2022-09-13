import jwt from "jsonwebtoken"
import userModel from "../models/userSchema.js";
const requireAuth=(req,res,next)=>
{
    const token=req.cookies.jwtoken;
    if(token)
    {
        //verify method is used to verify token
        jwt.verify(token,"mynameismalladisaharshreddy",(err,decodedToken)=>{
            if(err)
            {
                
                res.redirect("/login")
            }
            else
            {
                console.log(decodedToken)
                console.log("verified token")
                next()
            }
        
        })
    }
    else
    {
        console.log("token is not verified")
        res.redirect("/login")
    }
}

//check user
const checkuser=(req,res,next)=>
{
  const token=req.cookies.jwtoken
  if(token)
  {
    jwt.verify(token,"mynameismalladisaharshreddy",async(err,decodedToken)=>{
      if(err)
      {
        console.log(err.message)
        res.locals.saharsh=null
        next()
      }
      else
      {

        console.log(decodedToken);
        let user=await userModel.findById(decodedToken.id)
        res.locals.saharsh=user
        next()
        
      }
    
    })
  }
  else
  {
    res.locals.saharsh=null
    next()
  }
}

export {requireAuth,checkuser}