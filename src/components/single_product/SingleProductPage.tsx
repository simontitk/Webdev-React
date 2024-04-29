import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';


import "./single_product.css";

import { Category, Product, User } from "../../interfaces/interfaces";

import ProductCard from "../_common/ProductCard";

export default function SingleProductPage() {

    const productId: number = Number(useParams().id);

    const rakosInitialFasszopok: Product = {
        id: 1,
        name: "",
        description: "",
        picture_uri: "",
        volume: 1,
        amount: 1,
        rating: 1,
        price: 1,
        brand: "",
        discounted: false,
        categories: []
    }

    const [product, setProduct] = useState<Product>();
    const [user, setUser] = useState<User>();
    const [suggestions, setSuggestions] = useState<Product[]>([rakosInitialFasszopok, rakosInitialFasszopok, rakosInitialFasszopok]);
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

    function fillSuggestedItems(): JSX.Element[] {
        console.log(suggestions)
        let suggestedItems = [];
        for (let i = 0; i < 3; i++) {
            suggestedItems.push(
                <ProductCard
                    id={suggestions[i].id}
                    name={suggestions[i].name}
                    description={suggestions[i].description}
                    picture_uri={suggestions[i].picture_uri}
                    volume={suggestions[i].volume}
                    amount={suggestions[i].amount}
                    rating={suggestions[i].rating}
                    price={suggestions[i].price}></ProductCard>
            )
        }
        return suggestedItems;
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
                            <img alt="product picture" className="product-image" id="picture" src={`http://localhost:3000/images/products/${product?.picture_uri}`} />
                        </div>
                        <div className="rating">
                            <p>Rating</p>
                            <div className="droplets">
                                {fillRating()}
                            </div>
                        </div>
                    </div>
                    <div className="product-details">
                        <p className="single-product-name" id="name">{product?.name}<br />{product?.volume} ml</p>
                        <div className="price">
                            <p className="pricetag" id="price">{product?.price}</p>
                            <p className="vat">incl. VAT</p>
                        </div>
                        <p className="product-brand" id="brand">{product?.brand}</p>
                        <p className="product-description hide-text" id="description">{product?.description}
                        </p>
                    </div>
                    <div className="purchase-details">
                        <div className="delivery-details">
                            <p>Free delivery to: {user?.city}</p>
                            <p className="address" id="address">
                                {user?.street}
                            </p>
                        </div>
                        <div className="quantity">
                            <p >Quantity</p>
                            <button onClick={handleIncrease}>+</button>
                            <p>{quantity}</p>
                            <button onClick={handleDecrease}>-</button>
                        </div>
                        <div className="cart-share">
                            <button className="button">Add to cart</button>
                            <button className="button" onClick={() => { alert(`Thanks for sharing ${product?.name}`) }}>Share</button>
                        </div>
                    </div>
                </div>
                <a href="/all_products"><section className="campaign">Get Hydrated Today!</section></a>
                <div className="suggestions">
                    <section className="suggested-items">
                        {fillSuggestedItems()}
                    </section>
                </div>
            </div >
            <div className="right-panel"></div>
        </>

    );
}