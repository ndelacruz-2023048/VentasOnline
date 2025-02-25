import { encrypt } from "../../utils/encrypt.js"
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
