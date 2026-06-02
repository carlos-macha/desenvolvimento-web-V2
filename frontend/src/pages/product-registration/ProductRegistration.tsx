import { useEffect, useState } from "react";
import "./ProductRegistration.css"
import Input from "../../components/input/Input";
import Modal from "../../components/modal/ModalProduct";
import Toast from "../../components/toast/Toast";
import ModalGroupSelector from "../../components/modal/ModalGroupSelector";
import ModalFilteredProducts from "../../components/modal/ModalFilteredProducts";
import { useNavigate } from "react-router-dom";

import {
    createProduct,
    getProductsByGroupRange,
    deleteProduct,
    getProductByCode,
    getProducts,
    updateProduct,
} from "../../service/ProductService";
import { getGroup } from "../../service/GroupService";

import type { Product } from "../../models/Product";
import type { Group } from "../../models/Group";

export default function ProductRegistration() {

    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [search, setSearch] = useState("");
    const [grupoInicial, setGrupoInicial] =
        useState("");

    const [grupoFinal, setGrupoFinal] =
        useState("");

    const [groupFieldTarget, setGroupFieldTarget] =
        useState<"cadastro" | "inicial" | "final" | null>(null);
    const [VALOR, setVALOR] = useState("");
    const [DESCRICAO, setDESCRICAO] = useState("");
    const [CODIGO_GRUPO, setCODIGO_GRUPO] = useState("");

    const [groups, setGroups] =
        useState<Group[]>([]);

    const [isGroupModalOpen, setIsGroupModalOpen] =
        useState(false);

    const [filteredProducts, setFilteredProducts] =
        useState<Product[]>([]);

    const [isFilteredModalOpen, setIsFilteredModalOpen] =
        useState(false);

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

    async function loadProducts() {
        try {
            const data = await getProducts();
            setProducts(data);
        } catch (error) {
            console.error(error);
            showToast("Erro ao carregar produtos", "error");
        }
    }

    useEffect(() => {

        async function fetchData() {

            await loadProducts();
        }

        fetchData();

    }, []);

    async function handleSearch(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            const product = await getProductByCode(Number(search));

            if (!product) {
                showToast("Produto não encontrado", "error");
                return;
            }

            setSelectedProduct(product);
            setIsModalOpen(true);
            setSearch("")

        } catch (error) {
            console.error(error);
            showToast("Erro ao pesquisar produto", "error");
        }
    }

    async function handleSearchByGroup() {

        let inicial = Number(grupoInicial);
        let final = Number(grupoFinal);

        if (!inicial && !final) {
            showToast(
                "Informe pelo menos um grupo",
                "error"
            );
            return;
        }

        if (!grupoInicial.trim()) {
            inicial = Number(grupoFinal);
        }

        if (!grupoFinal.trim()) {
            final = Number(grupoInicial);
        }

        if (inicial > final) {
            [inicial, final] = [final, inicial];
        }

        try {

            const data =
                await getProductsByGroupRange(
                    inicial,
                    final
                );

            console.log("Produtos recebidos:", data);

            setFilteredProducts(data);

            setIsFilteredModalOpen(true);

        } catch (error) {

            console.error(error);

            showToast(
                "Erro ao pesquisar produtos",
                "error"
            );
        }
    }

    async function handleSelectFilteredProduct(
        product: Product
    ) {

        try {

            const completeProduct =
                await getProductByCode(
                    Number(product.CODIGO)
                );

            if (!completeProduct) {

                showToast(
                    "Produto não encontrado",
                    "error"
                );

                return;
            }

            setSelectedProduct(
                completeProduct
            );

            setIsFilteredModalOpen(false);

            setIsModalOpen(true);

        } catch (error) {

            console.error(error);

            showToast(
                "Erro ao abrir produto",
                "error"
            );
        }
    }

    async function handleOpenGroupModal(
        target: "cadastro" | "inicial" | "final"
    ) {

        try {

            const data =
                await getGroup();

            setGroups(data);

            setGroupFieldTarget(target);

            setIsGroupModalOpen(true);

        } catch (error) {

            console.error(error);

            showToast(
                "Erro ao carregar grupos",
                "error"
            );
        }
    }

    function handleSelectGroup(
        group: Group
    ) {

        if (
            groupFieldTarget ===
            "cadastro"
        ) {

            setCODIGO_GRUPO(
                String(group.CODIGO)
            );

        } else if (
            groupFieldTarget ===
            "inicial"
        ) {

            setGrupoInicial(
                String(group.CODIGO)
            );

        } else if (
            groupFieldTarget ===
            "final"
        ) {

            setGrupoFinal(
                String(group.CODIGO)
            );
        }

        setIsGroupModalOpen(false);
    }

    async function handleSave(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (
            !DESCRICAO.trim() ||
            !CODIGO_GRUPO.trim() ||
            !VALOR.trim()
        ) {
            showToast(
                "Todos os campos devem ser preenchidos",
                "error"
            );

            return;
        }


        if (Number(VALOR) <= 0) {
            showToast("O valor deve ser maior que zero", "error");
            return;
        }

        try {
            await createProduct({
                DESCRICAO,
                CODIGO_GRUPO: Number(CODIGO_GRUPO),
                VALOR: Number(VALOR),
            });

            showToast("Produto salvo com sucesso", "success");

            setDESCRICAO("");
            setVALOR("");

            await loadProducts();

        } catch (error) {
            console.error(error);

            if (error instanceof Error) {
                showToast(error.message, "error");
            } else {
                showToast("Erro desconhecido", "error");
            }
        }
    }

    async function handleUpdate(updatedProduct: Product) {

        if (!updatedProduct.CODIGO) return;

        if (updatedProduct.VALOR <= 0) {
            showToast("O valor deve ser maior que zero", "error");
            return;
        }

        try {
            await updateProduct(updatedProduct.CODIGO, updatedProduct);

            showToast("Produto atualizado com sucesso", "success");

            setIsModalOpen(false);
            await loadProducts();

        } catch (error) {
            console.error(error);
            showToast("Erro ao atualizar produto", "error");
        }
    }

    async function handleDelete(codigo: number) {

        try {
            await deleteProduct(codigo);

            showToast("Produto excluído com sucesso", "success");

            setIsModalOpen(false);
            await loadProducts();

        } catch (error) {
            console.error(error);
            showToast("Erro ao excluir produto", "error");
        }
    }

    return (
        <div className="product-registration">

            <header className="page-header">

                <h1>Cadastro de Produtos</h1>

                <div className="header-actions">

                    <button onClick={() => navigate("/")}>
                        Home
                    </button>

                    <button onClick={() => navigate("/group-registration")}>
                        Grupos
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
                        label="Pesquisar produto por código"
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <button type="submit">
                        Pesquisar
                    </button>

                </form>

            </div>

            <div className="group-range-search">

                <h2>
                    Pesquisa por Grupo
                </h2>

                <div className="group-field">

                    <Input
                        label="Grupo Inicial"
                        type="text"
                        value={grupoInicial}
                        onChange={(e) =>
                            setGrupoInicial(
                                e.target.value
                            )
                        }
                    />

                    <button
                        type="button"
                        onClick={() =>
                            handleOpenGroupModal(
                                "inicial"
                            )
                        }
                    >
                        Buscar
                    </button>

                </div>

                <div className="group-field">

                    <Input
                        label="Grupo Final"
                        type="text"
                        value={grupoFinal}
                        onChange={(e) =>
                            setGrupoFinal(
                                e.target.value
                            )
                        }
                    />

                    <button
                        type="button"
                        onClick={() =>
                            handleOpenGroupModal(
                                "final"
                            )
                        }
                    >
                        Buscar
                    </button>

                </div>

                <button
                    type="button"
                    onClick={handleSearchByGroup}
                >
                    Filtrar Produtos
                </button>

            </div>

            <div className="create-product">

                <h2>Novo produto</h2>

                <form onSubmit={handleSave}>

                    <Input
                        label="Descrição"
                        type="text"
                        value={DESCRICAO}
                        onChange={(e) => setDESCRICAO(e.target.value)}
                    />

                    <div className="group-field">

                        <Input
                            label="Grupo"
                            type="text"
                            value={CODIGO_GRUPO}
                            onChange={(e) =>
                                setCODIGO_GRUPO(
                                    e.target.value
                                )
                            }
                        />

                        <button
                            type="button"
                            onClick={() =>
                                handleOpenGroupModal(
                                    "cadastro"
                                )
                            }
                        >
                            Pesquisar Grupo
                        </button>

                    </div>

                    <Input
                        label="Valor"
                        type="number"
                        value={VALOR}
                        onChange={(e) => setVALOR(e.target.value)}
                    />

                    <div className="form-actions">

                        <button type="submit">
                            Salvar
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                setDESCRICAO("");
                                setCODIGO_GRUPO("");
                                setVALOR("");
                            }}
                        >
                            Cancelar
                        </button>

                    </div>

                </form>

            </div>

            <div className="product-table-container">

                <table className="product-table">

                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Descrição</th>
                            <th>Grupo</th>
                            <th>Valor</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((product) => (
                            <tr key={product.CODIGO}>
                                <td>{product.CODIGO}</td>
                                <td>{product.DESCRICAO}</td>
                                <td>{product.CODIGO_GRUPO}</td>
                                <td>{product.VALOR}</td>
                            </tr>
                        ))}
                    </tbody>

                </table>

            </div>

            <>
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    product={selectedProduct}
                    onChange={(updatedProduct) =>
                        setSelectedProduct(updatedProduct)
                    }
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                />

                <ModalGroupSelector
                    isOpen={isGroupModalOpen}
                    groups={groups}
                    onClose={() =>
                        setIsGroupModalOpen(false)
                    }
                    onSelect={handleSelectGroup}
                />

                <ModalFilteredProducts
                    isOpen={isFilteredModalOpen}
                    products={filteredProducts}
                    onClose={() =>
                        setIsFilteredModalOpen(false)
                    }
                    onSelect={
                        handleSelectFilteredProduct
                    }
                />
            </>

        </div>
    );
}