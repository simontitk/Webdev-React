import { useEffect, useState } from "react";
import { Category, Product } from "../../interfaces/interfaces";
import CategoryCard from "./CategoryCard";
import LandingSection from "./LandingSection";
import ProductCard from "../_common/ProductCard";
import FrontpageSection from "./FrontpageSection";
import "./home.css";

export default function HomePage() {

    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);


    useEffect(() =>{
        fetch("http://localhost:3000/products/")
            .then(response => response.json())
            .then((data: Product[]) => setProducts(data))
            .catch(err => console.log(err))
    }, []);


    useEffect(() => {
        fetch("http://localhost:3000/categories/")
            .then(response => response.json())
            .then((data: Category[]) => setCategories(data))
            .catch(err => console.log(err));
    }, []);


    return (
        <>
            <div className="left-panel"></div>
            <div className="center-panel">
                <LandingSection></LandingSection>
                <FrontpageSection<Category>
                    header="Browse our categories:"
                    Component={CategoryCard} 
                    data={categories}
                    style="category-display">
                </FrontpageSection>
                <FrontpageSection<Product>
                    header="Latest offers:"
                    Component={ProductCard}
                    data={products.slice(0, 3)}
                    style="offer-display">
                </FrontpageSection>
            </div>
            <div className="right-panel"></div>
        </>
    );
}