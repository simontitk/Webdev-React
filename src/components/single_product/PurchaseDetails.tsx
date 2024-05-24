import { useContext, useState } from "react";
import { CartContext, MessageContext, UserContext } from "../../GlobalContext";
import { ProductContext } from "./ProductContext";
import { addCartItem } from "../../services/cartItemService";

export default function PurchaseDetails() {

    const [quantity, setQuantity] = useState(1);
    const { user } = useContext(UserContext);
    const { cart, setCart } = useContext(CartContext);
    const { addMessage } = useContext(MessageContext);
    const product = useContext(ProductContext);


    function handleIncrease() {
        setQuantity(prevQuantity => prevQuantity < 999 ? prevQuantity + 1 : 999);
    };

    function handleDecrease() {
        setQuantity(prevQuantity => prevQuantity > 1 ? prevQuantity - 1 : 1);
    };

    function addToCart() {
        if (!!product) {
            addCartItem(product, quantity, cart, setCart, user?.id);
            addMessage(`${product.name} added to cart!`, "success")
        }
    }

    return (
        <>
            <div className="purchase-details">
                <div className="delivery-details">
                    {user? 
                        <div className="delivery-details">
                            <p>Free delivery to:<br />{user.city}</p>
                            <p className="address">
                            {user.street}
                            </p>
                        </div>
                        :
                        <div className="delivery-details">
                            <p className="address">Please log in to place an order</p>
                        </div>                        
                    }
                </div>
                <div>
                    <div className="quantity">
                        <p >Quantity</p>
                        <button onClick={handleDecrease}>-</button>
                        <p className="quantity-counter">{quantity}</p>
                        <button onClick={handleIncrease}>+</button>
                    </div>
                    <div className="cart-share">
                        <button className="button" onClick={addToCart}>Add to cart</button>
                        <button className="button" onClick={() => { alert(`Thanks for sharing ${product && product.name}`) }}>Share</button>
                    </div>
                </div>
            </div>
        </>
    );
}