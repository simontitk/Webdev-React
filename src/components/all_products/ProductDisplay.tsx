import { Product } from "../../interfaces/interfaces";
import ProductCard from "../_common/ProductCard";

interface ProductDisplayProps {
    products: Product[];
}

export default function ProductDisplay({ products }: ProductDisplayProps) {

    return (
        <div className="center-panel">
            <h1 className="filter-result">{products.length} {`product${products.length !==1 ? "s" : ""} to hydrate yourself`}</h1>
            <div className="product-section ">
                { products.map(product => (
                    <ProductCard key={product.id} product={product}></ProductCard>
                ))}
            </div>
        </div>
    );
}