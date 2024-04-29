import "./product_card.css"

interface ProductCardProps {
    id: number,
    name: string,
    description: string,
    picture_uri: string,
    volume: number,
    amount: number,
    rating: number,
    price: number,
}

export default function ProductCard({ id, name, description, picture_uri, volume, amount, rating, price }: ProductCardProps) {

    return (
        <div className="product-card">
            <div className="rating-icon">
                <img src="icons/droplet.png" alt="icon of a water droplet" width="50px"></img>
            </div>
            <div className="rating-number">
                    {rating}
            </div>
            <div className="product-display">
                <div className="product-img-container">
                    <img 
                        src={`http://localhost:3000/images/products/${picture_uri}`}
                        alt={description}
                        height="260px"
                        className="product-image">
                    </img>
                </div>
                <div className="product-name-container">
                    <span className="product-name">{name}</span>
                    <span className="product-size">{amount} x {volume} ml</span>
                </div>
            </div>
            <div className="product-purchase-container">
                <span className="product-price">{price} DKK</span>
                <button className="add-to-cart-button" id="{id}">
                    Add to cart
                </button>
            </div>
        </div>
    );
}