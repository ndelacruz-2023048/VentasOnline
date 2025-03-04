import { Router } from "express";
import { getInvoicesByUser } from "./invoice.controller.js";
import { validateJwt } from "../../middelwares/validate.jwt.js";
import { validateAuthenticUserParam } from "../../middelwares/validate.user.js";

const apiInvoice = Router()

apiInvoice.get('/invoice-user/:userId',validateJwt,validateAuthenticUserParam,getInvoicesByUser)

export default apiInvoice