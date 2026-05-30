import { Router } from "express"
import ProductController from "../controllers/productController"

const productController = new ProductController()
const productRouter = Router()

productRouter.get(
    "/produtos",
    productController.listProducts.bind(productController)
)

productRouter.get(
    "/produtos/:codigo",
    productController.findProductByCode.bind(productController)
)

productRouter.post(
    "/produtos",
    productController.createProducts.bind(productController)
)

productRouter.put(
    '/produtos/:codigo',
    productController.editProducts.bind(productController)
)

productRouter.delete(
    "/produtos/:codigo",
    productController.excludesProducts.bind(productController)
)

export default productRouter