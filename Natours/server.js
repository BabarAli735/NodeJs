const express = require("express");
const dotenv=require('dotenv')
const app = express();
dotenv.config({path:'./config.env'})
const port = 300;
//4 SERVER
app.listen(port, () => {
    console.log("appp runing");
  });

 