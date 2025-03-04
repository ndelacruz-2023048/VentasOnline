import Invoice from '../invoice/invoice.model.js'

export const getInvoicesByUser =async (request,response)=>{
    try {
        const {userId}= request.params
        const invoices =await Invoice.find({userId:userId}).populate('products.productId')
        if(invoices.length===0){
            return response.status(400).send({success:false,message:'No invoices yet.'})
        }
        response.status(200).send({success:true,message:'Invoices fetched succesfully',invoices})
    } catch (error) {
        response.status(500).send({success:false,message:'General Server error',error})
    }
}
