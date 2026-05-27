import { connectDatabase } from "../database/firebird"

import { HttpError } from "../utils/HttpError"

import { Group } from "../types/groupType"

import { groupSchema } from "../schemas/groupSchema"

class GroupService {

    async findAll(): Promise<Group[]> {

        const db = await connectDatabase()

        return new Promise((resolve, reject) => {

            db.query(
                "SELECT * FROM GRUPO",
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