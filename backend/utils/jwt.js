const jwt = require("jsonwebtoken")

const generatetockens = (userid)=>{
   return jwt.sign({_id:userid},process.env.ACCESS_TOKEN_SECRET)
}
module.exports = {generatetockens}