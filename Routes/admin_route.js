import {Router} from "express";
import { userModel } from "../Schema/user_model.js";
import { authorization } from "../Middleware/authorization.js";
const admin_route=Router();
admin_route.post("/add_machine",authorization,async(req,res)=>{
    if(req?.body){
     let {user_id}=req.body;
     let {machine_id}=req.body;
     try {
        const updatedUser = await userModel.findOneAndUpdate(
          { user_id },
          { $push: { machinesAre: machine_id } },
          { new: true } // Return the updated document
        );
    
        if (!updatedUser) {
          return res.status(404).send({ error: "User not found" });
        }
    
       return  res.status(200).send({ message: "Machine added successfully", updatedUser });
      } catch (error) {
        console.error(error);
       return  res.status(500).send({ error: "Internal server error" });
      }
    }
    else{
        return res.status(400).send({
            error:"something went wrong from clien side"
        })
    }
})
admin_route.delete("/remove_machine",authorization,async (req,res)=>{
    if(req?.body){
        let {user_id}=req.body;
        let {machine_id}=req.body;
        try {
           const updatedUser = await userModel.findOneAndUpdate(
             { user_id },
             { $pull: { machinesAre: machine_id } },
             { new: true } // Return the updated document
           );
       
           if (!updatedUser) {
             return res.status(404).send({ error: "User not found" });
           }
       
           return res.status(200).send({ message: "Machine Deleted successfully", updatedUser });
         } catch (error) {
           console.error(error);
          return  res.status(500).send({ error: "Internal server error" });
         }
       }
       else{
           return res.status(400).send({
               error:"something went wrong from clien side"
           })
       }
})
export {admin_route}