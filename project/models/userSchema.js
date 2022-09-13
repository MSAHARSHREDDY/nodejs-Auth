import mongoose from "mongoose";
//creating schema
const userSchema=new mongoose.Schema({
name:{type:String, required:true},
email:{type:String, required:true},
password:{type:String, required:true}
})
//creating model
const userModel=mongoose.model("user",userSchema)
export default userModel