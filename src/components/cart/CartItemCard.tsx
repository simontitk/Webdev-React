import { useContext } from "react";
import { CartContext } from "../../GlobalContext";

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

export default function CartItemCard({
    quantity, uid, pid, name, description, picture_uri,
    volume, amount, price}: CartItemCardProps) {
        const { cart, setCart } = useContext(CartContext);

        function changeQuantity(event: any) {
            const newQuantity = parseInt(event.target.value)

            fetch(`http://localhost:3000/cart_items/${uid}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "pid": pid, "quantity": newQuantity })
        })
            .then(res => res.json())
            .then(data => {
                const updatedItem = data.item
                console.log(updatedItem)
                setCart([...cart.filter(i => i.pid !== pid), updatedItem])
            })
            .catch(err => console.log(err));
        };

        return(
            <div>
                <div className="basket-item-left-container" id="{id}"> 
                    <img className="basket-item-image" width={65} height={65} src={`http://localhost:3000/images/products/${picture_uri}`}/>
                    <div className="basket-item-name-container">
                <span className="basket-item-title">{name}</span>
                <span className="basket-item-size">{amount} x {volume} ml</span>
                <div className="input-group quantity-selector">
                    <input type="number" id="inputQuantitySelector" className="form-control" 
                        name="quantity" title="quantity" value={quantity} min="0" max="99" step="1" onChange={changeQuantity}/>
                        </div>
                    </div>
                </div>
            <div className="basket-item-space"></div>
            <div className="basket-item-price-container">
                <span className="basket-item-price">{price}</span>
                <button className="button-delete" role="button">delete</button>
            </div>
            </div>
        )
    }