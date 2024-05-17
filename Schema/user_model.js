import mongoose from "mongoose";

const userSchema=new mongoose.Schema(
    {
        email:{type:String,required:true},
        password:{type:String,required:true},
        full_name:{type:String,required:true},
        user_id:{type:String,required:true},
        isAdmin:{type:Boolean,required:true},
        machinesAre:{type:Array}
    }
)
const userModel=mongoose.model("user",userSchema);
export {userModel}