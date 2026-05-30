import "./Modal.css";

import Input from "../input/Input";

import type { Product } from "../../models/Product";

type ModalProps = {
    isOpen: boolean;

    product: Product | null;

    onClose: () => void;

    onDelete: (codigo: number) => void;

    onUpdate: (
        product: Product
    ) => void;

    onChange: (
        product: Product
    ) => void;
};

export default function Modal({
    isOpen,
    product,
    onClose,
    onDelete,
    onUpdate,
    onChange,
}: ModalProps) {

    if (!isOpen || !product) {
        return null;
    }

    return (
        <div className="modal-overlay">

            <div className="modal-content">

                <div className="modal-header">

                    <h2>
                        Editar Produto
                    </h2>

                    <button
                        className="close-button"
                        onClick={onClose}
                    >
                        X
                    </button>

                </div>

                <div className="modal-body">

                    <Input
                        label="Descrição"
                        type="text"
                        value={
                            product.DESCRICAO
                        }
                        onChange={(e) =>
                            onChange({
                                ...product,

                                DESCRICAO:
                                    e.target.value,
                            })
                        }
                    />

                    <Input
                        label="Grupo"
                        type="number"
                        value={String(
                            product.CODIGO_GRUPO
                        )}
                        onChange={(e) =>
                            onChange({
                                ...product,

                                CODIGO_GRUPO:
                                    Number(
                                        e.target.value
                                    ),
                            })
                        }
                    />

                    <Input
                        label="Valor"
                        type="number"
                        value={String(
                            product.VALOR
                        )}
                        onChange={(e) =>
                            onChange({
                                ...product,

                                VALOR:
                                    Number(
                                        e.target.value
                                    ),
                            })
                        }
                    />

                    <div className="modal-actions">

                        <button
                            className="save-button"
                            onClick={() =>
                                onUpdate(
                                    product
                                )
                            }
                        >
                            Salvar
                        </button>

                        <button
                            className="delete-button"
                            onClick={() => {

                                if (
                                    product.CODIGO
                                ) {

                                    onDelete(
                                        product.CODIGO
                                    );
                                }
                            }}
                        >
                            Excluir
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}