import { useContext } from "react";

import { ProductContext } from "../../GlobalContext";
import ProductCard from "../_common/ProductCard";


export default function Suggestions() {

    const { products } = useContext(ProductContext)

    return (
        <div className="suggestions">
            <section className="suggested-items">
                {products && products.slice(23, 26).map((product, i) => (
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