const mongoose = require('mongoose');
// database connection
const connect = ()=>{
    return mongoose.connect("mongodb://127.0.0.1:27017/pagination");
};

module.exports=connect;