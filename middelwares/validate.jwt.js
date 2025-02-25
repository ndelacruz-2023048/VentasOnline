import jwt from 'jsonwebtoken'
import User from '../src/user/user.model.js'
export const validateJwt =async (request, response, next) => {
    try {
        let secretKey = process.env.SECRET_KEY
        let {authorization}= request.headers

        if(!authorization){
            return response.status(401).send({success:false,message:'Please provide a token or login'})
        }

        try {
            let userValid = jwt.verify(authorization,secretKey)
            let isUserValid = await User.findOne({_id:userValid.uid})
            if(!isUserValid){
                return response.status(401).send({success:false,message:'User not found provide another token'})
            }
            request.user = userValid
            next()
        } catch (error) {
            request.status(401).send({success:false,message:'Invalid token'})
        }

    } catch (error) {
        response.status(500).send({success:true,message:'Error in validating token',error})
    }
}