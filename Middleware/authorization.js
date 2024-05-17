import jwt from "jsonwebtoken";
const adminkey="Abhishek@999";
const authorization=(req,res,next)=>{
    
    if(req?.headers?.authorization){
        const token=req?.headers?.authorization.split(" ")[1];
        jwt.verify(token,adminkey,(err,decoded)=>{
            if(decoded){
             if(decoded.user.isAdmin){
                next()
             }
             else{
                return res.status(400).send({
                    error:"you are not admin"
                })
             }
             
            }
            else{
                return res.status(400).send({
                    error:"you are not authorized"
                })
            }
        })
    }
    else{
        return res.status(400).send({
            error:"you are not authorized person"
        })
    }
}
export {authorization}