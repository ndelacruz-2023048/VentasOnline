import { Router } from "express";
import { createCart, insertProductsToCart} from "./cart.controller.js";
import { registerCart, validateInsertProductsToCart } from "../../middelwares/validators.js";
import { validateAuthenticUserParam } from "../../middelwares/validate.user.js";
import { validateAuthenticCartId } from "../../middelwares/validate.cart.js";
import { validateJwt } from "../../middelwares/validate.jwt.js";

const apiCart = Router();
apiCart.post('/cart_create',validateJwt,registerCart,createCart)
apiCart.put('/cart-insert-products/:cartId',validateJwt,validateInsertProductsToCart,validateAuthenticCartId,insertProductsToCart)

export default apiCart