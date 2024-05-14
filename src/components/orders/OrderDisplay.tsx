import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../GlobalContext";
import OrderCard from "./OrderCard";
import "./orders.css";
import { Order } from "../../interfaces/interfaces";

export default function OrderDisplay() {

    const [orders, setOrders] = useState<Order[]>([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:3000/orders/user/${user.id}`, {method: "GET"})
            .then(respone => respone.json())
            .then(data => setOrders(data))
            .catch(err => console.log(err));
        }
    }, []);

    return (
        <div className="order-display">
            <h1 className="order-display-header">Order history</h1>
            {orders.map(order => 
                <OrderCard 
                    key={order.id}
                    totalPrice={order.total_price} 
                    orderDate={order.order_date} 
                    orderProducts={order.products}>
                </OrderCard>)}
        </div>
    );
}