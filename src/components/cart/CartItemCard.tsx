import { useContext } from "react";
import { CartContext, MessageContext, UserContext } from "../../GlobalContext";
import { removeCartItem, updateCartItem } from "../../services/cartItemService";
import { CartItem, Product } from "../../interfaces/interfaces";
import "./cart.css";

interface CartItemCardProps {
    item: CartItem
}

export default function CartItemCard({item}: CartItemCardProps) {

        const { cart, setCart } = useContext(CartContext);
        const { user } = useContext(UserContext);
        const { addMessage } = useContext(MessageContext);

        return (
            <div className="basket-item-row">
                <div className="basket-item-left-container" id="{id}"> 
                    <img className="basket-item-image" width={65} height={65} src={`http://localhost:3000/images/products/${item.product.picture_uri}`} alt={item.product.description}/>
                    <div className="basket-item-name-container">
                <span className="basket-item-title">{item.product.name}</span>
                <span className="basket-item-size">{item.product.amount} x {item.product.volume} ml</span>
                <div className="input-group quantity-selector">
                    <input 
                        type="number" 
                        id="inputQuantitySelector" 
                        className="form-control" 
                        name="quantity" 
                        title="quantity" 
                        value={item.quantity} 
                        min="1" 
                        max="99" 
                        step="1" onChange={(e) => updateCartItem(item.product, parseInt(e.target.value), cart, setCart, user?.id)}/>
                        </div>
                    </div>
                </div>
            <div className="basket-item-space"></div>
            <div className="basket-item-price-container">
                <span className="basket-item-price">{item.product.price}</span>
                <button className="button-delete" role="button" onClick={() => {
                    removeCartItem(item.product, cart, setCart, user?.id);
                    addMessage(`${item.product.name} removed from cart.`, "success")
                }}>delete</button>
            </div>
            </div>
        )
    }