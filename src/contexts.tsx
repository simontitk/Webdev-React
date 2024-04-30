import { createContext } from "react";
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

export const ProductContext = createContext<ProductContextValue>({ products: [], setProducts: ()=>{} });
export const SelectedProductContext = createContext<SelectedProductContextValue>({ selectedProducts: [], setSelectedProducts: ()=>{} });
export const CategoryContext = createContext<CategoryContextValue>({ categories: [], setCategories: ()=>{} });
export const SelectedCategoryContext = createContext<SelectedCategoryContextValue>({ selectedCategories: [], setSelectedCategories: ()=>{} });
