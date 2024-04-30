import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Product } from "../../interfaces/interfaces";

import "./single_product.css";

import PictureRating from "./PictureRating";
import ProductDetails from "./ProductDetails";
import PurchaseDetails from "./PurchaseDetails";
import Suggestions from "./Suggestions";

import LandingSection from "../home/LandingSection";
import { ProductContext } from "./ProductContext";


export default function SingleProductPage() {

    const productId: number = Number(useParams().id);

    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        fetch(`http://localhost:3000/products/${productId}/`)
            .then(respone => respone.json())
            .then((data: Product) => setProduct(data))
            .catch(err => console.log(err));
    }, []);

    return (
        <ProductContext.Provider value={product}>
            <div className="left-panel"></div>
            <div className="center-panel">
                <div className="product">
                    <PictureRating />
                    <ProductDetails />
                    <PurchaseDetails />
                </div>
                <LandingSection />
                <Suggestions />
            </div >
            <div className="right-panel"></div>
        </ProductContext.Provider>

    );
}