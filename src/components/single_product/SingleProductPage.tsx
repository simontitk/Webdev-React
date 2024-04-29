import { useEffect, useState } from "react";

import "./single_product.css";

import { Category, Product, User } from "../../interfaces/interfaces";

import ProductCard from "../_common/ProductCard";

export default function SingleProductPage() {

    const [productId, setProductId] = useState(24);

    const initialProduct: Product = {
        name: "",
        id: productId,
        brand: "",
        description: "",
        picture_uri: "",
        volume: 0,
        amount: 0,
        rating: 0,
        price: 0,
        discounted: false,
        categories: []
    };

    const initialUser: User = {
        id: 1,
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        city: "",
        street: "",
        password: "",
        payment_method: ""
    }

    const [product, setProduct] = useState<Product>(initialProduct);
    const [user, setUser] = useState<User>(initialUser);

    function fillRating(): JSX.Element[] {
        let droplets = [];
        for (let i = 1; i <= product.rating; i++) {
            droplets.push(<img key={i} id={`rating${i}`} src="public/icons/droplet.png" alt="droplet" />);
        }
        return droplets;
    }


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



    return (
        <>
            <div className="left-panel"></div>
            <div className="center-panel">
                <div className="product">
                    <div className="pictures-rating">
                        <div className="product-img-container">
                            <img alt="product picture" className="product-image" id="picture" src={`http://localhost:3000/images/products/${product.picture_uri}`} />
                        </div>
                        <div className="rating">
                            <p>Rating</p>
                            <div className="droplets">
                                {product && fillRating()}
                            </div>
                        </div>
                    </div>
                    <div className="product-details">
                        <p className="single-product-name" id="name">{product.name}<br />{product.volume} ml</p>
                        <div className="price">
                            <p className="pricetag" id="price">{product.price}</p>
                            <p className="vat">incl. VAT</p>
                        </div>
                        <p className="product-brand" id="brand">{product.brand}</p>
                        <p className="product-description hide-text" id="description">{product.description}
                        </p>
                    </div>
                    <div className="purchase details">
                        <div className="delivery-details">
                            <p>Free delivery to: {user.city}</p>
                            <p className="address" id="address">
                            </p>
                        </div>
                        <div className="quantity">
                            <p >Quantity</p>
                            <div className="quantity-modifier">
                                <button id="plus-quantity">+</button>
                                <input id="quantity-input" type="number" min="1" max="999" value="1" />
                                <button id="minus-quantity">-</button>
                            </div>
                            <p className="available">999 available</p>
                        </div>
                        <button className="button add-to-cart-button">Add to cart</button>
                        <div className="share-like">
                            <button className="button" id="share-button">Share</button>
                        </div>
                    </div>
                </div>
                <a href="./all_products"><section className="campaign">Get Hydrated Today!</section></a>
                <div className="suggestions">
                    <section className="suggested-items">
                    </section>
                </div>
            </div >
            <div className="right-panel"></div>
        </>

    );
}