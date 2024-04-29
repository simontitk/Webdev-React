import { Product } from "../../interfaces/interfaces";
import ProductCard from "../_common/ProductCard";

interface ProductDisplayProps {
    products: Product[];
}

export default function ProductDisplay({ products }: ProductDisplayProps) {

    return (
        <div className="center-panel">
            <h1 className="filter-result">{products.length} products to hydrate yourself</h1>
            <div className="product-section ">
                { products.map(product => (
                    <ProductCard 
                        key={product.id}
                        id={product.id} 
                        name={product.name} 
                        description={product.description} 
                        picture_uri={product.picture_uri} 
                        volume={product.volume} 
                        amount={product.amount} 
                        rating={product.rating} 
                        price={product.price}>
                    </ProductCard>
                ))}
            </div>
        </div>
    );
}