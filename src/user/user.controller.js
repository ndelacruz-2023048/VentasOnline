import { encrypt } from "../../utils/encrypt.js"
import User from "./user.model.js"

export const signUpAdmin = async(request,response)=>{
    try {
        let dataAdmin = request.user
        if(dataAdmin.role !== 'admin') return response.status(401).send({sucess:false,message:'Only Administrator can register new users in this space'})
        
        let data = request.body
        // data.password= await encrypt(data.password)
        // let newAdmin = new User(data)
        // await newAdmin.save()
        console.log(dataAdmin)
        response.status(200).send({sucess:true,message:'Admin created successfully'})
    } catch (error) {
        response.status(500).send({sucess:false,message:'General Server error',error})
    }
}

export const signUpClient=async(request,response)=>{
    try {
        let data = request.body
        console.log(data)
        data.password= await encrypt(data.password)
        let newAdmin = new User(data)
        await newAdmin.save()
        response.status(200).send({sucess:true,message:'Client created successfully'})
    } catch (error) {
        response.status(500).send({sucess:false,message:'General Server error',error})
    }
}   
