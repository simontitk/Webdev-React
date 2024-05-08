import { useContext, useEffect, useState } from "react";
import { Category, Product } from "../../interfaces/interfaces";
import FilterContainer from "./FilterContainer";
import CategoryFilter from "./CategoryFilter";
import RangeFilter from "./RangeFilter";
import ProductDisplay from "./ProductDisplay";
import { useSearchParams } from "react-router-dom";
import { CategoryContext, ProductContext } from "../../GlobalContext";
import "./all_products.css";

export default function AllProductsPage() {

    
    // state declaration
    
    const [searchParams, setSearchParams] = useSearchParams();
    const [filterParams, setFilterParams] = useState({
        minPrice: parseInt(searchParams.get("min_price") || "0"),
        maxPrice: parseInt(searchParams.get("max_price") || "1000"),
        minVolume: parseInt(searchParams.get("min_volume") || "0"),
        maxVolume: parseInt(searchParams.get("max_volume") || "5000"),
        minRating: parseInt(searchParams.get("min_rating") || "1"),
        maxRating: parseInt(searchParams.get("max_rating") || "5")
    });

    const { products } = useContext(ProductContext);
    const { categories } = useContext(CategoryContext);
    
    const [selectedCategories, setSelectedCategories] = useState<number[]>(searchParams.getAll("category").map(Number));
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

    const [rendercount, setrendercount] = useState(0);

    useEffect(() => {
        if (! searchParams.get("category")) {
            const temp = categories.map(category => category.id);
            setSelectedCategories(temp);
        }
    }, [categories]);


    useEffect(() => {
        filterProducts();
        setrendercount(rendercount+1);
    }, [selectedCategories, filterParams, products])



    function handleFilterChange(e: any) {
        const name = e.target.name;
        const value = parseFloat(e.target.value);
        setFilterParams({...filterParams, [name]: value})
    }


    function filterProducts() {
        const temp = products.filter(p => (
            p.price >= filterParams.minPrice &&
            p.price <= filterParams.maxPrice &&
            p.volume >= filterParams.minVolume &&
            p.volume <= filterParams.maxVolume &&
            p.rating >= filterParams.minRating &&
            p.rating <= filterParams.maxRating 
            && p.categories.some(category => selectedCategories.includes(category.id))
        ));

        const params: any = Object.fromEntries(searchParams);
        params["min_price"] = String(filterParams.minPrice);
        params["max_price"] = String(filterParams.maxPrice);
        params["min_volume"] = String(filterParams.minVolume);
        params["max_volume"] = String(filterParams.maxVolume);
        params["min_rating"] = String(filterParams.minRating);
        params["max_rating"] = String(filterParams.maxRating);
        params["category"] = selectedCategories.map(c=>String(c));

        setSearchParams(params);
        setFilteredProducts(temp);
    }


    function resetFilters() {
        setSelectedCategories(categories.map(category => category.id));
        setFilterParams({
            minPrice: 0,
            maxPrice: 1000,
            minVolume: 0,
            maxVolume: 5000,
            minRating: 1,
            maxRating: 5
        });
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
                        minName={"minPrice"} 
                        maxName={"maxPrice"}
                        unit={"DKK"}
                        step={1}
                        min={filterParams.minPrice}
                        max={filterParams.maxPrice}
                        setValue={handleFilterChange}>
                    </RangeFilter>
                </FilterContainer>

                <FilterContainer name="Volume">
                    <RangeFilter 
                        minName={"minVolume"}
                        maxName={"maxVolume"}
                        unit={"ml"}
                        step={10}
                        min={filterParams.minVolume} 
                        max={filterParams.maxVolume} 
                        setValue={handleFilterChange}>
                    </RangeFilter>
                </FilterContainer>

                <FilterContainer name="Rating">
                    <RangeFilter 
                        minName={"minRating"}
                        maxName={"maxRating"}
                        unit={<img src="icons/droplet.png" alt="icon of a water droplet" width="28px" />}
                        step={1} 
                        min={filterParams.minRating} 
                        max={filterParams.maxRating} 
                        setValue={handleFilterChange}>
                    </RangeFilter>
                </FilterContainer>

                <div className="filter-button-container">
                    <button 
                        className="filter-button" 
                        id="reset-filter-button"
                        onClick={resetFilters}>
                        Reset filters
                    </button>
                </div>
            </div>

            <ProductDisplay products={filteredProducts}>
            </ProductDisplay>

            <div className="right-panel">
            </div>
        </>
    );
}