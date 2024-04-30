import { useContext, useEffect, useState } from "react";
import { User } from "../../interfaces/interfaces";
import { ProductContext } from "./ProductContext";

export default function PurchaseDetails() {
    const [user, setUser] = useState<User>();
    const [quantity, setQuantity] = useState(1);

    const product = useContext(ProductContext);

    const userId: number = 1;
    useEffect(() => {
        fetch(`http://localhost:3000/users/${userId}/`)
            .then(respone => respone.json())
            .then((data: User) => { setUser(data) })
            .catch(err => console.log(err));
    }, []);


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
        const url = `http://localhost:3000/cart_items/${userId}/`

        const postData: cartItem = {
            pid: product.id,
            quantity: quantity
        }
        console.log(postData)
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



    return (
        <>
            <div className="purchase-details">
                <div className="delivery-details">
                    <p>Free delivery to:<br />{user && user.city}</p>
                    <p className="address">
                        {user && user.street}
                    </p>
                </div>
                <div>
                    <div className="quantity">
                        <p >Quantity</p>
                        <button onClick={handleIncrease}>+</button>
                        <p className="quantity-counter">{quantity}</p>
                        <button onClick={handleDecrease}>-</button>
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