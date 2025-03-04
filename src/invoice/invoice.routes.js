import { Router } from "express";
import { getInvoicesByUser } from "./invoice.controller.js";
import { validateJwt } from "../../middelwares/validate.jwt.js";

const apiInvoice = Router()

apiInvoice.get('/invoice-user',validateJwt,getInvoicesByUser)

export default apiInvoice