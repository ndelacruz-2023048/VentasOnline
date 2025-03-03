import { model, Schema } from "mongoose"

const productSchema = Schema({
    name:{
        type:String,
        required:[true,'Name of products is required']
    },
    description:{
        type:String,
        required:[true,'Description of product is required']
    },
    price:{
        type:Schema.Types.Decimal128,
        required:[true,'Price of the product is required']
    },
    stock:{
        type:Number,
        required:[true,'Stock of the product is required']
    },
    reservedStock:[
        new Schema({
            userId:{
                type:Schema.Types.ObjectId,
                ref:'User',
                required:true
            },
            stock:{
                type:Number,
                required:true,
                default:0
            }
        })
    ],
    category:{
        type:Schema.Types.ObjectId,
        ref:'Category',
        required:[true,'Category of product is required']
    },
    size:{
        type:String,
        required:[true,'Size of the product is required']
    }
},
{
    versionKey:false,
    timestamps:true
}
)

export default model('Product',productSchema)