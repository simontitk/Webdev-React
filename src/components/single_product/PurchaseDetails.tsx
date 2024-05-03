import { useContext, useState } from "react";
import { UserContext } from "../../GlobalContext";
import { ProductContext } from "./ProductContext";

export default function PurchaseDetails() {
    const [quantity, setQuantity] = useState(1);

    const user = useContext(UserContext).user;
    const product = useContext(ProductContext);

    const userId: number | undefined = user?.id;

    const handleIncrease = () => {
        setQuantity(prevQuantity => prevQuantity < 999 ? prevQuantity + 1 : 999);
    };

    const handleDecrease = () => {
        setQuantity(prevQuantity => prevQuantity > 1 ? prevQuantity - 1 : 1);
    };

    interface cartItem {
        pid: number,
        quantity: number
    }

    async function addToCart(): Promise<void> {
        if (!product || !quantity) {
            return;
        }
        if (!user) {
            alert("Log in to use the cart!");
            return;
        }
        const url = `http://localhost:3000/cart_items/${userId}/`

        const postData: cartItem = {
            pid: product.id,
            quantity: quantity
        }
        try {
            await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData),
            })
                .then((response) => response.json())
            alert(`${quantity} x ${product.name} has been added to the cart`);
        } catch (err) {
            console.log(err);
            alert("An error occured\nPlease try again later");
        }
    };

    const fillDeliveryDetails = () => {
        if (!user) {
            return (
                <div className="delivery-details">
                    <p className="address">Please log in to place an order</p>
                </div>
            )
        }
        return (
            <>
                <div className="delivery-details">
                    <p>Free delivery to:<br />{user.city}</p>
                    <p className="address">
                        {user.street}
                    </p>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="purchase-details">
                <div className="delivery-details">
                    {fillDeliveryDetails()}
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
    )
}