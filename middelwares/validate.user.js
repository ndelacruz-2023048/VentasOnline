import { isValidObjectId } from 'mongoose'
import User from '../src/user/user.model.js'

export const validateAuthenticUser = async (request, response, next) => {
    const { idUserToUpdate } = request.params
    const isAuthenticIdUser = await User.findOne({ _id: idUserToUpdate })
    if (!isAuthenticIdUser) {
        return response.status(400).send({ success: false, message: 'User Id not found' })
    }
    next()
}

export const validateObjectId = (request, response, next) => {
    const { idUserToUpdate } = request.params
    if (!isValidObjectId(idUserToUpdate)) {
        return response.status(400).send({ sucess: false, message: 'Invalid Object id' })
    }
    next()
}