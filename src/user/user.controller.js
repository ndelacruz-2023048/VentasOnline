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
        
        //Verificamos que el usuario sea administrador
        const {role,password} = await User.findOne({_id:uid})
        if(role !== 'admin'){
            return response.status(401).send({sucess:false,message:'Only Administrators are authorized'})

        }

        const data = request.body
        const {passwordAdmin,newPasswordUser,email,username} = data

        //Verificamos que la contraseña del admin sea correcta
        const isValidPasswordAdmin = await comparePassword(password,passwordAdmin)
        if(!isValidPasswordAdmin){
            return response.status(400).send({sucess:false,message:'Invalid password Admin'})

        }

        //Encriptamos la nueva contraseña
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

export const updateProfileAsClient =async (request,response)=>{
    try {

        response.status(200).send({sucess:true,message:'Profile updated'})
    } catch (error) {
        response.status(500).send({ sucess: false, message: 'General Server error', error })
    }
}