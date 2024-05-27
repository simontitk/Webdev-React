import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext, MessageContext, UserContext } from "../../GlobalContext";
import CartItemCard from "./CartItemCard";
import "./cart.css";

export default function CartPage() {

    const { cart } = useContext(CartContext);
    const { user } = useContext(UserContext);

    const { addMessage } = useContext(MessageContext);
    const totalPrice = cart.map(item => item.quantity * item.product.price).reduce((sum,price) => sum+price, 0).toFixed(2)

    function sendOrder() {
        const confirmCheckout = window.confirm(`Confirm order checkout of ${totalPrice} DKK?`);
        if (user && (cart.length > 0) && confirmCheckout) {
            fetch(`http://localhost:3000/orders/user/${user.id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({productQuantites: cart})
            })
            .then(response => response.json())
            .then(() => addMessage("Order successfully processed.", "success"))
            .catch(err =>console.log(err));
        } else {
            addMessage("Order canceled.", "success");
        }
    }


    return (
        <>
            <div className="left-panel"></div>
            <div className="center-panel">
                <div className="primary-container">
                    <div className="header-filler"></div>
                    <div className="top-cart-container">
                        Your Shopping Cart
                    </div>
                    <div className="middle-cart-container">
                        {cart.sort((i1, i2) => i1.pid - i2.pid).map(item => (
                            <CartItemCard item={item} key={item.pid}></CartItemCard>
                        ))}
                    </div>
                    <div className="subtotal-cart-container">
                        <div className="subtotal-content">
                            <div className="subtotal-item"> 
                                <span className="subtotal-title"> Subtotal:</span>
                                <strong className="subtotal-price">{totalPrice} DKK</strong>
                            </div>
                        </div>
                    </div>
                    <div className="bottom-cart-container">
                        <Link to={"/all_products"}>
                            <button className="button" role="button">Continue Shopping</button>
                        </Link>
                        <button 
                            className={(!user || !(cart.length > 0)) ? "disabled-button" : "button"} 
                            disabled={(!user || !(cart.length > 0))} 
                            title={(!user) ? "Please login to checkout" : ""} 
                            role="button" 
                            onClick={sendOrder}>
                            Checkout
                        </button>
                    </div>
                    
                </div>
            </div>
            <div className="right-panel"></div>
        </>
    );
}