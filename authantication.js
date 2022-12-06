
const jwt=require("jsonwebtoken")

const knex=require('./conection');


const genrateToken=((email)=>{
    return jwt.sign(email,"mtujryhtgdrfgyduikuj675ry6tgu7ry6tg")
})

const veryfyToken=async(req,res,next)=>{
    if(req.headers.cookie){
        const Token=req.headers.cookie.split("=")[1]
        const UserId=jwt.verify(Token,"mtujryhtgdrfgyduikuj675ry6tgu7ry6tg");
        const UserData=await knex("crud").where({email:UserId})
        req.UserData = UserData
        next()
    }
    else{
        res.status(401).json({msg:'login first'})
    }

}
module.exports={genrateToken,veryfyToken}

