
import { Router } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt"
import { userModel } from "../Schema/user_model.js";

const signup_route=Router();
signup_route.post("/",async(req,res)=>{
    if(req?.body){
        const {email,password,full_name,user_id,isAdmin}=req.body;
        const isUser=await userModel.findOne({email});
        if(isUser){
            return res.status(400).send({
                error:"Sorry! user already exist with this email"
            })
        }
        bcrypt.hash(password,4,async(err,hash)=>{
            if(err){
                return res.status(400).send({error:"Something went wrong in hashing the password"})
            }
            let newuser=await new userModel({
                email,
                full_name,
                password:hash,
                user_id,
                isAdmin

            })
            try{
                await newuser.save()
                return res.send({msg:"signup successful"})
            }
            catch(err){
                return res.status(400).send({
                    error:"something went wrong while saving data in database"
                })
            }
        })
    }
    else{
        return res.status(400).send({
            error:"something went wrong in sending userdata from client side"
        })
    }
})
export {signup_route}