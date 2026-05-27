import {
    Request,
    Response,
    NextFunction
} from "express"

import ProductService from "../services/productService"

import {
    ProductBody,
    ProductParams
} from "../types/productType"

class ProductController {

    constructor(
        private productService: ProductService = new ProductService()
    ) { }

    public listProducts = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

        try {

            const products =
                await this.productService.findAll()

            return res.json(products)

        } catch (error) {

            next(error)
        }
    }

    public createProducts = async (
        req: Request<{}, {}, ProductBody>,
        res: Response,
        next: NextFunction
    ) => {

        try {

            const {
                descricao,
                codigo_grupo,
                valor
            } = req.body

            const product =
                await this.productService.create(
                    descricao,
                    codigo_grupo,
                    valor
                )

            return res.status(201).json(product)

        } catch (error) {

            next(error)
        }
    }

    public editProducts = async (
        req: Request<ProductParams, {}, ProductBody>,
        res: Response,
        next: NextFunction
    ) => {

        try {

            const codigo =
                Number(req.params.codigo)

            const {
                descricao,
                codigo_grupo,
                valor
            } = req.body

            const product =
                await this.productService.update(
                    codigo,
                    descricao,
                    codigo_grupo,
                    valor
                )

            return res.json(product)

        } catch (error) {

            next(error)
        }
    }

    public excludesProducts = async (
        req: Request<ProductParams>,
        res: Response,
        next: NextFunction
    ) => {

        try {

            const codigo =
                Number(req.params.codigo)

            const result =
                await this.productService.delete(codigo)

            return res.json(result)

        } catch (error) {

            next(error)
        }
    }
}

export default ProductController