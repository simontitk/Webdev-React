import { useContext } from "react";
import { Category, Product } from "../../interfaces/interfaces";
import CategoryCard from "./CategoryCard";
import LandingSection from "./LandingSection";
import ProductCard from "../_common/ProductCard";
import FrontpageSection from "./FrontpageSection";
import "./home.css";
import { CategoryContext, ProductContext } from "../../GlobalContext";

interface ProductCardProps {
    product: Product
}

export default function HomePage() {

    const { products } = useContext(ProductContext);
    const { categories } = useContext(CategoryContext);

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
{/*                 <FrontpageSection<ProductCardProps>
                    header="Latest offers:"
                    Component={ProductCard}
                    data={products.slice(0, 3)}
                    style="offer-display">
                </FrontpageSection> */}
            </div>
            <div className="right-panel"></div>
        </>
    );
}