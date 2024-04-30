import { useContext, useState } from "react";
import { Category, Product } from "../../interfaces/interfaces";
import { CategoryContext, ProductContext, SelectedCategoryContext, SelectedProductContext } from "../../contexts";
import FilterContainer from "./FilterContainer";
import CategoryFilter from "./CategoryFilter";
import RangeFilter from "./RangeFilter";
import ProductDisplay from "./ProductDisplay";
import "./all_products.css";

export default function AllProductsPage() {

    const { products } = useContext(ProductContext);
    const { selectedProducts, setSelectedProducts } = useContext(SelectedProductContext);
    const { categories } = useContext(CategoryContext);
    const { selectedCategories, setSelectedCategories } = useContext(SelectedCategoryContext);

    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number>(1000);
    const [minVolume, setMinVolume] = useState<number>(0);
    const [maxVolume, setMaxVolume] = useState<number>(5000);
    const [minRating, setMinRating] = useState<number>(1);
    const [maxRating, setMaxRating] = useState<number>(5);


    function filterProducts(): void {
        const temp = products.filter(p => (
            p.price >= minPrice &&
            p.price <= maxPrice &&
            p.volume >= minVolume &&
            p.volume <= maxVolume &&
            p.rating >= minRating &&
            p.rating <= maxRating &&
            p.categories.some(category => selectedCategories.includes(category.id))
        ));
        setSelectedProducts(temp);
    };


    function resetFilter(): void {
        setSelectedProducts(products);
    }

    return (
        <>
            <div className="filter-panel ">

                <FilterContainer name="Categories">
                    <CategoryFilter 
                        categories={categories}
                        selectedCategories={selectedCategories}
                        setSelectedCategories={setSelectedCategories}>
                    </CategoryFilter>
                </FilterContainer>

                <FilterContainer name="Price">
                    <RangeFilter 
                        unit={"DKK"} 
                        step={1}
                        min={minPrice} 
                        max={maxPrice} 
                        setMin={setMinPrice} 
                        setMax={setMaxPrice}>
                    </RangeFilter>
                </FilterContainer>

                <FilterContainer name="Volume">
                    <RangeFilter  
                        unit={"ml"}
                        step={10}
                        min={minVolume} 
                        max={maxVolume} 
                        setMin={setMinVolume} 
                        setMax={setMaxVolume}>
                    </RangeFilter>
                </FilterContainer>

                <FilterContainer name="Rating">
                    <RangeFilter 
                        unit={<img src="icons/droplet.png" alt="icon of a water droplet" width="28px"></img>}
                        step={1} 
                        min={minRating} 
                        max={maxRating} 
                        setMin={setMinRating} 
                        setMax={setMaxRating}>
                    </RangeFilter>
                </FilterContainer>

                <div className="filter-button-container">
                    <button 
                        className="filter-button" 
                        id="filter-button"
                        onClick={() => {filterProducts()}}>
                        Filter products
                    </button>
                    <button 
                        className="filter-button" 
                        id="reset-filter-button"
                        onClick={() => resetFilter()}>
                        Reset filters
                    </button>
                </div>
            </div>
            
            <ProductDisplay products={selectedProducts}>
            </ProductDisplay>

            <div className="right-panel">
            </div>
        </>
    );
}