import { body, header, param, query } from "express-validator";
import { validateErrors } from "./validate.errors.js";
import { validateSameEmail, validationObjectId,validateSameUsername, validateDuplicatedEmail, validateDuplicatedUsername } from "../utils/db.validators.js";

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

export const registerAdmin = [
    body('name','Name of admin is required').notEmpty(),
    body('email','Email of admin is required').notEmpty().isEmail().withMessage('Invalid email'),
    body('username','Username of admin is required').notEmpty().toLowerCase(),
    body('password','Password of admin is required').notEmpty().isStrongPassword(),
    body('state','Status of admin is required').notEmpty().isIn(['activo','inactivo']).withMessage('Invalid atribute in state'),
    body('role','Role of admin is required').notEmpty().isIn(['admin','client']).withMessage('Invalid atribute in role'),
    validateErrors
]

export const registerClient = [
    body('name','Name of client is required').notEmpty(),
    body('email','Email of client is required').notEmpty().isEmail().withMessage('Invalid email'),
    body('username','Username of client is required').notEmpty().toLowerCase(),
    body('password','Password of client is required').notEmpty().isStrongPassword(),
    validateErrors
]

export const validateUpdateProfileAsAdmin = [
    body('name','Name of admin is required').optional().notEmpty(),
    body('email','Email of admin is required').optional().notEmpty().isEmail().withMessage('Invalid email').custom((data,{req})=>validateSameEmail(data,req)).custom((data,{req})=>validateDuplicatedEmail(data,req)),
    body('username','Username of admin is required').optional().toLowerCase().notEmpty().custom((data,{req})=>validateSameUsername(data,req)).custom((data,{req})=>validateDuplicatedUsername(data,req)),
    body('state','Status of admin is required').optional().notEmpty().isIn(['activo','inactivo']).withMessage('Invalid atribute in state'),
    body('role','Role of admin is required').optional().notEmpty().isIn(['admin','client']).withMessage('Invalid atribute in role'),
    body('passwordAdmin','Password of admin is required').notEmpty(),
    body('newPasswordUser','The new password of the user to update is required').optional().notEmpty().isStrongPassword().withMessage('Is not a strong password'),
    validateErrors
]

export const validateUpdateProfileAsClient = [
    body('name','Name of client is required').optional().notEmpty(),
    body('email','Email of client is required').optional().notEmpty().isEmail().withMessage('Invalid email').custom((data,{req})=>validateSameEmail(data,req)).custom((data,{req})=>validateDuplicatedEmail(data,req)),
    body('username','Username of client is required').optional().toLowerCase().notEmpty().toLowerCase().custom((data,{req})=>validateSameUsername(data,req)).custom((data,{req})=>validateDuplicatedUsername(data,req)),
    body('passwordUser','Password of client is required').notEmpty(),
    body('newPasswordUser','The new password of the user to update is required').optional().notEmpty().isStrongPassword().withMessage('Is not a strong password'),
    validateErrors
]   

export const signIn=[
    body('userLogin','UserLogin is necessary').notEmpty(),
    body('password','Password is necessary').notEmpty(),
    validateErrors
]

export const validateFilterProductsByCategory = [
    param('id_category','Category of product is required').notEmpty().isMongoId(),
    validateErrors
]

export const validateFilterProductName =[
    query('product_name','Is required').notEmpty().withMessage('Product name cannot be empty'),
    validateErrors
]