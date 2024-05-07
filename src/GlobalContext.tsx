import { createContext, useEffect, useState } from "react";
import { Category, Product, User } from "./interfaces/interfaces";

import Cookies from 'js-cookie';

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

interface UserContextValue {
    user: User | null;
    setUser: Function
}

interface GlobalContextProps {
    children: React.ReactNode
}

export const ProductContext = createContext<ProductContextValue>({ products: [], setProducts: () => { } });
export const SelectedProductContext = createContext<SelectedProductContextValue>({ selectedProducts: [], setSelectedProducts: () => { } });
export const CategoryContext = createContext<CategoryContextValue>({ categories: [], setCategories: () => { } });
export const SelectedCategoryContext = createContext<SelectedCategoryContextValue>({ selectedCategories: [], setSelectedCategories: () => { } });
export const UserContext = createContext<UserContextValue>({ user: null, setUser: () => { } });

export default function GlobalContext({ children }: GlobalContextProps) {

    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [user, setUser] = useState<User | null>(null);

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

    const email = Cookies.get('email');
    useEffect(() => {
        if (email) {
            fetch(`http://localhost:3000/users/?email=${email}`)
                .then(response => response.json())
                .then((data: User) => {
                    console.log(user)
                    if (!data) {
                        return;
                    } else {
                        setUser(data);
                    }
                })
                .catch(err => console.log(err));
        }
    }, [email]);


    return (
        <UserContext.Provider value={{ user, setUser }}>
            <CategoryContext.Provider value={{ categories, setCategories }}>
                <SelectedCategoryContext.Provider value={{ selectedCategories, setSelectedCategories }}>
                    <ProductContext.Provider value={{ products, setProducts }}>
                        {children}
                    </ProductContext.Provider>
                </SelectedCategoryContext.Provider>
            </CategoryContext.Provider>
        </UserContext.Provider>
    );

}