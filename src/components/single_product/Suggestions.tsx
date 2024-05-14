import { useContext } from "react";

import { ProductContext } from "../../GlobalContext";
import ProductCard from "../_common/ProductCard";


export default function Suggestions() {

    const { products } = useContext(ProductContext)

    return (
        <div className="suggestions">
            <section className="suggested-items">
                {products && products.sort(() =>
                    0.5 - Math.random())
                    .slice(0, 3)
                    .map(product => (
                        <ProductCard product={product} key={product.id}/>
                    ))}
            </section>
        </div>
    )
}