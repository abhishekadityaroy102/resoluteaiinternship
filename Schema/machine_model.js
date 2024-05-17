import mongoose from "mongoose"
const machineSchema=new mongoose.Schema({
    machine_id:{type:String,required:true},
    location:{type:String,required:true},
    type:{type:String,required:true},
    size:{type:String},
    description:{type:String},
    condition:{type:String,required:true},
    start_at:{type:String,required:true}
})
const machineModel=mongoose.model("machines",machineSchema)
export {machineModel}