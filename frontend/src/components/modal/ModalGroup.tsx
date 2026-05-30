import "./Modal.css";

import Input from "../input/Input";

import type { Group } from "../../models/Group";

type ModalGroupProps = {
    isOpen: boolean;

    group: Group | null;

    onClose: () => void;

    onDelete: (codigo: number) => void;

    onUpdate: (
        group: Group
    ) => void;

    onChange: (
        group: Group
    ) => void;
};

export default function ModalGroup({
    isOpen,
    group,
    onClose,
    onDelete,
    onUpdate,
    onChange,
}: ModalGroupProps) {
    if (!isOpen || !group) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">

                <div className="modal-header">
                    <h2>
                        Editar Grupo
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
                            group.DESCRICAO
                        }
                        onChange={(e) =>
                            onChange({
                                ...group,
                                DESCRICAO:
                                    e.target.value,
                            })
                        }
                    />

                    <div className="modal-actions">

                        <button
                            className="save-button"
                            onClick={() =>
                                onUpdate(group)
                            }
                        >
                            Salvar
                        </button>

                        <button
                            className="delete-button"
                            onClick={() => {
                                if (
                                    group.CODIGO
                                ) {
                                    onDelete(
                                        group.CODIGO
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