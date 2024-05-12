import { useContext } from "react";
import { CartContext } from "../../GlobalContext";
import { removeCartItem, updateCartItem } from "../../services/cartItemService";

interface CartItemCardProps {
    quantity: number,
    uid: number,
    pid: number,
    name: string,
    description: string,
    picture_uri: string,
    volume: number,
    amount: number,
    price: number
}

export default function CartItemCard({quantity, uid, pid, name, description, picture_uri, volume, amount, price}: CartItemCardProps) {

        const { cart, setCart } = useContext(CartContext);

        return (
            <div>
                <div className="basket-item-left-container" id="{id}"> 
                    <img className="basket-item-image" width={65} height={65} src={`http://localhost:3000/images/products/${picture_uri}`} alt={description}/>
                    <div className="basket-item-name-container">
                <span className="basket-item-title">{name}</span>
                <span className="basket-item-size">{amount} x {volume} ml</span>
                <div className="input-group quantity-selector">
                    <input 
                        type="number" 
                        id="inputQuantitySelector" 
                        className="form-control" 
                        name="quantity" 
                        title="quantity" 
                        value={quantity} 
                        min="1" 
                        max="99" 
                        step="1" onChange={(e) => updateCartItem(uid, pid, parseInt(e.target.value), cart, setCart)}/>
                        </div>
                    </div>
                </div>
            <div className="basket-item-space"></div>
            <div className="basket-item-price-container">
                <span className="basket-item-price">{price}</span>
                <button className="button-delete" role="button" onClick={() => removeCartItem(uid, pid, cart, setCart)}>delete</button>
            </div>
            </div>
        )
    }