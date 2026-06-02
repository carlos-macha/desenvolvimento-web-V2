import { useState } from "react";

import type { Product } from "../../models/Product";

interface ModalFilteredProductsProps {
    isOpen: boolean;
    products: Product[];
    onClose: () => void;
    onSelect: (product: Product) => void;
}

export default function ModalFilteredProducts({
    isOpen,
    products,
    onClose,
    onSelect
}: ModalFilteredProductsProps) {

    const [search, setSearch] = useState("");

    if (!isOpen) return null;

    const filteredProducts = products.filter(
        (product) =>
            product.DESCRICAO
                ?.toLowerCase()
                .includes(search.toLowerCase()) ||
            String(product.CODIGO)
                .includes(search)
    );

    return (
        <div className="modal-overlay">

            <div className="modal-content modal-products">

                <div className="modal-header">

                    <h2>
                        Produtos Encontrados
                    </h2>

                    <button
                        className="close-button"
                        onClick={onClose}
                    >
                        X
                    </button>

                </div>

                <div className="modal-body">

                    <input
                        type="text"
                        placeholder="Pesquisar produto..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        className="group-search-input"
                    />

                    <table className="product-table">

                        <thead>

                            <tr>

                                <th>
                                    Código
                                </th>

                                <th>
                                    Descrição
                                </th>

                                <th>
                                    Grupo
                                </th>

                                <th>
                                    Valor
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {filteredProducts.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan={4}
                                        style={{
                                            textAlign: "center"
                                        }}
                                    >
                                        Nenhum produto encontrado
                                    </td>

                                </tr>

                            ) : (

                                filteredProducts.map(product => (

                                    <tr
                                        key={product.CODIGO}
                                        className="selectable-row"
                                        onClick={() =>
                                            onSelect(product)
                                        }
                                    >

                                        <td>
                                            {product.CODIGO}
                                        </td>

                                        <td>
                                            {product.DESCRICAO}
                                        </td>

                                        <td>
                                            {product.CODIGO_GRUPO}
                                        </td>

                                        <td>
                                            {product.VALOR}
                                        </td>

                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}