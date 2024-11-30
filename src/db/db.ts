import dotenv from "dotenv"
import mongoose from "mongoose"
dotenv.config()

const dbUrl=process.env.DATABASE_URL as string;
console.log(dbUrl)

const dbConnection = async()=>{
   try{
      await mongoose.connect(dbUrl);
      console.log("database connected successfully")
   }
   catch(error:any){
      console.log(`error in database connection ${error}`);
   }
}
export default dbConnection;