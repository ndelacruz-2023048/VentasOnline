import { isValidObjectId } from "mongoose"
import User from "../src/user/user.model.js"
export const validationObjectId = (objectId) => {
    let isValidObjId = isValidObjectId(objectId)
    if (!isValidObjId) {
        throw new Error('Invalid Object Id, please check the id')
    }
    return true
}

export const validateSameEmail = async (data, request) => {
    const { idUserToUpdate } = request.params
    const dataBody = request.body
    const { passwordAdmin, newPasswordUser, email, username } = dataBody
    const isAuthenticIdUser = await User.findOne({ _id: idUserToUpdate })
    if (isAuthenticIdUser.email === email) {
        throw new Error('Your email is the same , provide a new email or remove this field')
    }
    return true
}
export const validateSameUsername = async (data, request) => {
    const { idUserToUpdate } = request.params
    const dataBody = request.body
    const { passwordAdmin, newPasswordUser, email, username } = dataBody
    const isAuthenticIdUser = await User.findOne({ _id: idUserToUpdate })
    if (isAuthenticIdUser.username === username) {
        throw new Error('Your username is the same , provide a new username or remove this field')
    }
    return true
}

export const validateDuplicatedEmail = async (data, request) => {
    const { idUserToUpdate } = request.params
    const dataBody = request.body
    const { passwordAdmin, newPasswordUser, email, username } = dataBody
    const isDuplicatedEmail = await User.findOne({ _id: { $ne: idUserToUpdate }, email })
    if (isDuplicatedEmail) {
        throw new Error('Email already exists')
    }
    return true
}

export const validateDuplicatedUsername = async (data, request) => {
    const { idUserToUpdate } = request.params
    const dataBody = request.body
    const { passwordAdmin, newPasswordUser, email, username } = dataBody
    const isDuplicatedUsername = await User.findOne({ _id: { $ne: idUserToUpdate }, username })
    if (isDuplicatedUsername) {
        throw new Error('Username already exists' )
    }
    return true
}
