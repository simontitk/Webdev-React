import { useEffect, useState } from "react";

import ProductCard from "../_common/ProductCard";

import { Product } from "../../interfaces/interfaces";

export default function Suggestions() {
    const [suggestions, setSuggestions] = useState<Product[]>();

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

    return (
        <div className="suggestions">
            <section className="suggested-items">
                {suggestions && fillSuggestedItems()}
            </section>
        </div>
    )
}