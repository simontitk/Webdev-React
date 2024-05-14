import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext, UserContext } from "../../GlobalContext";
import CartItemCard from "./CartItemCard";
import "./cart.css";

export default function CartPage() {

    const { cart } = useContext(CartContext);
    const { user } = useContext(UserContext);
    const totalPrice = cart.map(item => item.quantity * item.product.price).reduce((sum,price) => sum+price, 0)


    function sendOrder() {
        const confirmCheckout = window.confirm(`Confirm order checkout of ${totalPrice} DKK?`);
        if (user && (cart.length > 0) && confirmCheckout) {
            fetch(`http://localhost:3000/orders/user/${user.id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({productQuantites: cart})
            })
            .then(response => response.json())
            .then(data => alert(data.message))
            .catch(err =>console.log(err));
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
                            <CartItemCard 
                                key={item.pid}
                                quantity={item.quantity} 
                                uid={item.uid}
                                pid={item.pid} 
                                name={item.product.name}
                                description={item.product.description}
                                picture_uri={item.product.picture_uri}
                                volume={item.product.volume}
                                amount={item.product.amount}
                                price={item.product.price}>
                            </CartItemCard>
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
                            className={!(cart.length > 0) ? "disabled-button" : "button"} 
                            disabled={!(cart.length > 0)} 
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