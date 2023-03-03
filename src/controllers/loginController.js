import User from "../model/user.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const loginController = async (req, res) => {
  
const {email, password}  = req.body

try {
    const user = await User.findOne({email})
    if (!user) {
        return res.status(400).json ({
            message: "Invalid Credentials"
        })
    }
    else {
        const checkPassword = await bcrypt.compare (password, user.password)
        if(!checkPassword) {
            return res.status(401).json({
                message: "Invalid credentials"
            })
        }
        else{
         const token = jwt.sign({userid: user._id}, process.env.SECRET_KEY)
         console.log(token)
         return res.status(200).json({
            data: user,
            token: token
         
        })
    }
    }
   

}

catch(error){

}
}

export default loginController