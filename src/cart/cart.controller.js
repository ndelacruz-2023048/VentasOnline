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

const insertReservedStockProduct = async (data, uid) => {
    const dataReservedStock = uniqueProducts(data.products)


    for (let product of dataReservedStock) {

        const existProduct = await Product.findOne({ _id: product.productId, 'reservedStock.userId': uid })
        if (!existProduct) {
            //----------------
            const { stock } = await Product.findOne({ _id: product.productId }).select('-_id stock');
            const newReservedStock = {
                userId: uid,
                stock
            };

            const productReservedStockUpdated = await Product.findOneAndUpdate({ _id: product.productId }, { $push: { reservedStock: newReservedStock } }, { new: true })
        }
        //---------
    }
}

const verifyStockProduct = async (products,uid,response) => {
    
    for (let product of products) {
        const {reservedStock} = await Product.findOne({_id: product.productId, 'reservedStock.userId': uid },{ 'reservedStock.$': 1 })
        const resultStock = reservedStock[0].stock - product.quantity
        if (resultStock < 0) {
            console.log('reservedStock insuficiente');
            response.status(400).send({ success: false, message: `reservedStock not available for ${product.quantity} product: ${product.productId}`,productId:product.productId, stockAvailable: reservedStock[0].stock })
            return false
        }
    }
    return true
}

const updateProductInCart = async (cartId, productId, quantity) => {
    //Actualizar la cantidad del producto en el carrito
    const cartProductOld = await Cart.findOne({ _id: cartId, 'products.productId': productId },{ 'products.$': 1 })
    const cartProductOldQuantity= cartProductOld.products[0].quantity
    const cartUpdated = await Cart.findOneAndUpdate({ _id: cartId, 'products.productId': productId }, { $set: { 'products.$.quantity': quantity+cartProductOldQuantity } }, { new: true })
    return cartUpdated
}
const uniqueProducts = (products)=>{
    const uniqueProductsArray = products.reduce((acc, product) => {
        // Verificamos si el producto ya existe en el acumulador
        const existingProduct = acc.find(p => p.productId === product.productId);
    
        if (existingProduct) {
            // Si el producto ya existe, sumamos la cantidad
            existingProduct.quantity += product.quantity;
        } else {
            // Si no existe, lo agregamos al array
            acc.push({...product});
        }
    
        return acc;
    }, []);
    return uniqueProductsArray
}

export const createCart = async (request, response) => {
    try {
        const { uid } = request.user
        const data = request.body

        if (data.products !== undefined) {
            for (let product of data.products) {
                const isValidProduct = await Product.findOne({ _id: product.productId })
                if (!isValidProduct) {
                    return response.status(400).send({ success: false, message: `Product Id not found: ${product.productId}` })
                }
            }
        }
        
        //Insertar el reservedStock para los productos que se crearon en el carrito
        await insertReservedStockProduct(data,uid)

        let productsCart = [];
        let totalItems = 0;
        let totalPrice = 0;

        if (data.products === undefined) {
            productsCart = []
        } else if (data.products.length > 0) {
            if (! await verifyStockProduct(uniqueProducts(data.products),uid, response)) return

            let dataProductsUnique = uniqueProducts(data.products)


            productsCart = await Promise.all(dataProductsUnique.map(async (product) => {
                let addPriceProduct = { ...product, unitPrice: await getProductPriceById(product.productId) }

                //Actualizamos el reservedStock del producto
                await Product.findOneAndUpdate({ _id: product.productId,'reservedStock.userId': uid  }, { $inc: { 'reservedStock.$.stock': -product.quantity } }, { new: true })

                return addPriceProduct
            }))
            for (let product of productsCart) {
                totalItems += product.quantity
                totalPrice += product.unitPrice * product.quantity
            }
        }
        console.log(totalItems);
        console.log(totalPrice);
        // atribute productsCart ready
        console.log(productsCart);


        // Save cart
        const objectnewCart = {
            userId: uid,
            products: productsCart,
            totalItems: totalItems,
            totalPrice: totalPrice,
        }

        const newCart = new Cart(objectnewCart)
        await newCart.save()

        response.status(200).send({ success: true, message: 'Cart created succesfully' })
    } catch (error) {
        response.status(500).send({ success: false, message: 'General Server error', error })
    }
}

export const insertProductsToCart = async (request, response) => {
    try {
        const {uid} = request.user
        const { cartId } = request.params
        const data = request.body
        //Buscar en el carrito el Id
        const existCartWithUser = await Cart.findOne({_id:cartId,userId:uid})
        
        //Validamos que el carrito a actualizar pertenesca al usuario
        if (!existCartWithUser) {
            return response.status(400).send({ success: false, message: 'Cart not found with your user' })
        }
         
        //Validamos que el Id del Producto exista 
        if(data.products !== undefined){
            for(let product of data.products){
                const isValidProduct = await Product.findOne({_id:product.productId})
                if(!isValidProduct){
                    return response.status(400).send({success:false,message:`Product Id not found: ${product.productId}`})
                }
            }
        }

        //Variables para el total de items y precio
        let totalItems = 0;
        let totalPrice = 0;
        
        //Validamos si el usuario no envia productos
        if(data.products.length=== 0){
            return response.status(400).send({success:false,message:'No products to update or insert to the cart'})
            //Validamos si el usuario envia productos
        }else if(data.products.length > 0){

            await insertReservedStockProduct(data,uid)
            //Verificamos si el reservedStock del producto es suficiente
            if(!await verifyStockProduct(uniqueProducts(data.products),uid,response)) return

            for(let product of uniqueProducts(data.products)){
                const existeProduct = await existProductInCart(cartId,product.productId);
                //Verificamos si el producto existe en el carrito para actualizarlo
                if(existeProduct){
                    await Product.findOneAndUpdate({_id:product.productId,'reservedStock.userId': uid},{$inc:{'reservedStock.$.stock':-product.quantity}},{new:true})
                    await updateProductInCart(cartId,product.productId,product.quantity)
                    
                //Si el producto no existe en el carrito lo agregamos al carrito
                }else{
                    await Product.findOneAndUpdate({_id:product.productId,'reservedStock.userId': uid},{$inc:{'reservedStock.$.stock':-product.quantity}},{new:true})
                    const newProduct = {...product,unitPrice:await getProductPriceById(product.productId)}
                    await Cart.findOneAndUpdate({_id:cartId},{$push:{products:newProduct}},{new:true})
                    await updateProductInCart(cartId,product.productId,product.quantity)
                }
            }
            
            
            //Nos traemos todos los datos actuales del carrito
            const statusProductsUpdated = await Cart.findOne({_id: cartId}).select('products')

            for(let product of statusProductsUpdated.products){
                totalItems += product.quantity
                totalPrice += product.unitPrice * product.quantity
            }

            const cartUpdated = await Cart.findOneAndUpdate({_id:cartId},{totalItems:totalItems,totalPrice:totalPrice},{new:true})
            
            return response.status(200).send({success:true,message:'Products inserted to cart succesfully',cartUpdated})
        }

    } catch (error) {
        response.status(500).send({success:false,message:'General Server error',error})
    }
}
