import express from "express"
import cors from 'cors'
import helmet from "helmet"
import morgan from "morgan"

import productRoutes from '../src/products/product.routes.js'
import categoryRoutes from '../src/category/category.routes.js'
import adminRoutes from '../src/admin/admin.routes.js'
import authRoutes from '../src/auth/auth.routes.js'

const configs = (app)=>{
    app.use(express.json())
    app.use(express.urlencoded({extended:false}))
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
}

const routes = (app)=>{
    app.use('/v1/admin',productRoutes)
    app.use('/v1/admin',categoryRoutes)
    app.use('/v1/admin',adminRoutes)
    app.use('/v1/admin',authRoutes)
}



export const initServer = ()=>{
    const app = express()
    try {
        configs(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running in port ${process.env.PORT}`);
    } catch (error) {
        console.error(`Server init failed`,error);
        
    }
}