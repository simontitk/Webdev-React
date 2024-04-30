
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import { CategoryContext, ProductContext, SelectedCategoryContext, SelectedProductContext } from "./contexts";
import { Category, Product } from "./interfaces/interfaces";
import "./styles.css";


export default function App() {

    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);


    useEffect(() => {
        fetch("http://localhost:3000/products/")
            .then(respone => respone.json())
            .then((data: Product[]) => { setProducts(data); setSelectedProducts(data) })
            .catch(err => console.log(err));
    }, []);


    useEffect(() => {
        fetch("http://localhost:3000/categories/")
            .then(respone => respone.json())
            .then((data: Category[]) => {
                setCategories(data);
                setSelectedCategories(data.map(category => category.id))
            })
            .catch(err => console.log(err));
    }, []);


    return (
        <CategoryContext.Provider value={{ categories, setCategories }}>
            <SelectedCategoryContext.Provider value={{ selectedCategories, setSelectedCategories }}>
                <ProductContext.Provider value={{ products, setProducts }}>
                    <SelectedProductContext.Provider value={{ selectedProducts, setSelectedProducts }}>
                        <BrowserRouter>
                            <Header userName={""} isLoggedIn={false}></Header>
                            <Layout>
                                <Routes>
                                    <Route element={<HomePage />} path="/" />
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
                    </SelectedProductContext.Provider>
                </ProductContext.Provider>
            </SelectedCategoryContext.Provider>
        </CategoryContext.Provider>
    );
}