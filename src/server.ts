import express from "express"
const app =express();


app.use("api/v1",(req,res)=>{
   res.json({
      message:"Test api",
      from:"Yehia mohamed"
   })
})

app.listen(8080,()=>{
   console.log(`app is running on port 8080`);
});