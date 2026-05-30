import "./Home.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Sistema de Produtos</h1>
            </header>

            <main className="home-content">
                <div className="home-box">
                    <div className="home-buttons">
                        <button
                            className="home-button"
                            onClick={() => navigate("/product-registration")}
                        >
                            Criar Produtos
                        </button>

                        <button
                            className="home-button secondary"
                            onClick={() => navigate("/group-registration")}
                        >
                            Criar Grupos
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}