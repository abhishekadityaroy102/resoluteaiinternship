import { Router } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import { userModel } from "../Schema/user_model.js";
import bcrypt from "bcrypt"
const secret_key="Abhishek@999"
const login_route=Router();
login_route.post("/",async(req,res)=>{
    const {email,password}=req?.body;
    let user=await userModel.findOne({email});
    if(user){
        const hash_password=user.password;
        bcrypt.compare(password,hash_password,async(err,result)=>{
            if(result){
                jwt.sign({user},secret_key,async(err,token)=>{
                    if(token){
                        return res.status(200).send({
                            token:token,user:user
                        })
                    }
                    else{
                        return res.status(400).send({error:"something went wrong while generating token"})
                    }
                })
            }
            else{
                return res.status(400).send({
                    error:"Sorry! you are entering wrong password"
                })
            }
        })
    }
    else{
        return res.status(400).send({
            error:"something went wrong in email or password please re-enter"
        })
    }
})
export {login_route}