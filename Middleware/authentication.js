import jwt from "jsonwebtoken";
const secret_key="Abhishek@999"
const adminkey='Abhishek@999';
const authentication=(req,res,next)=>{
    if(req?.headers?.authorization){
        const token=req?.headers?.authorization.split(" ")[1];
        jwt.verify(token,secret_key,(err,decoded)=>{
            if(decoded){
           
             next()
            }
        })
    }
    else{
        return res.status(400).send({
            error:"you are not authenticated"
        })
    }
}
export {authentication}