import { isValidObjectId } from "mongoose"

export const validationObjectId = (objectId)=>{
    let isValidObjId = isValidObjectId(objectId)
    if(!isValidObjId){
        throw new Error('Invalid Object Id, please check the id')
    }
    return true
}