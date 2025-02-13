
import Category from './category.model.js'

export const saveCategory = (request,response)=>{
    try {
        let data = request.body
        let newCategory = new Category(data)
        newCategory.save()
        response.status(200).send({sucess:true,message:'Category savec succesfully'})
    } catch (error) {
        response.status(500).send({sucess:false,message:'General Server error',error

        })
    }
}