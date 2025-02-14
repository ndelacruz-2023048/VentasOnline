import jwt from 'jsonwebtoken'
import Admin from '../src/admin/admin.model.js'
export const validateJwt =async (request, response, next) => {
    try {
        let secretKey = process.env.SECRET_KEY
        let {authorization}= request.headers

        if(!authorization){
            return response.status(401).send({success:false,message:'Please provide token'})
        }

        let userValid = jwt.verify(authorization,secretKey)
        let isUserValid = await Admin.findOne({_id:userValid.uid})
        if(!isUserValid){
            return response.status(401).send({success:false,message:'User not found'})
        }
        request.user = userValid
        next()
    } catch (error) {
        response.status(500).send({success:true,message:'Error in validating token',error})
    }
}