import { createContext, useEffect, useState } from "react";
import { CartItem, Category, Product, User } from "./interfaces/interfaces";
import Cookies from 'js-cookie';


interface ProductContextValue {
    products: Product[],
    setProducts: Function
}

interface CategoryContextValue {
    categories: Category[],
    setCategories: Function
}

interface UserContextValue {
    user: User | null;
    setUser: Function
}

interface GlobalContextProps {
    children: React.ReactNode
}

interface CartContextValue {
    cart: CartItem[],
    setCart: Function
}


export const ProductContext = createContext<ProductContextValue>({ products: [], setProducts: () => { } });
export const CategoryContext = createContext<CategoryContextValue>({ categories: [], setCategories: () => { } });
export const UserContext = createContext<UserContextValue>({ user: null, setUser: () => { } });
export const CartContext = createContext<CartContextValue>({ cart: [], setCart: () => { } });


export default function GlobalContext({ children }: GlobalContextProps) {

    const loggedInUser = JSON.parse(Cookies.get("user") || 'null')
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [user, setUser] = useState<User | null>(loggedInUser);
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        fetch("http://localhost:3000/products/")
            .then(respone => respone.json())
            .then((data: Product[]) => setProducts(data))
            .catch(err => console.log(err));
    }, []);


    useEffect(() => {
        fetch("http://localhost:3000/categories/")
            .then(respone => respone.json())
            .then((data: Category[]) => setCategories(data))
            .catch(err => console.log(err));
    }, []);


    useEffect(() => {
        if (!user) {
            const storedCart = JSON.parse(Cookies.get("cart") || "[]");
            setCart(storedCart);
        }
    }, []);


    useEffect(() => {
        if (user) {
            const id = user.id
            fetch(`http://localhost:3000/cart_items/${id}`)
            .then(respone => respone.json())
            .then((data: CartItem[]) => {
                setCart(data);
            })
            .catch(err => console.log(err));
        }    
    }, [user]);


    return (
        <UserContext.Provider value={{ user, setUser }}>
            <CategoryContext.Provider value={{ categories, setCategories }}>
                    <ProductContext.Provider value={{ products, setProducts }}>
                        <CartContext.Provider value={{ cart, setCart }}>
                            {children}
                        </CartContext.Provider>
                    </ProductContext.Provider>
            </CategoryContext.Provider>
        </UserContext.Provider>
    );

}