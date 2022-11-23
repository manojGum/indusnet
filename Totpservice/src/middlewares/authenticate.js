const authenticate= async(req,res,next)=>{
    // if(!req.headers.authorization)
        // return res.status(400).send({message:"Authorization token not found or incorrect"});
    
        // if(!req.headers.authorization.startsWith("Bearer"))
        // return res.status(400).send({message:"Authorization token not found or incorrect"});

        // const token=req.headers.authorization.trim().split(" ")[1]
        const jwttoken= await req.cookies.jwttoken
        const  trackId=Math.floor(new Date())
        const timestamp=new Date()
        if(jwttoken==="")
        return res.status(400).send({trackId,message:"one-time password incorrect or already uesed it "});
        if(req.cookies.jwttoken===undefined)
        return res.status(400).send({trackId,message:"Authorization token not found or incorrect"});
        if(!req.cookies.jwttoken)
        return res.status(400).send({trackId,message:"Authorization token not found or incorrect"});

   
req.token=req.cookies.jwttoken;
return next();

}

module.exports= authenticate