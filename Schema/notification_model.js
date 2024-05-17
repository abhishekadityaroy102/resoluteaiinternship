import mongoose from "mongoose"
const notificationSchema=new mongoose.Schema({
    sender:{type:String,required:true},
    receiver:{type:String,required:true},
    message:{type:String,required:true},
})
const notificationModel=mongoose.model("notifications",notificationSchema)
export {notificationModel}