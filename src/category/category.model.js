import { model, Schema } from "mongoose";

const categorySchema = Schema({
    nameCategory:{
        type:String,
        required:[true,'Name Category is required']
    },
    descriptionCategory:{
        type:String,
        required:[true,'Description Category is required']
    },
},
{
    versionKey:false,
    timestamps:true
}
)

export default model('Category',categorySchema)