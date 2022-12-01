const app = require("./index")
const connect=require("./configs/db")
const dotenv = require('dotenv').config()
const port = process.env.PORT || 6000 

// server
module.exports= app.listen(port,async function(){
   try{
       
       await connect();
       console.log(`listen port ${port} is running `);

} catch(err){
    console.log("some thing wrong")
}
  
})