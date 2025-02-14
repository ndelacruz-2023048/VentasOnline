import Category from '../category/category.model.js'
import Product from '../products/product.model.js'

export const getProducts = async(request,response)=>{
    try {
        let products = await Product.find().populate('category')
        console.log(products)
        if(products.length===0){
            return response.status(400).send({success:false,message:'No products yet.'})
        }

        response.status(200).send({success:true,message:'Products fetched succesfully',products})
    } catch (error) {
        response.status(500).send({success:false,message:'General Server error',error})
    }
}

export const saveProducts =async (request,response)=>{
    try {
        let data = request.body
        let isValidCategory = await Category.findOne({_id:data.category})
        if(!isValidCategory){
            return response.status(400).send({success:false,message:'Category Id not found'})
        }
        let newProduct = new Product(data)
        await newProduct.save()
        response.status(200).send({success:true,message:'Product saved succesfully'})
    } catch (error) {
        response.status(500).send({success:false,message:'General Server error',error})
    }
}

export const updateProducts = async(request,response)=>{
    try {
        let {id_product} = request.params
        let data = request.body
        let isValidProduct = await Product.findOne({_id:id_product})
        if(!isValidProduct){
            return response.status(400).send({success:false,message:'Product Id not found'})
        }
        let isValidCategory = await Category.findOne({_id:data.category})
        if(!isValidCategory){
            return response.status(400).send({success:false,message:'Category Id not found'})
        }
        let updateProduct = await Product.findByIdAndUpdate(id_product,data,{new:true})
        console.log(updateProduct);
        response.status(200).send({success:true,message:'Product Updated Succesfully',updateProduct})
    } catch (error) {
        response.status(500).send({success:false,message:'General Server error',error})
    }
}

export const deleteProduct = async(request,response)=>{
    try {
        let {id_product} = request.params
        let isValidProduct = await Product.findOne({_id:id_product})
        if(!isValidProduct){
            return response.status(400).send({success:false,message:'Product Id not found'})
        }
        let productDeleted = await Product.findByIdAndDelete(id_product)
        response.status(200).send({success:true,message:'Product Deleted Succesfully',productDeleted})
    } catch (error) {
        response.status(500).send({success:false,message:'General Server error',error})
    }
}