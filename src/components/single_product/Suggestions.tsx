import { useContext } from "react";

import { ProductContext } from "../../contexts";
import ProductCard from "../_common/ProductCard";


export default function Suggestions() {

    const { products } = useContext(ProductContext)

    return (
        <div className="suggestions">
            <section className="suggested-items">
                {products && products.sort(() =>
                    0.5 - Math.random())
                    .slice(0, 3)
                    .map((product, i) => (
                        <ProductCard
                            key={i}
                            id={product.id}
                            name={product.name}
                            description={product.description}
                            picture_uri={product.picture_uri}
                            volume={product.volume}
                            amount={product.amount}
                            rating={product.rating}
                            price={product.price}
                        />
                    ))}
            </section>
        </div>
    )
}