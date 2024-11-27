import express from "express"
const app =express();


app.use(express.json())

app.get("/api/v1",(req,res)=>{
   res.json({
      message:"Test api",
      from:"Yehia mohamed"
   })
})

export default app;

/*app.listen(8080,()=>{
   console.log(`app is running on port 8080`);
});*/