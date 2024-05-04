import { useContext } from "react";
import { ProductContext } from "./ProductContext";

export default function PictureRating() {

    const product = useContext(ProductContext);

    function fillRating(rating: number): JSX.Element[] {
        let droplets = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                droplets.push(<img key={i} id={`rating${i}`} src="/icons/droplet.png" alt="droplet" />);
            } else {
                droplets.push(<img key={i} id={`rating${i}`} src="/icons/empty-droplet.png" alt="droplet" />);
            }
        }
        return droplets;
    }

    return (
        <div className="pictures-rating">
            <div className="product-img-container single-product-img-container">
                <img alt="product picture" className="product-image" src={`http://localhost:3000/images/products/${product?.picture_uri}`} />
            </div>
            <div className="rating">
                <p>Rating</p>
                <div className="droplets">
                    {product && fillRating(product.rating)}
                </div>
            </div>
        </div>
    )
}