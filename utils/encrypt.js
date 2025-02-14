import { hash, verify } from "argon2"

export const encrypt =(password)=>{
    try {
        return hash(password)
    } catch (error) {
        console.log(error)
        return error
    }
}

export const comparePassword = (hashPassword,password)=>{
    try {
        return verify(hashPassword,password)
    } catch (error) {
        console.log(error)
        return error
    }
}