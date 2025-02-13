import Category from '../category/category.model.js'
import Product from '../products/product.model.js'

export const saveProducts =async (request,response)=>{
    try {
        let data = request.body
        let isValidCategory = await Category.findOne({_id:data.category})
        console.log(isValidCategory);
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

export const deleteProduct = async()=>{
    try {
        let {id_product} = request.params
        
    } catch (error) {
        response.status(500).send({success:false,message:'General Server error',error})
    }
}