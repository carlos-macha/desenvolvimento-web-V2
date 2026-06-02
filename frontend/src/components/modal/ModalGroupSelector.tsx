import { useState } from "react";

import "./Modal.css";

import type { Group } from "../../models/Group";

type ModalGroupSelectorProps = {
    isOpen: boolean;
    groups: Group[];
    onClose: () => void;
    onSelect: (group: Group) => void;
};

export default function ModalGroupSelector({
    isOpen,
    groups,
    onClose,
    onSelect,
}: ModalGroupSelectorProps) {

    const [search, setSearch] = useState("");

    if (!isOpen) {
        return null;
    }

    const filteredGroups = groups.filter((group) =>
        group.DESCRICAO
            ?.toLowerCase()
            .includes(
                search.toLowerCase()
            )
    );

    return (
        <div className="modal-overlay">

            <div className="modal-content modal-selector">

                <div className="modal-header">

                    <h2>
                        Selecionar Grupo
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
                        placeholder="Pesquisar grupo..."
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                        className="group-search-input"
                    />

                    <div className="group-selector-table-container">

                        <table className="group-selector-table">

                            <thead>

                                <tr>
                                    <th>
                                        Código
                                    </th>

                                    <th>
                                        Descrição
                                    </th>
                                </tr>

                            </thead>

                            <tbody>

                                {filteredGroups.map(
                                    (group) => (

                                        <tr
                                            key={
                                                group.CODIGO
                                            }
                                            onClick={() =>
                                                onSelect(
                                                    group
                                                )
                                            }
                                            className="selectable-row"
                                        >

                                            <td>
                                                {
                                                    group.CODIGO
                                                }
                                            </td>

                                            <td>
                                                {
                                                    group.DESCRICAO
                                                }
                                            </td>

                                        </tr>
                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>
    );
}