import { CartItem, Product } from "../interfaces/interfaces";
import Cookies from 'js-cookie';


export function addCartItem(product: Product, quantity: number, cart: CartItem[], setCart: Function, uid?: number ) {

    if (uid !== undefined) {
        fetch(`http://localhost:3000/cart_items/${uid}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "pid": product.id, "quantity": quantity })
        })
        .then(res => res.json())
        .then(data => {setCart([...cart.filter(i => i.product.id !== product.id), data.item])})
        .catch(err => console.log(err));
    }
    else {
        const oldQuantity: number = cart.find(i => i.pid === product.id)?.quantity || 0;
        const newCartItem: CartItem = {pid: product.id, quantity: quantity + oldQuantity, product: product}; 
        const newCart = [...cart.filter(i => i.pid !== product.id), newCartItem];
        setCart(newCart);
        Cookies.set("cart", JSON.stringify(newCart));
    }
}


export function removeCartItem(product: Product, cart: CartItem[], setCart: Function, uid?: number ) {
    if (uid !== undefined) {
        fetch(`http://localhost:3000/cart_items/${uid}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "pid": product.id})
        })
        .then(res => res.json())
        .then(() => setCart([...cart.filter(i => i.pid !== product.id)]))
        .catch(err => console.log(err));
    }
    else {
        const newCart = [...cart.filter(i => i.pid !== product.id)]
        setCart(newCart);
        Cookies.set("cart", JSON.stringify(newCart));

    }
}


export function updateCartItem(product: Product, quantity: number, cart: CartItem[], setCart: Function, uid?: number) {
    if (uid !== undefined) {
        fetch(`http://localhost:3000/cart_items/${uid}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "pid": product.id, "quantity": quantity })
        })
        .then(res => res.json())
        .then(data => setCart([...cart.filter(i => i.pid !== product.id), data.item]))
        .catch(err => console.log(err));
    }
    else {
        const newCartItem: CartItem = {pid: product.id, quantity: quantity, product: product}; 
        const newCart = [...cart.filter(i => i.pid !== product.id), newCartItem];
        setCart(newCart);
        Cookies.set("cart", JSON.stringify(newCart));
    }
}