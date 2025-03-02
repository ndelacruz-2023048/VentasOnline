import { model, Schema } from "mongoose";

const cartSchema = Schema({
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
            quantity:{
                type:Number,
                required:true
            },
            unitPrice:{
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
    status:{
        type:String,
        required:true,
        enum:['active','close','cancelled','pending'],
        default:'active'
    }
})

export default model('Cart',cartSchema)