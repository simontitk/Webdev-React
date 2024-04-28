import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/_common/Header";
import Footer from "./components/_common/Footer";
import Layout from "./components/_common/Layout";
import HomePage from "./components/home/HomePage";
import AllProductsPage from "./components/all_products/AllProductsPage";
import SingleProductPage from "./components/single_product/SingleProductPage";
import RegisterPage from "./components/register/RegisterPage";
import LoginPage from "./components/login/LoginPage";
import ProfilePage from "./components/profile/ProfilePage";
import CartPage from "./components/cart/CartPage";
import "./styles.css"


export default function App() {

    return (
        <>
            <BrowserRouter>
                <Header userName={""} isLoggedIn={false}></Header>
                <Layout>
                    <Routes>
                        <Route element={<HomePage />} path="/" />                        
                        <Route element={<AllProductsPage />} path="/all_products" /> 
                        <Route element={<SingleProductPage/>} path="/single_product" /> 
                        <Route element={<RegisterPage />} path="/register" /> 
                        <Route element={<LoginPage />} path="/login" /> 
                        <Route element={<ProfilePage />} path="/profile" /> 
                        <Route element={<CartPage />} path="/cart" /> 
                    </Routes>
                </Layout>
                <Footer></Footer>
            </BrowserRouter>
        </>
    );
}