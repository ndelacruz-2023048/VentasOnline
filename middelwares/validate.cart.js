import Cart from '../src/cart/cart.model.js'

export const validateAuthenticCartId = async(request,response,next)=>{
    const {cartId} = request.params
    if(!cartId){
        return response.status(400).send({success:false,message:'Cart Id is required'})
    }
    const isValidCartId = await Cart.findOne({_id:cartId})
    if(!isValidCartId){
        return response.status(400).send({success:false,message:'Cart passed in params is not valid'})
    }
    next()
}