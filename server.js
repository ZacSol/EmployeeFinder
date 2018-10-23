const express=require("express");
const path=require("path");
const app=express();
const PORT=process.env.PORT||8080;

app.use(express.static("app/public"));
app.use(express.urlencoded({extend:true}));
app.use(express.json());

const apiRoutes=require("./app/routing/apiRoutes.js");
const htmlRoutes=require("./app/routing/htmlRoutes.js");
app.use(apiRoutes);
app.use(htmlRoutes);


app.listen(PORT,function(){
    console.log("Listening on PORT "+PORT);
});

