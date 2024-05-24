import "./product_card.css";
import { useContext } from "react";
import { CartContext, MessageContext, UserContext } from "../../GlobalContext";
import { addCartItem } from "../../services/cartItemService";
import { Product } from "../../interfaces/interfaces";

interface ProductCardProps {
    product: Product
}

export default function ProductCard({ product }: ProductCardProps) {

    const { user } = useContext(UserContext);
    const { cart, setCart } = useContext(CartContext);
    const { addMessage } = useContext(MessageContext);

    function addItem() {
        addCartItem(product, 1, cart, setCart, user?.id);
        addMessage(`${product.name} added to cart!`, "success")
    }

    return (
        <div className="product-card">
            <div className="rating-icon">
                <img src="/icons/droplet.png" alt="icon of a water droplet" width="50px"></img>
            </div>
            <div className="rating-number">
                {product.rating}
            </div>
            <div className="product-display">
                <a href={`/products/${product.id}`}>
                    <div className="product-img-container">
                        <img
                            src={`http://localhost:3000/images/products/${product.picture_uri}`}
                            alt={product.description}
                            height="260px"
                            className="product-image">
                        </img>
                    </div>
                    <div className="product-name-container">
                        <span className="product-name">{product.name}</span>
                        <span className="product-size">{product.amount} x {product.volume} ml</span>
                    </div>
                </a>
            </div>
            <div className="product-purchase-container">
                <span className="product-price">{product.price} DKK</span>
                <button className="add-to-cart-button" onClick={addItem}>
                    Add to cart
                </button>
            </div>
        </div>
    );
}