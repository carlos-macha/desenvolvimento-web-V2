import {
    Request,
    Response,
    NextFunction
} from "express";

import ProductService from "../services/productService";

import {
    ProductBody,
    ProductParams
} from "../types/productType";

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
                await this.productService.findAll();

            return res.json(products);

        } catch (error) {

            next(error);
        }
    };

    public findProductByCode = async (
        req: Request<ProductParams>,
        res: Response,
        next: NextFunction
    ) => {

        try {

            const CODIGO =
                Number(req.params.codigo);

            const product =
                await this.productService.findByCode(CODIGO);

            return res.json(product);

        } catch (error) {

            next(error);
        }
    };

    public createProducts = async (
        req: Request<{}, {}, any>,
        res: Response,
        next: NextFunction
    ) => {

        try {

            const {
                DESCRICAO,
                CODIGO_GRUPO,
                VALOR
            } = req.body;

            const product =
                await this.productService.create(
                    DESCRICAO,
                    CODIGO_GRUPO,
                    VALOR
                );

            return res.status(201).json(product);

        } catch (error) {

            next(error);
        }
    };

    public editProducts = async (
        req: Request<ProductParams, {}, any>,
        res: Response,
        next: NextFunction
    ) => {

        try {

            const CODIGO =
                Number(req.params.codigo);

            const {
                DESCRICAO,
                CODIGO_GRUPO,
                VALOR
            } = req.body;

            const product =
                await this.productService.update(
                    CODIGO,
                    DESCRICAO,
                    CODIGO_GRUPO,
                    VALOR
                );

            return res.json(product);

        } catch (error) {

            next(error);
        }
    };

    public excludesProducts = async (
        req: Request<ProductParams>,
        res: Response,
        next: NextFunction
    ) => {

        try {

            const CODIGO =
                Number(req.params.codigo);

            const result =
                await this.productService.delete(CODIGO);

            return res.json(result);

        } catch (error) {

            next(error);
        }
    };
}

export default ProductController;