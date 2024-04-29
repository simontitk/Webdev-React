import { useEffect, useState } from "react";

import "./single_product.css";

import { Product } from "../../interfaces/interfaces";

import ProductCard from "../_common/ProductCard";

export default function SingleProductPage() {

    const [productId, setProductId] = useState(24);
    const [product, setProduct] = useState<Product[]>([]);

    /**
     * helper function declarations
     */


    useEffect(() => {
        fetch(`http://localhost:3000/${productId}/`)
            .then(respone => respone.json())
            .then((data: Product[]) => { setProduct(data) })
            .catch(err => console.log(err));
    }, []);



    return (
        <>
            <div className="left-panel"></div>
            <div className="center-panel">
                <div className="product">
                    <div className="pictures-rating">
                        <div className="product-img-container">
                            <img alt="product picture" className="product-image" id="picture" />
                        </div>
                        <div className="rating">
                            <p>Rating</p>
                            <div className="droplets">
                                <img id="rating1" alt="droplet" />
                                <img id="rating2" alt="droplet" />
                                <img id="rating3" alt="droplet" />
                                <img id="rating4" alt="droplet" />
                                <img id="rating5" alt="droplet" />
                            </div>
                        </div>
                    </div>
                    <div className="product-details">
                        <p className="single-product-name" id="name"></p>
                        <div className="price">
                            <p className="pricetag" id="price"></p>
                            <p className="vat">incl. VAT</p>
                        </div>
                        <p className="product-brand" id="brand">Made by HomePond Inc.</p>
                        <p className="product-description hide-text" id="description">Lorem ipsum dolor sit amet,
                            consectetur
                            adipiscing
                            elit, sed do
                            eiusmod
                        </p>
                    </div>
                    <div className="purchase details">
                        <div className="delivery-details">
                            <p>Free delivery to:</p>
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