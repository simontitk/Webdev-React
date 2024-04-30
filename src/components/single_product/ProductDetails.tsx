import { useContext } from "react";
import { ProductContext } from "./ProductContext";

export default function ProductDetails() {

    const product = useContext(ProductContext);

    return (
        <div className="product-details">
            <p className="single-product-name">{product && product.name}<br />{product && product.volume} ml</p>
            <div className="price">
                <p className="pricetag">{product && product.price} DKK</p>
                <p className="vat">incl. VAT</p>
            </div>
            <p className="product-brand">{product && product.brand}</p>
            <p className="product-description hide-text">{product && product.description}
            </p>
        </div>
    )
}