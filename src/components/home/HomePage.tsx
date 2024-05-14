import { useContext } from "react";
import { CategoryContext, ProductContext } from "../../GlobalContext";
import CategoryCard from "./CategoryCard";
import LandingSection from "./LandingSection";
import ProductCard from "../_common/ProductCard";
import "./home.css";


export default function HomePage() {

    const { products } = useContext(ProductContext);
    const { categories } = useContext(CategoryContext);

    return (
        <>
            <div className="left-panel"></div>
            <div className="center-panel">

                <LandingSection></LandingSection>

                <section className="frontpage-section">
                    <h1 className="frontpage-section-header">
                        Browse our categories:
                    </h1>
                    <div className="category-display">
                        { categories.map(item=> 
                            <CategoryCard key={item.id} id={item.id} name={item.name} description={item.description} ></CategoryCard>
                        )}
                    </div>
                </section>

                <section className="frontpage-section">
                    <h1 className="frontpage-section-header">
                        Latest offers:
                    </h1>
                    <div className="offer-display">
                        { products.slice(0, 3).map(item=> (
                            <ProductCard key={item.id} product={item}></ProductCard>
                        ))}
                    </div>
                </section>

            </div>
            <div className="right-panel"></div>
        </>
    );
}