interface OrderCardItemProps {
    quantity: number,
    name: string,
    price: number,
    picture_uri: string,
    description: string
}

export default function OrderCardItem({quantity, name, price, picture_uri, description}: OrderCardItemProps ) {

    return (
        <div className="order-card-item">
            <span>{quantity} x {name}</span>
            <span>{price} DKK</span>
            <img
                src={`http://localhost:3000/images/products/${picture_uri}`}
                alt={description}
                height="80px">
            </img>
        </div>
    );
}