
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalContext from "./GlobalContext";
import Footer from "./components/_common/Footer";
import Header from "./components/_common/Header";
import Layout from "./components/_common/Layout";
import AllProductsPage from "./components/all_products/AllProductsPage";
import CartPage from "./components/cart/CartPage";
import HomePage from "./components/home/HomePage";
import LoginPage from "./components/login/LoginPage";
import ProfilePage from "./components/profile/ProfilePage";
import RegisterPage from "./components/register/RegisterPage";
import SingleProductPage from "./components/single_product/SingleProductPage";
import "./styles.css";


export default function App() {

    return (
        <GlobalContext>
            <BrowserRouter>
                <Header userName={""} isLoggedIn={false}></Header>
                <Layout>
                    <Routes>
                        <Route element={<HomePage />} path="/"/>
                        <Route element={<AllProductsPage />} path="/all_products" />
                        <Route element={<SingleProductPage />} path="/products/:id" />
                        <Route element={<RegisterPage />} path="/register" />
                        <Route element={<LoginPage />} path="/login" />
                        <Route element={<ProfilePage />} path="/profile" />
                        <Route element={<CartPage />} path="/cart" />
                    </Routes>
                </Layout>
                <Footer></Footer>
            </BrowserRouter>
        </GlobalContext>
    );
}