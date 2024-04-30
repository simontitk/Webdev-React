import { createContext, useEffect, useState } from "react";
import { Category, Product } from "./interfaces/interfaces";

interface ProductContextValue {
    products: Product[],
    setProducts: Function
}

interface SelectedProductContextValue {
    selectedProducts: Product[],
    setSelectedProducts: Function
}

interface CategoryContextValue {
    categories: Category[],
    setCategories: Function
}

interface SelectedCategoryContextValue {
    selectedCategories: number[],
    setSelectedCategories: Function
}

interface GlobalContextProps {
    children: React.ReactNode
}

export const ProductContext = createContext<ProductContextValue>({ products: [], setProducts: ()=>{} });
export const SelectedProductContext = createContext<SelectedProductContextValue>({ selectedProducts: [], setSelectedProducts: ()=>{} });
export const CategoryContext = createContext<CategoryContextValue>({ categories: [], setCategories: ()=>{} });
export const SelectedCategoryContext = createContext<SelectedCategoryContextValue>({ selectedCategories: [], setSelectedCategories: ()=>{} });


export default function GlobalContext({ children }: GlobalContextProps) {

    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);




    useEffect(() => {
        fetch("http://localhost:3000/products/")
            .then(respone => respone.json())
            .then((data: Product[]) => { setProducts(data); setSelectedProducts(data) })
            .catch(err => console.log(err));
    }, []);


    useEffect(() => {
        fetch("http://localhost:3000/categories/")
            .then(respone => respone.json())
            .then((data: Category[]) => {
                setCategories(data);
                setSelectedCategories(data.map(category => category.id))
            })
            .catch(err => console.log(err));
    }, []);


    return (
        <CategoryContext.Provider value={{ categories, setCategories }}>
            <SelectedCategoryContext.Provider value={{ selectedCategories, setSelectedCategories }}>
                <ProductContext.Provider value={{ products, setProducts }}>
                        { children }
                </ProductContext.Provider>
            </SelectedCategoryContext.Provider>
        </CategoryContext.Provider>
    );

}