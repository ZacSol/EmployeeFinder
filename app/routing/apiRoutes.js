const express=require("express");
const router=express.Router();
const employeeList=require("../data/employees.js");

router.get("/api/employees",function(req,res){
    // res.send("Hello Get Employees");
    res.json(employeeList);
});

router.post("/api/employees",function(req,res){
    // res.send("Hello Post Employees");
    employeeList.push(req.body);
    res.json({success:true});
});

module.exports=router;