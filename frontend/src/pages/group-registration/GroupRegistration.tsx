import { useEffect, useState } from "react";
import "./GroupRegistration.css"
import Input from "../../components/input/Input";
import ModalGroup from "../../components/modal/ModalGroup";
import Toast from "../../components/toast/Toast";
import { useNavigate } from "react-router-dom";

import {
    createGroup,
    deleteGroup,
    getGroup,
    getGroupByCode,
    updateGroup,
} from "../../service/GroupService";

import type { Group } from "../../models/Group";

export default function GroupRegistration() {

    const [groups, setGroups] = useState<Group[]>([]);
    const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [DESCRICAO, setDESCRICAO] = useState("");
    const navigate = useNavigate();

    const [toast, setToast] = useState<{
        message: string;
        type: "success" | "error";
    } | null>(null);

    function showToast(message: string, type: "success" | "error") {
        setToast({ message, type });

        setTimeout(() => {
            setToast(null);
        }, 3000);
    }

    async function loadGroups() {
        try {
            const data = await getGroup();
            setGroups(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {

        async function fetchData() {

            await loadGroups();
        }

        fetchData();

    }, []);

    async function handleSearch(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        try {
            const group = await getGroupByCode(Number(search));

            if (!group) {
                showToast("Grupo não encontrado", "error");
                return;
            }

            setSelectedGroup(group);
            setIsModalOpen(true);

        } catch (error) {
            console.error(error);
            showToast("Erro ao pesquisar grupo", "error");
        }
    }

    async function handleSave(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        try {
            await createGroup({ DESCRICAO });

            showToast("Grupo salvo com sucesso", "success");

            setDESCRICAO("");
            await loadGroups();

        } catch (error) {
            console.error(error);

            if (error instanceof Error) {
                showToast(error.message, "error");
            } else {
                showToast("Erro desconhecido", "error");
            }
        }
    }

    async function handleUpdate(updatedGroup: Group) {

        if (!updatedGroup.CODIGO) return;

        try {
            await updateGroup(updatedGroup.CODIGO, updatedGroup);

            showToast("Grupo atualizado com sucesso", "success");

            setIsModalOpen(false);
            await loadGroups();

        } catch (error) {
            console.error(error);
            showToast("Erro ao atualizar grupo", "error");
        }
    }

    async function handleDelete(codigo: number) {

        try {
            await deleteGroup(codigo);

            showToast("Grupo excluído com sucesso", "success");

            setIsModalOpen(false);
            await loadGroups();

        } catch (error) {
            console.error(error);
            showToast("Erro ao excluir grupo", "error");
        }
    }

    return (
        <div className="group-registration">

            <header className="page-header">

                <h1>Cadastro de Grupos</h1>

                <div className="header-actions">

                    <button onClick={() => navigate("/")}>
                        Home
                    </button>

                    <button onClick={() => navigate("/product-registration")}>
                        Produtos
                    </button>

                </div>

            </header>

            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                />
            )}

            <div className="unique-search-code">

                <form onSubmit={handleSearch}>

                    <Input
                        label="Pesquisar grupo"
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                    <button type="submit">
                        Pesquisar
                    </button>

                </form>

            </div>

            <div className="create-group">

                <h2>Novo Grupo</h2>

                <form onSubmit={handleSave}>

                    <Input
                        label="Descrição"
                        value={DESCRICAO}
                        onChange={(e) =>
                            setDESCRICAO(e.target.value)
                        }
                    />

                    <div className="form-actions">

                        <button type="submit">
                            Salvar
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                setDESCRICAO("");
                            }}
                        >
                            Cancelar
                        </button>

                    </div>

                </form>

            </div>

            <div className="group-table-container">

                <table className="group-table">

                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Descrição</th>
                            <th>Quantidade Produtos</th>
                        </tr>
                    </thead>

                    <tbody>
                        {groups.map((group) => (
                            <tr key={group.CODIGO}>
                                <td>{group.CODIGO}</td>
                                <td>{group.DESCRICAO}</td>
                                <td>{group.QUANTIDADE_PRODUTOS ?? 0}</td>
                            </tr>
                        ))}
                    </tbody>

                </table>

            </div>

            <ModalGroup
                isOpen={isModalOpen}
                group={selectedGroup}
                onClose={() => setIsModalOpen(false)}
                onChange={(updatedGroup: Group) =>
                    setSelectedGroup(updatedGroup)
                }
                onUpdate={handleUpdate}
                onDelete={handleDelete}
            />

        </div>
    );
}
