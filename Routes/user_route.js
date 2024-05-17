import {Router} from "express"
import { userModel } from "../Schema/user_model.js";
import bcrypt from "bcrypt"
import { authentication } from "../Middleware/authentication.js";
import { authorization } from "../Middleware/authorization.js";
const user_route=Router();
user_route.get("/",authentication,async (req,res)=>{
if(req?.body?.user_id){
    const {user_id}=req.body;
    try{
        let user_data=await userModel.findOne({user_id});
        if(user_data){
            return res.status(200).send({
                "user":user_data
            })
        } 
    }
    catch(err){
        return res.status(400).send({
            error:err.message
        })
    }
    
}
else{
    return res.status(400).send({
        error:"something went wrong with client side"
    })
}
})
user_route.get("/all_user",authorization,async (req,res)=>{
   
      
            let user_data=await userModel.find({});
            if(user_data){
                return res.status(200).send({
                    "users":user_data
                })
            }
            else{
                return res.status(400).send({
                    error:"something went wrong from server side"
                })
            } 
    
       
        
    
   
    })
user_route.patch("/update",authorization,async (req,res)=>{
   if(req?.body){
    const {user_id,isAdmin,full_name,email,password}=req?.body;
    try{
        bcrypt.hash(password,4,async(err,hash)=>{
            if(hash){
                let updateduser=await userModel.findOneAndUpdate({user_id},{isAdmin,full_name,email,password:hash});
                if(updateduser){
                  return res.status(200).send({
                      msg:"user is now admin"
                  })
                }
            }
            else{
                return res.status(400).send({
                    error:err.message
                })
            }
        })
     
    }
    catch(err){
         return res.status(500).send({
            error:"something went wrong with server side"
         })
    }
   }
   else{
    return res.status(400).send({
        error:"please check client request getting some error"
    })
   }
})
export {user_route}