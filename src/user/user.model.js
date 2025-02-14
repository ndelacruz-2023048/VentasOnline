import { model, Schema } from "mongoose";

const adminSchema = Schema({
    name:{
        type:String,
        required:[true,'Name of admin is required']
    },
    email:{
        type:String,
        required:[true,'Email of admin is required']
    },
    password:{
        type:String,
        required:[true,'Password of admin is required']
    },
    state:{
        type:String,
        enum:['activo','inactivo'],
    },
    role:{
        type:String,
        enum:['admin'],
        default:'admin'
    }
},
{
    versionKey:false,
    timestamps:true
})

export default model('Admin',adminSchema)