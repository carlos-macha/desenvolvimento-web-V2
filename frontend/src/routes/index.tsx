import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Home = lazy(() => import("../pages/home/Home"))
const GroupRegistration = lazy(() => import ("../pages/group-registration/GroupRegistration"))
const ProductRegistration = lazy(() => import ("../pages/product-registration/ProductRegistration"))

export default function RoutesApp() {
    return (
        <BrowserRouter>
            <Suspense fallback={<p>Carregando...</p>}>
                <Routes>
                    <Route>
                        <Route path="/" element={<Home />} />
                    </Route>
                    <Route>
                        <Route path="/group-registration" element={<GroupRegistration/>}/>
                        <Route path="/product-registration" element={<ProductRegistration/>}/>
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}