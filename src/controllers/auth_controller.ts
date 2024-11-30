import { Request,Response,NextFunction, RequestHandler } from "express"
import User from "../models/user"
import bcrypt from "bcrypt"
export const register:RequestHandler = async(req:Request,res:Response,next:NextFunction)=>{
  try{
   const{user_name,password}=req.body;
   if(!user_name||!password){
       res.status(422).json({
         error:"Missing Request Body"
      });
      return;
   }
   const hashedPassword= await bcrypt.hash(password,10);
   const user=await User.create({
      user_name:user_name,
      password:hashedPassword,
   });
   if(user.errors){
       res.status(404).json(
         {
            error:user.errors
         }
      );
      return;
   }
   res.status(201).json({
      message:"User Created",
      user:user.user_name
   })

  }
  catch(error:any){
   console.log(error);
   next(error)
  }
}
