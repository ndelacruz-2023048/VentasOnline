import { model, Schema } from "mongoose";

const adminSchema = Schema({
    name:{
        type:String,
        required:[true,'Name is required']
    },
    email:{
        type:String,
        required:[true,'Email is required']
    },
    username:{
        type:String,
        required:[true,'Username is required']
    },
    password:{
        type:String,
        required:[true,'Password is required']
    },
    state:{
        type:String,
        enum:['activo','inactivo'],
        default:'activo'
    },
    role:{
        type:String,
        enum:['admin','client'],
    }
},
{
    versionKey:false,
    timestamps:true
})

export default model('Users',adminSchema)