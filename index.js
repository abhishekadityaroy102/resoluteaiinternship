import express from "express"
const app=express()
import cors from "cors"
import { login_route } from "./Routes/login_route.js"
import { signup_route } from "./Routes/Signup_route.js"
import { Server } from "socket.io"
import http from "http"
import { connection } from "./Config/db.cjs"
import { user_route } from "./Routes/user_route.js"
import { machine_route } from "./Routes/machine_route.js"
import { admin_route } from "./Routes/admin_route.js"
import { notificationModel } from "./Schema/notification_model.js"
app.use(cors());
app.use(express.json());
app.use("/login",login_route);
app.use("/signup",signup_route);
app.use("/user",user_route);
app.use("/admin",admin_route)
app.use("/machine",machine_route);
const server=http.createServer(app);
const io=new Server(server,{cors:{origin:"*"}});
io.on("connection",(socket)=>{
    console.log("HI I AM SOCKET.IO ");
    socket.on("send-notification",async (data)=>{
        console.log("through socket.io",data)
        const {sender,receiver,message}=data;
        try{
            const newNotification=new notificationModel({sender,receiver,message});
            await newNotification.save();
            io.emit("newNotification",newNotification);
            // socket.emit("notificationSent","Notification sent successfully")
        }
        catch(err){
            console.log(err);
            socket.emit("notificationEroor",err)
        }
       
    })
    socket.on("getNotification",async (user_id)=>{
        try{
            const notifications=await notificationModel.find({user_id});
            socket.emit("notification",notifications)
        }
        catch(err){
            console.log(err)
         socket.emit("notificationError",err)
        }
    })
})
app.get("/",(req,res)=>{
    return res.send("HELLO ABHISHEK ADITYA ROY")
})
server.listen(3000,async()=>{
    try{
       let res= await connection;
       if(res){
        console.log("database connected successfully😊")
       }
    }
    catch(err){
     console.log(err)
    }
    console.log("running server connection code")
})