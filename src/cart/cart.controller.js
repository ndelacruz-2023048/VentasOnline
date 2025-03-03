import Product from "../products/product.model.js";
import Cart from "./cart.model.js";

const getProductPriceById = async (productId) => {
    const {price} = await Product.findOne({ _id: productId }).select('-_id price');
    return price
}

const existProductInCart = async (cartId, productId) => {
    try {
        const exisProduct = await Cart.findOne({ _id: cartId, 'products.productId': productId }).select('products')
        return exisProduct
    } catch (error) {
        console.log(error);
    }
}

const updateProductInCart = async (cartId, productId, quantity) => {
    const cartProductOld = await Cart.findOne({ _id: cartId, 'products.productId': productId },{ 'products.$': 1 })
    // const cartUpdated = await Cart.findOneAndUpdate({ _id: cartId, 'products.productId': productId }, { $set: { 'products.$.quantity': quantity } }, { new: true })

    return cartProductOld
}

export const createCart = async(request,response)=>{
    try{
        const {uid} = request.user
        const data = request.body

        if(data.products !== undefined){
            for(let product of data.products){
                const isValidProduct = await Product.findOne({_id:product.productId})
                if(!isValidProduct){
                    return response.status(400).send({success:false,message:`Product Id not found: ${product.productId}`})
                }
            }
        }

        let productsCart = [];
        let totalItems = 0;
        let totalPrice = 0;

        if(data.products === undefined){
            productsCart = []
        }else if(data.products.length > 0){
            productsCart = await Promise.all( data.products.map(async(product)=>{
                let addPriceProduct = {...product, unitPrice: await getProductPriceById(product.productId)}
                return addPriceProduct

            }))
            for(let product of productsCart){
                totalItems += product.quantity
                totalPrice += product.unitPrice * product.quantity
            }
        }
        console.log(totalItems);
        console.log(totalPrice);
        //atribute productsCart ready
        console.log(productsCart);
        
        
        //Save cart
        const objectnewCart= {
            userId:uid,
            products:productsCart,
            totalItems:totalItems,
            totalPrice:totalPrice,
        }

        const newCart = new Cart(objectnewCart)
        await newCart.save()

        response.status(200).send({success:true,message:'Cart created succesfully',data})
    }catch (error) {
        response.status(500).send({success:false,message:'General Server error',error})
    }
}

export const insertProductsToCart = async (request, response) => {
    try {
        const {uid} = request.user
        const { userId, cartId } = request.params
        const data = request.body
        //ir a buscar el carrito con el id
        const existCartWithUser = await Cart.findOne({_id:cartId,userId:uid})

        if (!existCartWithUser) {
            return response.status(400).send({ success: false, message: 'Cart not found with your user' })
        }

        let productsCart = [];
        let totalItems = 0;
        let totalPrice = 0;

        if(data.products === undefined){
            productsCart= []
        }else if(data.products.length > 0){
            productsCart = await Promise.all(data.products.map(async(product)=>{
                
                const existeProduct = await existProductInCart(cartId,product.productId);
                if(existeProduct){
                    console.log(await updateProductInCart(cartId,product.productId,product.quantity))
                }

                // let addPriceProduct = {...product, unitPrice: await getProductPriceById(product.productId)}
                // return addPriceProduct



            }))
            // for(let product of productsCart){
            //     totalItems += product.quantity
            //     totalPrice += product.unitPrice * product.quantity
            // }

        }

        response.status(200).send({success:true,message:'Products inserted to cart succesfully'})
    } catch (error) {
        response.status(500).send({success:false,message:'General Server error',error})
    }
}
export const insertProductToCart = async (request, response) => {

}