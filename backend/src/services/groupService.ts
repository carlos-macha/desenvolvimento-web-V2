import { connectDatabase } from "../database/firebird"

import { HttpError } from "../utils/HttpError"

import { Group } from "../types/groupType"

import { groupSchema } from "../schemas/groupSchema"

class GroupService {

    async findAll(): Promise<Group[]> {

        const db = await connectDatabase()

        return new Promise((resolve, reject) => {

            db.query(
                `SELECT
                    G.CODIGO,
                    G.DESCRICAO,
                    COUNT(P.CODIGO) AS QUANTIDADE_PRODUTOS
                FROM GRUPO G
                LEFT JOIN PRODUTO P
                    ON P.CODIGO_GRUPO = G.CODIGO
                GROUP BY
                    G.CODIGO,
                    G.DESCRICAO`,
                [],

                (
                    err: Error | null,
                    result: Group[]
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
        CODIGO: number
    ): Promise<Group | null> {

        const db = await connectDatabase();

        return new Promise((resolve, reject) => {

            db.query(
                `
            SELECT *
            FROM GRUPO
            WHERE CODIGO = ?
            `,
                [CODIGO],

                (
                    err: Error | null,
                    result: Group[]
                ) => {

                    db.detach();

                    if (err) {

                        reject(
                            new HttpError(
                                500,
                                err.message
                            )
                        );

                        return;
                    }

                    resolve(
                        result[0] || null
                    );
                }
            );
        });
    }

    async create(
        descricao: string
    ): Promise<any> {

        const parsedData =
            groupSchema.parse({
                descricao
            })

        const db = await connectDatabase()

        return new Promise((resolve, reject) => {

            db.query(
                `
                INSERT INTO GRUPO (
                    DESCRICAO
                )
                VALUES (?)
                RETURNING CODIGO
                `,
                [
                    parsedData.descricao
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
        descricao: string
    ): Promise<any> {

        const parsedData =
            groupSchema.parse({
                descricao
            })

        const db = await connectDatabase()

        return new Promise((resolve, reject) => {

            db.query(
                `
                UPDATE GRUPO
                SET
                    DESCRICAO = ?
                WHERE CODIGO = ?
                `,
                [
                    parsedData.descricao,
                    codigo
                ],

                (
                    err: Error | null
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

                    resolve({
                        message:
                            "Grupo atualizado com sucesso"
                    })
                }
            )
        })
    }

    async delete(
        codigo: number
    ): Promise<any> {

        const db = await connectDatabase()

        return new Promise((resolve, reject) => {

            db.query(
                `
                DELETE FROM GRUPO
                WHERE CODIGO = ?
                `,
                [codigo],

                (
                    err: Error | null
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

                    resolve({
                        message:
                            "Grupo deletado com sucesso"
                    })
                }
            )
        })
    }
}

export default GroupService