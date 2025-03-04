import Cart from "../cart/cart.model.js"
import Invoice from '../invoice/invoice.model.js'
import Product from "../products/product.model.js"

const updateStock = async(userId)=>{
    const deleteReservedStock = await Product.updateMany({'reservedStock.userId':userId},{ $pull: { reservedStock: { userId: userId } } })
}

export const createOrder = async(request,response)=>{
    try {

        const {uid} = request.user
        const orderData = request.body

        const cartUser = await Cart.findOne({userId:uid,status:'active'})
        if(!cartUser){
            return response.status(400).send({success:false,message:"You dont have active carts yet!!!"})
        }
        
        const {_id,userId,products,totalItems,totalPrice,status} = cartUser
        
        //Array de productos
        const arrayProductsInvoice = []
        let templateTotalItemsInvoice = 0
        let templateTotalPriceInvoice = 0

        for(let product of products){
            const {name,price} = await Product.findOne({_id:product.productId})
            
            const templateProductsInvoice = {
                productId:product.productId,
                productName:name,
                quantity:product.quantity,
                price,
                totalPrice:(product.quantity*price)
            }

            await Product.findOneAndUpdate({_id:product.productId},{$inc:{stock:-product.quantity}},{new:true})
            templateTotalItemsInvoice += product.quantity
            templateTotalPriceInvoice += (product.quantity*price)
            arrayProductsInvoice.push(templateProductsInvoice)
            
        }

        console.log(arrayProductsInvoice);
        console.log(templateTotalItemsInvoice);
        console.log(templateTotalPriceInvoice);
        

        const dataInvoice = {
            userId,
            // cartId:_id,
            products:arrayProductsInvoice,
            totalItems:templateTotalItemsInvoice,
            totalPrice:templateTotalPriceInvoice,
            paymentMethod:orderData.paymentMethod,
            NIT:orderData.NIT
        }

        console.log(dataInvoice);
        const createInvoice = await Invoice(dataInvoice)
        await updateStock(uid)
        createInvoice.save()
        
        //Eliminar carrito
        const deleteCart  = await Cart.findOneAndDelete({_id:_id})
        
        

        response.status(200).send({ success: true, message: 'Order created succesfully',invoice:createInvoice})
    } catch (error) {
        response.status(500).send({ success: false, message: 'General Server error', error })
    }
}