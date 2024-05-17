import {Router} from "express";
import mongoose from "mongoose";
import { machineModel } from "../Schema/machine_model.js";
import { authentication } from "../Middleware/authentication.js";
import { authorization } from "../Middleware/authorization.js";
const machine_route=Router();
machine_route.post("/",authentication,async (req,res)=>{
  if(req?.body){
    let {machineids}=req?.body;
    console.log(machineids)
    let data=await machineModel.find({ machine_id: { $in: [...machineids] } });
    // console.log(data)
    if(data){
        return res.status(200).send({"data":data})
    }
    else{
        return res.status(400).send({
            msg:"data is not found"
        })
    }
  }
  else{
    return res.status(400).send({
        error:"something went wrong in request side"
    })
  }
})
machine_route.get("/",authentication,async (req,res)=>{
    let data=await machineModel.find({});
    if(data){
        return res.status(200).send({
            "data":data
        })
    }
    else{
        return res.status(400).send({
            error:"data is not found"
        })
    }
})
machine_route.post("/addMachine",authorization,async(req,res)=>{
   if(req?.body){
    const {machine_id,location,type,size,description,condition,start_at}=req?.body;
    let newmachine=await new machineModel({
        machine_id,location,type,size,description,condition,start_at
    })
    try{
        await newmachine.save();
        return res.status(200).send({
            msg:"new machine has been added successfully"
        })
    }
    catch(err){
        return res.status(400).send({
            error:"something went wrong in saving machine data"
        })
    }
   }
   else{
    return res.status(400).send({
        error:"something went wrong from client side requrest"
    })
   }
})
machine_route.patch("/update",authorization,async(req,res)=>{
  if(req?.body){
    const {machine_id,location,type,size,description,condition,start_at}=req.body;
   try{
    await machineModel.findOneAndUpdate({machine_id},{location,type,size,description,condition,start_at})
    return res.status(200).send({
        msg:"machine data has been updated"
    })
   }
   catch(err){
    return res.status(400).send({
        error:err.message
    })
   }
  }
  else{
    return res.status(400).send({
        error:"something went wrong from client side"
    })
  }
})
export {machine_route}