import jwt from "jsonwebtoken"
const restrictDelete = (req, res, next) => {

    const authHeader = req.headers.authorization
    
    const token = authHeader.split(" ") [1]
    console.log(authHeader);


    if(!authHeader) {
       res.status(401).json({
        message: "No token provided"
       })
    }

    else {
        const verifytoken = jwt.verify(token, process.env.SECRET_KEY)
        console.log(verifytoken)
        if(!verifytoken )
        {
            res.status(401).json({
                message: "invalid token"
            })
        }
        else {
            const {userid}  = verifytoken;
            console.log(userid);
            const {userBodyid} = req.body;
            if(userBodyid !== userid){
                  return res.status(403).json({
                    message: "Access denied"
                  })
            }

            next();
            /*res.status(201).json({
                data: blogs
            })*/
        }
       // console.log(verifytoken)
    }
   
}

export default restrictDelete