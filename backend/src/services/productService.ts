import { connectDatabase } from "../database/firebird"
import { HttpError } from "../utils/HttpError"
import { productSchema } from "../schemas/productSchema"
import {
    Product
} from "../types/productType"

class ProductService {

    async findAll(): Promise<Product[]> {

        const db = await connectDatabase()

        return new Promise((resolve, reject) => {

            db.query(
                "SELECT * FROM PRODUTO",
                [],

                (
                    err: Error | null,
                    result: Product[]
                ) => {

                    db.detach()

                    if (err) {

                        reject(
                            new HttpError(
                                500,
                                err.message
                            )
                        )

                        return
                    }

                    resolve(result)
                }
            )
        })
    }

    async findByGroupRange(
        grupoInicial: number,
        grupoFinal: number
    ): Promise<Product[]> {

        const db = await connectDatabase()

        return new Promise((resolve, reject) => {

            db.query(
                `
            SELECT *
            FROM PRODUTO
            WHERE CODIGO_GRUPO
                BETWEEN ? AND ?
            ORDER BY
                CODIGO_GRUPO,
                DESCRICAO
            `,
                [
                    grupoInicial,
                    grupoFinal
                ],

                (
                    err: Error | null,
                    result: Product[]
                ) => {

                    db.detach()

                    if (err) {

                        reject(
                            new HttpError(
                                500,
                                err.message
                            )
                        )

                        return
                    }

                    resolve(result)
                }
            )
        })
    }

    async findByCode(
        codigo: number
    ): Promise<Product | null> {

        const db = await connectDatabase()

        return new Promise((resolve, reject) => {

            db.query(
                `
            SELECT *
            FROM PRODUTO
            WHERE CODIGO = ?
            `,
                [codigo],

                (
                    err: Error | null,
                    result: Product[]
                ) => {

                    db.detach()

                    if (err) {

                        reject(
                            new HttpError(
                                500,
                                err.message
                            )
                        )

                        return
                    }

                    resolve(result[0] || null)
                }
            )
        })
    }

    async create(
        descricao: string,
        codigo_grupo: number,
        valor: number
    ): Promise<any> {

        const parsedData =
            productSchema.parse({
                descricao,
                codigo_grupo,
                valor
            })

        const db = await connectDatabase()

        return new Promise((resolve, reject) => {

            db.query(
                `
                INSERT INTO PRODUTO (
                    DESCRICAO,
                    CODIGO_GRUPO,
                    DATA_CADASTRO,
                    VALOR
                )
                VALUES (?, ?, CURRENT_DATE, ?)
                RETURNING CODIGO
                `,
                [
                    parsedData.descricao,
                    parsedData.codigo_grupo,
                    parsedData.valor
                ],

                (
                    err: Error | null,
                    result: any
                ) => {

                    db.detach()

                    if (err) {

                        reject(
                            new HttpError(
                                500,
                                err.message
                            )
                        )

                        return
                    }

                    resolve(result)
                }
            )
        })
    }

    async update(
        codigo: number,
        descricao: string,
        codigo_grupo: number,
        valor: number
    ): Promise<any> {

        const parsedData =
            productSchema.parse({
                descricao,
                codigo_grupo,
                valor
            })

        const db = await connectDatabase()

        return new Promise((resolve, reject) => {

            db.query(
                `
                UPDATE PRODUTO
                SET
                    DESCRICAO = ?,
                    CODIGO_GRUPO = ?,
                    VALOR = ?
                WHERE CODIGO = ?
                `,
                [
                    parsedData.descricao,
                    parsedData.codigo_grupo,
                    parsedData.valor,
                    codigo
                ],

                (err: Error | null) => {

                    db.detach()

                    if (err) {

                        reject(
                            new HttpError(
                                500,
                                err.message
                            )
                        )

                        return
                    }

                    resolve({
                        message: "Produto atualizado com sucesso"
                    })
                }
            )
        })
    }

    async delete(codigo: number): Promise<any> {

        const db = await connectDatabase()

        return new Promise((resolve, reject) => {

            db.query(
                `
                DELETE FROM PRODUTO
                WHERE CODIGO = ?
                `,
                [codigo],

                (err: Error | null) => {

                    db.detach()

                    if (err) {

                        reject(
                            new HttpError(
                                500,
                                err.message
                            )
                        )

                        return
                    }

                    resolve({
                        message: "Produto deletado com sucesso"
                    })
                }
            )
        })
    }
}

export default ProductService