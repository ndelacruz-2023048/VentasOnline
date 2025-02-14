
import Category from './category.model.js'

export const getCategories = async (request,response)=>{
    try {
        let categories = await Category.find()
        response.status(200).send({sucess:true,message:'Categories found',categories})
    } catch (error) {
        response.status(500).send({sucess:false,message:'General Server error',error})
    }
}

export const saveCategory = (request,response)=>{
    try {
        let data = request.body
        let newCategory = new Category(data)
        newCategory.save()
        response.status(200).send({sucess:true,message:'Category savec succesfully'})
    } catch (error) {
        response.status(500).send({sucess:false,message:'General Server error',error})
    }
}

export const updateCategory = async (request,response)=>{
    try {
        let {id_category} = request.params
        let data = request.body
        let updatedCategory = await Category.findByIdAndUpdate(id_category,data,{new:true})
        response.status(200).send({sucess:true,message:'Category updated succesfully',updatedCategory})
    } catch (error) {
        response.status(500).send({sucess:false,message:'General Server error',error})
    }
}

export const deleteCategory = async(request,response)=>{
    try {
        let {id_category} = request.params
        let deletedCategory = await Category.findByIdAndDelete(id_category)
        response.status(200).send({sucess:true,message:'Category deleted succesfully',deletedCategory})
    } catch (error) {
        response.status(500).send({sucess:false,message:'General Server error',error})
    }
}