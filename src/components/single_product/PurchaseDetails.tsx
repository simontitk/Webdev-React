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

    return (
        <>
            <div className="purchase-details">
                <div className="delivery-details">
                    <p>Free delivery to:<br />{user && user.city}</p>
                    <p className="address">
                        {user && user.street}
                    </p>
                </div>
                <div className="quantity">
                    <p >Quantity</p>
                    <button onClick={handleIncrease}>+</button>
                    <p className="quantity-counter">{quantity}</p>
                    <button onClick={handleDecrease}>-</button>
                </div>
                <div className="cart-share">
                    <button className="button" onClick={() => { alert(`Faszomat az egesz frontendbe`) }}>Add to cart</button>
                    <button className="button" onClick={() => { alert(`Thanks for sharing ${product && product.name}`) }}>Share</button>
                </div>
            </div>
        </>
    )
}