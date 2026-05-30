import type { Product } from "../models/Product";

const API_URL = "http://localhost:3000/produtos";

export async function createProduct(
    product: Product
) {

    const response = await fetch(API_URL, {
        method: "POST",

        headers: {
            "Content-Type":
                "application/json",
        },

        body: JSON.stringify(product),
    })

    if (!response.ok) {

        throw new Error(
            "Erro ao salvar produto"
        )
    }

    return response.json();
}

export async function getProducts():
    Promise<Product[]> {

    const response =
        await fetch(API_URL)

    if (!response.ok) {

        throw new Error(
            "Erro ao buscar produtos"
        )
    }

    return response.json()
}

export async function getProductByCode(
    codigo: number
): Promise<Product | null> {

    const response = await fetch(
        `${API_URL}/${codigo}`
    )

    if (!response.ok) {

        throw new Error(
            "Erro ao buscar produto"
        )
    }

    return response.json()
}

export async function deleteProduct(
    codigo: number
) {

    const response = await fetch(
        `${API_URL}/${codigo}`,
        {
            method: "DELETE",
        }
    );

    if (!response.ok) {

        throw new Error(
            "Erro ao excluir produto"
        )
    }

    return response.json()
}

export async function updateProduct(
    codigo: number,
    product: Product
) {

    const response = await fetch(
        `${API_URL}/${codigo}`,
        {
            method: "PUT",

            headers: {
                "Content-Type":
                    "application/json",
            },

            body: JSON.stringify(product),
        }
    )

    if (!response.ok) {

        throw new Error(
            "Erro ao atualizar produto"
        )
    }

    return response.json();
}