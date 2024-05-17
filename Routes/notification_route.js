import {Router} from "express";
import { notificationModel } from "../Schema/notification_model";
const notification_route=Router();
notification_route.get("/",async(req,res)=>{
    if(req?.body){
        let {user_id}=req?.body;
        try{
            let notification=await notificationModel.find({user_id});
            if(notification){
                return res.status(200).send({
                    msg:notification
                })
            }
            else{
                return res.status(200).send({
                    msg:"there is no notification for you"
                })
            }
        }
        catch(err){
           return res.status(400).send({
            error:"something went wrong from server side: notification"
           })
        }
    }
    else{
        return res.status(400).send({
            error:"error from client side"
        })
    }
})
notification_route.post("/",async (req,res)=>{
    if(req?.body){
        const {sender,receiver,message}=req.body;
        let newNotification= new notificationModel({
            sender,receiver,message
          })
        try{
         await newNotification.save()
         return res.status.send({
            "msg":"notification has been added in database"
         })

        }
        catch(err){
            return res.status(400).send({
                error:"something went wrong from server side: notification"
            })
        }
    }
    else{
        return res.status(400).send({
            error:"something went wrong from client side:notification"
        })
    }
})
export {notification_route}