import mongoose from "mongoose";
const connectDB=async()=>{
    try
    {
        const DB_OPTIONS=
        {
            dbName:process.env.DBNAME
        }
        await mongoose.connect("mongodb://localhost:27017",DB_OPTIONS)
        console.log("connected successfully")
    }
    catch(err)
    {
        console.log(err)
    }

}
export default connectDB