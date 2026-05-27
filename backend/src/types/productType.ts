export interface Product {

    codigo: number

    descricao: string

    codigo_grupo: number

    valor: number
}

export interface ProductBody {

    descricao: string

    codigo_grupo: number

    valor: number
}

export interface ProductParams {

    codigo: string
}