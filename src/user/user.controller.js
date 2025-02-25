import { isValidObjectId } from "mongoose"
import { comparePassword, encrypt } from "../../utils/encrypt.js"
import User from "./user.model.js"


export const signUpAdmin = async (request, response) => {
    try {
        let dataAdmin = request.user

        //Verificamos que el usuario sea administrador
        if (dataAdmin.role !== 'admin') {
            return response.status(401).send({ sucess: false, message: 'Only Administrators are authorized' })
        }


        let data = request.body
        let { email, username } = data

        
        //Verificamos que el usuario y email no sean duplicados
        const isDuplicatedEmail = await User.findOne({ email })
        const isDuplicatedUsername = await User.findOne({ username })
        if (isDuplicatedUsername) return response.status(400).send({ sucess: false, message: 'Username already exists' })
        if (isDuplicatedEmail) return response.status(400).send({ sucess: false, message: 'Email already exists' })


        //Encriptamos la contraseña
        data.password = await encrypt(data.password)

        //Guardamos el nuevo usuario
        let newAdmin = new User(data)
        await newAdmin.save()
        response.status(200).send({ sucess: true, message: 'Admin created successfully' })
    } catch (error) {
        response.status(500).send({ sucess: false, message: 'General Server error', error })
    }
}

export const signUpClient = async (request, response) => {
    try {

        let data = request.body
        let { email, username } = data

        //Verificamos que el usuario y email no sean duplicados
        const isDuplicatedEmail = await User.findOne({ email })
        const isDuplicatedUsername = await User.findOne({ username })
        if (isDuplicatedUsername) return response.status(400).send({ sucess: false, message: 'Username already exists' })
        if (isDuplicatedEmail) return response.status(400).send({ sucess: false, message: 'Email already exists' })

        //Encriptamos la contraseña
        data.password = await encrypt(data.password)

        //Guardamos el nuevo usuario
        let newAdmin = new User(data)
        newAdmin.role = 'client'
        await newAdmin.save()
        response.status(200).send({ sucess: true, message: 'Client created successfully' })
    } catch (error) {
        response.status(500).send({ sucess: false, message: 'General Server error', error })
    }
}   


export const updateProfileAsAdmin =async (request,response)=>{
    try {
        const {idUserToUpdate} = request.params
        const {uid} = request.user
        console.log("🚀 ~ updateProfileAsAdmin ~ request.user:", request.user)
        
        //Verificamos que el usuario sea administrador
        const {role,password} = await User.findOne({_id:uid})
        if(role !== 'admin'){
            return response.status(401).send({sucess:false,message:'Only Administrators are authorized'})

        }

        //Verificamos que el id sea un ObjectId
        if(!isValidObjectId(idUserToUpdate)){
            return response.status(400).send({sucess:false,message:'Invalid Object id'})
        }

        //Verificamos que el id corresponda a un usuario
        const isAuthenticIdUser = await User.findOne({_id:idUserToUpdate})
        if(!isAuthenticIdUser){
            return response.status(400).send({sucess:false,message:'User Id not found'})
        }
        
        //--------------------------
        const data = request.body
        const {passwordAdmin,newPasswordUser,email,username} = data
        
        if(isAuthenticIdUser.email === email){
            return response.status(400).send({sucess:false,message:'Your email is the same , provide a new email or remove this field'})
        }
        if(isAuthenticIdUser.username === username){
            return response.status(400).send({sucess:false,message:'Your username is the same , provide a new username or remove this field'})
        }
        
        //Verificamos que el email no sea duplicado
        const isDuplicatedEmail = await User.findOne({_id:{$ne:idUserToUpdate},email})
        if(isDuplicatedEmail){
            return response.status(400).send({sucess:false,message:'Email already exists'})
        }
        //Verificamos que el username no sea duplicado
        const isDuplicatedUsername = await User.findOne({_id:{$ne:idUserToUpdate},username})
        if(isDuplicatedUsername){
            return response.status(400).send({sucess:false,message:'Username already exists'})
        }

        //Verificamos que la contraseña del admin sea correcta
        const isValidPasswordAdmin = await comparePassword(password,passwordAdmin)
        if(!isValidPasswordAdmin){
            return response.status(400).send({sucess:false,message:'Invalid password Admin'})

        }

        //Encriptamos la nueva contraseña
        // const userUpdated = new User(data)
        // userUpdated.password = await encrypt(newPasswordUser)
        if(newPasswordUser){
            let newPasswordUserEncrypted = await encrypt(newPasswordUser)
            await User.findByIdAndUpdate(idUserToUpdate,{...data,password:newPasswordUserEncrypted})
        }
        await User.findByIdAndUpdate(idUserToUpdate,data)
        response.status(200).send({sucess:true,message:'Profile updated'})
    } catch (error) {
        response.status(500).send({ sucess: false, message: 'General Server error', error })
    }
}