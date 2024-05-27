import { useState } from "react";
import { OrderProducts } from "../../interfaces/interfaces";
import OrderCardItem from "./OrderCardItem";

interface OrderCardProps {
    totalPrice: number,
    orderDate: string,
    orderProducts: OrderProducts[]
}


export default function OrderCard({totalPrice, orderDate, orderProducts}: OrderCardProps) {


    const [isToggled, setIsToggled] = useState<boolean>(true);

    const dateFormat = `${new Date(orderDate).toLocaleString("en", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    })}`;

    
    return (
        <div className="order-card">
            <div className="order-card-header">
                <div className="order-date">Ordered: <strong>{dateFormat}</strong></div>
                <div className="order-price">Total: <strong>{totalPrice.toFixed(2)} DKK</strong></div>
                <button className="order-collapse" onClick={() => setIsToggled(!isToggled)}>
                    See details
                    <img 
                        className={`toggle-button ${isToggled && "toggle-button-transformed"}`}
                        src="icons/arrow-black.png" 
                        alt="Double arrow for toggling a panel" 
                        width="25px">
                    </img>
                </button>
                </div>
            <div className={`order-card-body ${isToggled && "toggled"}`}>
                {orderProducts.map(op => 
                    <OrderCardItem 
                        key={op.pid}
                        quantity={op.quantity} 
                        name={op.product.name} 
                        price={op.product.price} 
                        picture_uri={op.product.picture_uri} 
                        description={op.product.description}>
                    </OrderCardItem>
                )}
            </div>
        </div>
    );
}   