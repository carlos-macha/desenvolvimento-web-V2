import type { Group } from "../models/Group";

const API_URL = "http://localhost:3000/grupos";

export async function createGroup(
    group: Group
) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(group),
    });

    if (!response.ok) {
        throw new Error("Erro ao criar grupo");
    }

    return response.json();
}

export async function getGroup(): Promise<Group[]> {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Erro ao buscar grupos");
    }

    return response.json();
}

export async function getGroupByCode(
    codigo: number
): Promise<Group | null> {
    const response = await fetch(
        `${API_URL}/${codigo}`
    );

    if (!response.ok) {
        throw new Error("Erro ao buscar grupo");
    }

    return response.json();
}

export async function updateGroup(
    codigo: number,
    group: Group
) {
    const response = await fetch(
        `${API_URL}/${codigo}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(group),
        }
    );

    if (!response.ok) {
        throw new Error(
            "Erro ao atualizar grupo"
        );
    }

    return response.json();
}

export async function deleteGroup(
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
            "Erro ao excluir grupo"
        );
    }

    return response.json();
}