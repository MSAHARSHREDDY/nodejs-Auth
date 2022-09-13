import mongoose from "mongoose";
import userModel from "../models/userSchema.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const maxAge=3*24*60*60
const createToken=(id)=>
{
    //JWT sign method is used to creating a token the take are three arguments one is a response object, and the second one is a secret key and the last one is an options object for better use of the token.
    return jwt.sign({id},"mynameismalladisaharshreddy",{
        expiresIn:maxAge
    })
}


class studentController
{

    static home=(req,res)=>{
            res.render("home",{"title":"Home"})
    }
    static courses=(req,res)=>
    {
        res.render("courses.ejs",{"title":"Courses"})
    }
    

    static signup_get=(req,res)=>
    {
        res.render("signup",{"title":"Signup"})
    }
    static login_get=(req,res)=>
    {
        res.render("login",{"title":"Login"})
    }

    static signup_post=async(req,res)=>
    {
        const name=req.body.name
        const email=req.body.email
        const password=req.body.password
        //left side "email" is database email
        //right side "email" is user email
        const result=await userModel.findOne({email:email})
        if(result)
        {
            res.send({"status":"error","message":"email already exists"})
        }
        else
        {
            const hashPassword=await bcrypt.hash(req.body.password,10)
            const doc=new userModel({
                name:req.body.name,
                email:req.body.email,
                password:hashPassword
            })
            const result=await doc.save()
            console.log(result)
            const token=createToken(result._id)
            console.log(token)
            //Here "jwtoken" is token name
            //Here "token" is value
            res.cookie("jwtoken",token,{httpOnly:true,maxAge:maxAge*1000})
            res.redirect("/login")
            //res.send({"status":"success","message":"success registration"})
        }
    }





    
    static login_post=async(req,res)=>
    {
        const email=req.body.email
        const password=req.body.password
        //left side "email" is database email
        //right side "email" is user email
        const result=await userModel.findOne({email:email})
        if(result!=null)
        {
            const isMatch=await bcrypt.compare(password,result.password)
            if(email===result.email && isMatch)
            {
                console.log("successfully logged in")
                const token=createToken(result._id)
                console.log(token)
                //Here "jwtoken" is token name
                 //Here "token" is value
                 res.cookie("jwtoken",token,{httpOnly:true})

                res.redirect("/")
            }
            else
            {
                console.log("please verify your email and password")
            }
            
        }
        else
        {
            console.log("You are not a registered user")
        }
    }

    static logout_get=(req,res)=>
    {
        try
        {
            res.cookie("jwtoken","",{maxAge:1})
            res.redirect("/")
        }
        catch(err)
        {
            console.log(err)
        }
    }
       
        
}
export default studentController