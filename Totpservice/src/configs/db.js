const mongoose = require("mongoose");
// database connection
// with the help of mongoose connect we are connect our mongodb data base into our nodejs
const connect = () => {
  return mongoose.connect("mongodb://127.0.0.1:27017/pagination"); // Mongodb url link
};

module.exports = connect;
