import Cart from "../cart/cart.model.js"
import Invoice from '../invoice/invoice.model.js'
import Product from "../products/product.model.js"
export const createOrder = async(request,response)=>{
    try {

        const {uid} = request.user
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
            const {name,price} = await Product. findOne({_id:product.productId})
            
            const templateProductsInvoice = {
                productId:product.productId,
                productName:name,
                quantity:product.quantity,
                price,
                totalPrice:(product.quantity*price)
            }

            arrayProductsInvoice.push(templateProductsInvoice)
            
        }

        console.log(arrayProductsInvoice);
        

        const dataInvoice = {
            userId,
            cartId:_id,
        }
        const createInvoice = await Invoice()
        
        

        response.status(200).send({ success: true, message: 'Order created succesfully' })
    } catch (error) {
        response.status(500).send({ success: false, message: 'General Server error', error })
    }
}