const express=require("express");
const handlebar=require("express-handlebars");
const bar=require("body-parser");
const app=express();
require("dotenv").config();
const port=process.env.PORT || 5000;
app.use(bar.urlencoded({extended:false}));
app.use(bar.json());
//static files
app.use(express.static("public"));
app.use('/css',express.static(__dirname+'/node_modules/bootstrap/dist/css'));
const hbr=handlebar.create({extname:"hbs"});
app.engine("hbs",hbr.engine);
app.set("view engine","hbs");
//app.get("/",(req,res)=>{
//    res.render("Home");
//});
const routes=require("./server/routes/router");
app.use("/",routes);
app.listen(port,()=>{
    console.log("Listen port"+port);
})
//module.exports = upload;