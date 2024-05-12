import { useContext } from "react";
import { CartContext } from "../../GlobalContext";
import "./cart.css";
import CartItemCard from "./CartItemCard";
import { Link } from "react-router-dom";

export default function CartPage() {

    const { cart } = useContext(CartContext);

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
                            <strong className="subtotal-price">{cart.map(item => 
                                item.quantity * item.product.price).reduce((sum,price) => sum+price, 0)} DKK</strong>
                        </div>
                    </div>
                </div>
                <div className="bottom-cart-container">
                    <Link to={"/all_products"}>
                        <button className="button" role="button">Continue Shopping</button>
                    </Link>
                    <button className="button" role="button">Checkout</button>
                </div>
                
            </div>
        </div>
        <div className="right-panel"></div>

        </>

    );
}