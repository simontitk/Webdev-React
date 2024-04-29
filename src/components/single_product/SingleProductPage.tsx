import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Product, User } from "../../interfaces/interfaces";

import "./single_product.css";

import ProductCard from "../_common/ProductCard";

export default function SingleProductPage() {

    const productId: number = Number(useParams().id);

    const [product, setProduct] = useState<Product>();
    const [user, setUser] = useState<User>();
    const [suggestions, setSuggestions] = useState<Product[]>();
    const [quantity, setQuantity] = useState(1);


    useEffect(() => {
        fetch(`http://localhost:3000/products/${productId}/`)
            .then(respone => respone.json())
            .then((data: Product) => { setProduct(data) })
            .catch(err => console.log(err));
    }, []);

    const userId: number = 1;
    useEffect(() => {
        fetch(`http://localhost:3000/users/${userId}/`)
            .then(respone => respone.json())
            .then((data: User) => { setUser(data) })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        fetch('http://localhost:3000/products/')
            .then(response => response.json())
            .then((data: Product[]) => {
                data.sort(() => Math.random() - 0.5);
                const randomProducts = data.slice(0, 3);
                setSuggestions(randomProducts);
            })
            .catch(err => console.log(err));
    }, []);

    function fillRating(): JSX.Element[] {
        let droplets = [];
        const rating: number = product?.rating || 0;
        for (let i = 1; i <= rating; i++) {
            droplets.push(<img key={i} id={`rating${i}`} src="/public/icons/droplet.png" alt="droplet" />);
        }
        return droplets;
    }

    function fillSuggestedItems(): JSX.Element[] | undefined {
        return suggestions && suggestions.map((suggestion, i) => (
            <ProductCard
                key={i}
                id={suggestion.id}
                name={suggestion.name}
                description={suggestion.description}
                picture_uri={suggestion.picture_uri}
                volume={suggestion.volume}
                amount={suggestion.amount}
                rating={suggestion.rating}
                price={suggestion.price}
            />
        ));
    }

    const handleIncrease = () => {
        setQuantity(prevQuantity => prevQuantity < 999 ? prevQuantity + 1 : 999);
    };

    const handleDecrease = () => {
        setQuantity(prevQuantity => prevQuantity > 1 ? prevQuantity - 1 : 1);
    };

    return (
        <>
            <div className="left-panel"></div>
            <div className="center-panel">
                <div className="product">
                    <div className="pictures-rating">
                        <div className="product-img-container">
                            <img alt="product picture" className="product-image" src={`http://localhost:3000/images/products/${product?.picture_uri}`} />
                        </div>
                        <div className="rating">
                            <p>Rating</p>
                            <div className="droplets">
                                {fillRating()}
                            </div>
                        </div>
                    </div>
                    <div className="product-details">
                        <p className="single-product-name">{product && product.name}<br />{product && product.volume} ml</p>
                        <div className="price">
                            <p className="pricetag">{product && product.price}</p>
                            <p className="vat">incl. VAT</p>
                        </div>
                        <p className="product-brand">{product && product.brand}</p>
                        <p className="product-description hide-text">{product && product.description}
                        </p>
                    </div>
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
                            <p>{quantity}</p>
                            <button onClick={handleDecrease}>-</button>
                        </div>
                        <div className="cart-share">
                            <button className="button" onClick={() => { alert(`Faszomat az egesz frontendbe`) }}>Add to cart</button>
                            <button className="button" onClick={() => { alert(`Thanks for sharing ${product && product.name}`) }}>Share</button>
                        </div>
                    </div>
                </div>
                <a href="/all_products"><section className="campaign">Get Hydrated Today!</section></a>
                <div className="suggestions">
                    <section className="suggested-items">
                        {suggestions && fillSuggestedItems()}
                    </section>
                </div>
            </div >
            <div className="right-panel"></div>
        </>

    );
}