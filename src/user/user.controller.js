import { encrypt } from "../../utils/encrypt.js"
import Admin from "./user.model.js"
export const saveAdmin=async(request,response)=>{
    try {
        let data = request.body
        console.log(data)
        data.password= await encrypt(data.password)
        let newAdmin = new Admin(data)
        await newAdmin.save()
        response.status(200).send({sucess:true,message:'Admin created successfully'})
    } catch (error) {
        response.status(500).send({sucess:false,message:'General Server error',error})
    }
}   
