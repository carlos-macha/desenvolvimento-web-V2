import { useEffect, useState } from "react";
import "./ProductRegistration.css"
import Input from "../../components/input/Input";
import Modal from "../../components/modal/ModalProduct";
import Toast from "../../components/toast/Toast";
import { useNavigate } from "react-router-dom";

import {
    createProduct,
    deleteProduct,
    getProductByCode,
    getProducts,
    updateProduct,
} from "../../service/ProductService";

import type { Product } from "../../models/Product";

export default function ProductRegistration() {

    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [search, setSearch] = useState("");
    const [VALOR, setVALOR] = useState("");
    const [DESCRICAO, setDESCRICAO] = useState("");
    const [CODIGO_GRUPO, setCODIGO_GRUPO] = useState("");

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

        } catch (error) {
            console.error(error);
            showToast("Erro ao pesquisar produto", "error");
        }
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
            setCODIGO_GRUPO("");
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

            <div className="create-product">

                <h2>Novo produto</h2>

                <form onSubmit={handleSave}>

                    <Input
                        label="Descrição"
                        type="text"
                        value={DESCRICAO}
                        onChange={(e) => setDESCRICAO(e.target.value)}
                    />

                    <Input
                        label="Grupo"
                        type="text"
                        value={CODIGO_GRUPO}
                        onChange={(e) => setCODIGO_GRUPO(e.target.value)}
                    />

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

        </div>
    );
}