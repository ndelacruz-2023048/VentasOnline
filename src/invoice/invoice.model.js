import { model, Schema } from "mongoose";

const invoiceSchema = Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    products:[
        new Schema({
            productId:{
                type:Schema.Types.ObjectId,
                ref:'Product',
                required:true
            },
            productName:{
                type:String,
                required:true
            },
            quantity:{
                type:Number,
                required:true
            },
            price:{
                type:Schema.Types.Decimal128,
                required:true
            },
            totalPrice:{
                type:Schema.Types.Decimal128,
                required:true
            }
        })
    ],
    totalItems:{
        type:Number,
        required:true
    },
    totalPrice:{
        type:Schema.Types.Decimal128,
        required:true
    },
    paymentMethod:{
        type:String,
        required:true,
        enum:['credit','debit','cash']
    },
    NIT:{
        type:String,
        required:true
    }

},
{
    versionKey:false,
    timestamps:true
})

export default model('Invoice',invoiceSchema)