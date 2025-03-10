import express from "express"
import cors from 'cors'
import helmet from "helmet"
import morgan from "morgan"

import productRoutes from '../src/products/product.routes.js'
import categoryRoutes from '../src/category/category.routes.js'
import adminRoutes from '../src/user/user.routes.js'
import authRoutes from '../src/auth/auth.routes.js'
import cartRoutes from '../src/cart/cart.routes.js'
import orderRoutes from '../src/order/order.routes.js'
import invoiceRoutes from '../src/invoice/invoice.routes.js'
import { defaultCategory } from "../src/category/category.controller.js"
import { adminDefault } from "../src/auth/auth.controller.js"

const configs = (app)=>{
    app.use(express.json())
    app.use(express.urlencoded({extended:false}))
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
}

const routes = (app)=>{
    app.use('/v1/user',productRoutes)
    app.use('/v1/user',categoryRoutes)
    app.use('/v1/user',adminRoutes)
    app.use('/v1/user',authRoutes)
    app.use('/v1/user',cartRoutes)
    app.use('/v1/user',orderRoutes)
    app.use('/v1/user',invoiceRoutes)
}



export const initServer = ()=>{
    const app = express()
    try {
        configs(app)
        routes(app)
        defaultCategory()
        adminDefault()
        app.listen(process.env.PORT)
        console.log(`Server running in port ${process.env.PORT}`);
    } catch (error) {
        console.error(`Server init failed`,error);
        
    }
    
}