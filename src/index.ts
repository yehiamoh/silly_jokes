import express from "express"
import cors from "cors"
import dbConnection from "./db/db";
import errorHandler from "./middleware/error_handler";
import authRouter from "./routes/auth_routes";
import jokeRouter from "./routes/joke_routes";
const app =express();


(async()=>{await dbConnection()})(); //IIFE (Immediately Invoked Function Expression):

app.use(cors());
app.use(express.json());

app.get("/api/v1",(req,res)=>{
   res.json({
      message:"Test api",
      from:"Yehia mohamed"
   })
});
app.use("/api/v0",authRouter);
app.use("/api/v0",jokeRouter);
app.use(errorHandler);

export default app;

app.listen(8080,()=>{
   console.log(`app is running on port 8080`);
});