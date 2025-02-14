import { body } from "express-validator";
import { validateErrors } from "./validate.errors.js";
import { validationObjectId } from "../utils/db.validators.js";

export const registerProduct = [
    body('name','Name of products is required').notEmpty(),
    body('description','Description of product is required').notEmpty(),
    body('price','Price of the product is required').notEmpty(),
    body('discountedPrice','Discounted price of the product is required').notEmpty(),
    body('stock','Stock of the product is required').notEmpty(),
    body('category','Category of product is required').notEmpty().custom(validationObjectId),
    body('size','Size of the product is required').notEmpty(),
    validateErrors
]

export const registerCategory = [
    body('nameCategory','Name of category is required').notEmpty(),
    body('descriptionCategory','Description of category is required').notEmpty(),
    validateErrors
]

export const registerUser = [
    body('name','Name of admin is required').notEmpty(),
    body('email','Email of admin is required').notEmpty(),
    body('password','Password of admin is required').notEmpty().isStrongPassword(),
    body('state','Status of admin is required').notEmpty(),
    validateErrors
]

export const signIn=[
    body('email','Email is necessary').notEmpty(),
    body('password','Password is necessary').notEmpty(),
    validateErrors
]