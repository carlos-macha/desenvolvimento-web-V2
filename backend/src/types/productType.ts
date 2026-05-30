export interface Product {

    CODIGO: number;

    DESCRICAO: string;

    CODIGO_GRUPO: number;

    VALOR: number;
}

export interface ProductBody {

    DESCRICAO: string;

    CODIGO_GRUPO: number;

    VALOR: number;
}

export interface ProductParams {

    codigo: string;
}