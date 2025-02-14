import { response } from 'express'
import Category from '../category/category.model.js'
import Product from '../products/product.model.js'

export const getProducts = async(request,response)=>{
    try {
        let products = await Product.find()
        response.status(200).send({success:true,message:'Products fetched succesfully',products})
    } catch (error) {
        response.status(500).send({success:false,message:'General Server error',error})
    }
}

export const saveProducts =async (request,response)=>{
    try {
        let data = request.body
        console.log(data);
        
        let isValidCategory = await Category.findOne({_id:data.category})
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
        let updateProduct = await Product.findByIdAndUpdate(id_product,data,{new:true})
        console.log(updateProduct);
        response.status(200).send({success:true,message:'Product Updated Succesfully'})
    } catch (error) {
        response.status(500).send({success:false,message:'General Server error',error})
    }
}

export const deleteProduct = async(request,response)=>{
    try {
        let {id_product} = request.params
        let productDeleted = await Product.findByIdAndDelete(id_product)
        response.status(200).send({success:true,message:'Product Deleted Succesfully',productDeleted})
    } catch (error) {
        response.status(500).send({success:false,message:'General Server error',error})
    }
}